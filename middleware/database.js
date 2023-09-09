import dbConnect from '../utils/dbConnect';

const database = async (req, _1, next) => {
  try {
    const conn = await dbConnect();
    req.db = conn;
    next();
  } catch (error) {
    console.log('Database connection error ', error.message);
  }
};

export default database;
