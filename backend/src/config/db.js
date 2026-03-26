import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri) {
  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
