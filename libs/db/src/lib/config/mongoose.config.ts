import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://wallet-tns:wallet-tns@cluster0.yih4c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
