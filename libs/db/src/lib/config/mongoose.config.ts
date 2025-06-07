import mongoose from 'mongoose';

const DATA_BASE_URI = process.env['MONGO_URI'];

export const connectDB = async () => {
  try {
    if (!DATA_BASE_URI) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(DATA_BASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
