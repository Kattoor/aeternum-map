import type { Collection, Document } from 'mongodb';
import { getCollection, getDb } from './db';
import type { User } from '../types';

export function getUsersCollection(): Collection<User> {
  return getCollection<User>('Users');
}

export function ensureUsersIndexes(): Promise<string[]> {
  return getUsersCollection().createIndexes([{ key: { username: 1 } }], {
    unique: true,
  });
}

export function ensureUsersSchema(): Promise<Document> {
  return getDb().command({
    collMod: 'Users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'User',
        properties: {
          _id: {
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
          hiddenMarkerIds: {
            bsonType: 'array',
            items: {
              bsonType: 'objectId',
            },
          },
          createdAt: {
            bsonType: 'date',
          },
        },
        additionalProperties: false,
        required: ['username', 'displayName', 'avatar', 'createdAt'],
      },
    },
  });
}
