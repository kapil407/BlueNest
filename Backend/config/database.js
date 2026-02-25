import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://kapilkeer1998:kapil1998@kapildb-shard-00-00.pc7gf.mongodb.net:27017,kapildb-shard-00-01.pc7gf.mongodb.net:27017,kapildb-shard-00-02.pc7gf.mongodb.net:27017/twitter?replicaSet=atlas-i2aqy5-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority");
};
