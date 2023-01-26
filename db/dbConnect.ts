import mongoose from 'mongoose'

const connection = {} 
const MONGODB_URI = `mongodb://eth:6f88@172.16.8.130:27017`

// ['eth']['6f88']
async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(MONGODB_URI)
  connection.isConnected = db.connections[0].readyState
  console.log('db',db.connections[0].readyState)
}

export default dbConnect