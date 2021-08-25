import type { Double, ObjectId } from 'mongodb';

export type Marker = {
  type: string;
  position: [Double, Double, Double];
  name?: string;
  username: string;
  screenshotFilename?: string;
  createdAt: Date;
};

export type Comment = {
  markerId: ObjectId;
  username: string;
  displayName: string;
  avatar: string;
  message: string;
  createdAt: Date;
};

export type User = {
  username: string;
  displayName: string;
  avatar: string;
  hiddenMarkerIds: ObjectId[];
  createdAt: Date;
};
