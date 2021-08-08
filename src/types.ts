import { Double, ObjectId } from 'mongodb';

export type Marker = {
  type: string;
  position: [Double, Double, Double];
  createdAt: Date;
};

export type Comment = {
  markerId: ObjectId;
  username: string;
  message: string;
  createdAt: Date;
};
