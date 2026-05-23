import mongoose from "mongoose";

async function connection(url)
{
    await mongoose
    .connect(url)
    .then(()=>{console.log("Mongo db connected")})
    .catch((error) => {console.log("error",error)});
}

export default connection;