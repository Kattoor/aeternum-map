import express from 'express';
import { Double, ObjectId } from 'mongodb';
import type { Comment, Marker } from '../types';
import { getCommentsCollection } from './comments';
import { getMarkersCollection } from './markers';
import { mapFilters } from '../app/components/MapFilter/mapFilters';
import { getUsersCollection } from './users';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs/promises';
import { sendToDiscord } from './discord';

const screenshotsUpload = multer({ dest: process.env.SCREENSHOTS_PATH });

const router = express.Router();

router.get('/markers', async (_req, res, next) => {
  try {
    const markers = await getMarkersCollection().find({}).toArray();
    res.status(200).json(markers);
  } catch (error) {
    next(error);
  }
});

router.delete('/markers/:markerId', async (req, res, next) => {
  try {
    const { markerId } = req.params;

    if (!ObjectId.isValid(markerId)) {
      res.status(400).send('Invalid payload');
      return;
    }

    const result = await getMarkersCollection().deleteOne({
      _id: new ObjectId(markerId),
    });
    if (!result.deletedCount) {
      res.status(404).end(`No marker found for id ${markerId}`);
      return;
    }
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
});

router.patch('/markers/:markerId', async (req, res, next) => {
  try {
    const { markerId } = req.params;
    const { screenshotFilename } = req.body;

    if (typeof screenshotFilename !== 'string' || !ObjectId.isValid(markerId)) {
      res.status(400).send('Invalid payload');
      return;
    }

    const result = await getMarkersCollection().updateOne(
      {
        _id: new ObjectId(markerId),
      },
      {
        $set: {
          screenshotFilename,
        },
      }
    );
    if (!result.modifiedCount) {
      res.status(404).end(`No marker found for id ${markerId}`);
      return;
    }
    res.status(200).json(screenshotFilename);
  } catch (error) {
    next(error);
  }
});

router.post('/markers', async (req, res, next) => {
  try {
    const {
      type,
      position,
      positions,
      name,
      username,
      level,
      levelRange,
      description,
      screenshotFilename,
    } = req.body;

    if (typeof type !== 'string' || typeof username !== 'string') {
      res.status(400).send('Invalid payload');
      return;
    }
    const marker: Marker = {
      type,
      username,
      createdAt: new Date(),
    };
    if (position) {
      marker.position = position.map(
        (part: number) => new Double(+part.toFixed(2))
      ) as [Double, Double, Double];
    }
    if (Array.isArray(positions)) {
      marker.positions = positions.map((position) =>
        position.map((part: number) => new Double(part))
      ) as [Double, Double][];
    }
    if (name) {
      marker.name = name;
    }
    if (level) {
      marker.level = level;
    }
    if (description) {
      marker.description = description;
    }
    if (screenshotFilename) {
      marker.screenshotFilename = screenshotFilename;
    }
    if (levelRange) {
      marker.levelRange = levelRange;
    }

    if (!mapFilters.some((filter) => filter.type === marker.type)) {
      res.status(400).send(`Unknown type ${marker.type}`);
      return;
    }
    const existingMarker = await getMarkersCollection().findOne({
      type: marker.type,
      position: marker.position,
      positions: marker.positions,
    });
    if (existingMarker) {
      res.status(409).send('Marker already exists');
      return;
    }

    const inserted = await getMarkersCollection().insertOne(marker);
    if (!inserted.acknowledged) {
      res.status(500).send('Error inserting marker');
      return;
    }
    res.status(200).json(marker);
    sendToDiscord({ marker });
  } catch (error) {
    next(error);
  }
});

router.get('/markers/:markerId/comments', async (req, res) => {
  const { markerId } = req.params;
  if (!ObjectId.isValid(markerId)) {
    res.status(400).send('Invalid payload');
    return;
  }
  const comments = await getCommentsCollection()
    .find({ markerId: new ObjectId(markerId) })
    .sort({ createdAt: -1 })
    .toArray();
  if (!comments) {
    res.status(404).end(`No comments found for marker ${markerId}`);
    return;
  }
  res.status(200).json(comments);
});

router.post('/markers/:markerId/comments', async (req, res, next) => {
  try {
    const { markerId } = req.params;
    const { username, message } = req.body;

    if (
      typeof username !== 'string' ||
      typeof message !== 'string' ||
      !ObjectId.isValid(markerId)
    ) {
      res.status(400).send('Invalid payload');
      return;
    }

    const comment: Comment = {
      markerId: new ObjectId(markerId),
      username,
      message,
      createdAt: new Date(),
    };

    const marker = await getMarkersCollection().findOne({
      _id: comment.markerId,
    });
    if (!marker) {
      res.status(404).send("Marker doesn't exists");
      return;
    }
    const inserted = await getCommentsCollection().insertOne(comment);
    if (!inserted.acknowledged) {
      res.status(500).send('Error inserting comment');
      return;
    }
    res.status(200).json(comment);

    sendToDiscord({ comment, marker });
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const { username } = req.body;

    if (typeof username !== 'string') {
      res.status(400).send('Invalid payload');
      return;
    }

    const existingUser = await getUsersCollection().findOne({ username });
    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }
    const result = await getUsersCollection().findOneAndUpdate(
      { username },
      {
        $setOnInsert: {
          username,
          hiddenMarkerIds: [],
          createdAt: new Date(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    if (result.value) {
      res.status(200).json(result.value);
      sendToDiscord({ user: result.value });
    } else {
      throw new Error('Could not create user');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/users/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getUsersCollection().findOne({ username });
    if (!user) {
      res.status(404).end(`No user found for ${username}`);
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/users/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const { hiddenMarkerIds } = req.body;
    if (!Array.isArray(hiddenMarkerIds)) {
      res.status(400).send('Invalid payload');
      return;
    }

    const result = await getUsersCollection().updateOne(
      { username },
      {
        $set: {
          hiddenMarkerIds,
        },
      }
    );
    if (!result.modifiedCount) {
      res.status(404).end(`No user found for ${username}`);
      return;
    }
    res.status(200).json(hiddenMarkerIds);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/screenshots',
  screenshotsUpload.single('screenshot'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).send('Invalid payload');
        return;
      }
      const filePath = `${req.file.path}.webp`;
      await sharp(req.file.path).webp().toFile(filePath);
      await fs.rm(req.file.path);
      res.json({
        filename: `${req.file.filename}.webp`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
