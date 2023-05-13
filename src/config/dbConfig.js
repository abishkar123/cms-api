import mongoose from "mongoose"
import {MongoClient} from 'mongodb'

export const dbConnect =async ()=>{
    try{
        mongoose.set('strictQuery', true);
        const conn =  await mongoose.connect(process.env.MONGO_CLIENT);
        conn && console.log("DB connnected")
    }catch(error){
        console.log(error);
    }
};


let client
let clientPromise

const options = {}

const uri = 'mongodb+srv://abiskarrai:C6cUkXBXosg8Tcib@cluster0.jzd47pi.mongodb.net/SknersCrazy?retryWrites=true&w=majority'



if(!uri){
  throw new Error('Please add mongo uri to .env file.')
}

if(process.env.NODE_ENV === 'development'){
  if(!global._mongoClientPromise){
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = gloabal._mongoClientPromise
} else{
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}


    export default clientPromise


