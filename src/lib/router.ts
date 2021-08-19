import express from 'express';
import { Double, ObjectId } from 'mongodb';
import { Comment, Marker } from '../types';
import { getCommentsCollection } from './comments';
import { getMarkersCollection } from './markers';
import { mapFilters } from '../app/components/MapFilter/mapFilters';

const router = express.Router();

router.get('/markers', async (_req, res, next) => {
  try {
    const markers = await getMarkersCollection().find({}).toArray();
    res.status(200).json(markers);
  } catch (error) {
    next(error);
  }
});

router.post('/markers', async (req, res, next) => {
  try {
    const { type, position, name, username } = req.body;

    if (
      typeof type !== 'string' ||
      typeof username !== 'string' ||
      !Array.isArray(position)
    ) {
      res.status(400).send('Invalid payload');
      return;
    }

    const marker: Marker = {
      type,
      username,
      position: position.map((p) => new Double(p)) as [Double, Double, Double],
      createdAt: new Date(),
    };
    if (name) {
      marker.name = name;
    }

    if (!mapFilters.some((filter) => filter.type === marker.type)) {
      res.status(400).send(`Unknown type ${marker.type}`);
      return;
    }
    const existingMarker = await getMarkersCollection().findOne({
      type: marker.type,
      position: marker.position,
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
  const comment = await getCommentsCollection()
    .find({ markerId: new ObjectId(markerId) })
    .sort({ createdAt: -1 })
    .toArray();
  if (!comment) {
    res.status(404).end(`No comments found for marker ${markerId}`);
    return;
  }
  res.status(200).json(comment);
});

router.post('/markers/:markerId/comments', async (req, res, next) => {
  try {
    const { markerId } = req.params;
    const { username, displayName, avatar, message } = req.body;

    if (
      typeof username !== 'string' ||
      typeof message !== 'string' ||
      typeof displayName !== 'string' ||
      typeof avatar !== 'string' ||
      !ObjectId.isValid(markerId)
    ) {
      res.status(400).send('Invalid payload');
      return;
    }

    const comment: Comment = {
      markerId: new ObjectId(markerId),
      username,
      displayName,
      avatar,
      message,
      createdAt: new Date(),
    };

    const inserted = await getCommentsCollection().insertOne(comment);
    if (!inserted.acknowledged) {
      res.status(500).send('Error inserting comment');
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

export default router;
