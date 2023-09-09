import mongoose from "mongoose";
import config from "../config/config";

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  return await mongoose.connect(config.mongoUri);
};
export default connectMongo;
