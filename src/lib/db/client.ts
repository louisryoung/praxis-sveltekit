import mongoose from 'mongoose';
import { MONGODB_URI, MODE } from '$env/static/private';

let mongo: Promise<typeof mongoose> | mongoose.Connection;

if (mongoose.connections[0].readyState) {
  mongo = mongoose.connections[0];
  console.log('mongoconnection', mongo);
} else {
  mongoose.set('strictQuery', false);
  mongo = mongoose.connect(MONGODB_URI);
}

//@ts-ignore
export default mongo;
