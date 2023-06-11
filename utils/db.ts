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
      /* @ts-expect-error */
      useUnifiedTopology: true,
    })

    connected = true

    console.log('Connected to DB')
  } catch (error) {
    console.log('ERROR: ', error)
  }
}