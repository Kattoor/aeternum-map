import { Collection, Document } from 'mongodb';
import { getCollection, getDb } from './db';
import { Marker } from '../types';

export function getMarkersCollection(): Collection<Marker> {
  return getCollection<Marker>('markers');
}

export function ensureMarkersIndexes(): Promise<[string[], string[]]> {
  return Promise.all([
    getMarkersCollection().createIndexes([{ key: { type: 1, position: 1 } }], {
      unique: true,
    }),
    getMarkersCollection().createIndexes([{ key: { createdAt: -1 } }]),
  ]);
}

export function ensureMarkersSchema(): Promise<Document> {
  return getDb().command({
    collMod: 'markers',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Marker',
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          type: {
            bsonType: 'string',
          },
          position: {
            bsonType: 'array',
            items: {
              bsonType: 'double',
            },
          },
          name: {
            bsonType: 'string',
          },
          username: {
            bsonType: 'string',
          },
          createdAt: {
            bsonType: 'date',
          },
        },
        additionalProperties: false,
        required: ['type', 'position', 'createdAt'],
      },
    },
  });
}
