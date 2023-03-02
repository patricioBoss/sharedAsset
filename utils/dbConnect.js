import mongoose from 'mongoose';
import config from '../config/config';

const connectMongo = async () => mongoose.connect(config.mongoUri);

export default connectMongo;
