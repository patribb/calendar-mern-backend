import mongoose from 'mongoose'
import { MONGODB_URL } from '../constants/constants.js';

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL)
    console.log('🚀 MongoDb conectada!');
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo connectar con MongoDB')
  }
}

export default dbConnection