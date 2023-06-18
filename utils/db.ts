import mongoose from "mongoose";

let connected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (connected) {
    console.log('Already connected to DB')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'Proompts',
    })

    connected = true

    console.log('Connected to DB')
    return true
  } catch (error) {
    console.log('ERROR: ', error)
  }
}