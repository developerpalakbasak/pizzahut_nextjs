import mongoose from "mongoose";
// const URI = ''
export const ConnectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
};
