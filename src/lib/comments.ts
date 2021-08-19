import { Collection, Document } from 'mongodb';
import { getCollection, getDb } from './db';
import { Comment } from '../types';

export function getCommentsCollection(): Collection<Comment> {
  return getCollection<Comment>('comments');
}

export function ensureCommentsIndexes(): Promise<string[]> {
  return getCommentsCollection().createIndexes([{ key: { markerId: 1 } }]);
}

export function ensureCommentsSchema(): Promise<Document> {
  return getDb().command({
    collMod: 'comments',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Comment',
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          markerId: {
            bsonType: 'objectId',
          },
          username: {
            bsonType: 'string',
          },
          displayName: {
            bsonType: 'string',
          },
          avatar: {
            bsonType: 'string',
          },
          message: {
            bsonType: 'string',
          },
          createdAt: {
            bsonType: 'date',
          },
        },
        additionalProperties: false,
        required: [
          'markerId',
          'username',
          'displayName',
          'avatar',
          'message',
          'createdAt',
        ],
      },
    },
  });
}
