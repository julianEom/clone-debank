import { MongoClient } from 'mongodb';

export async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://eth:6f88@172.16.8.130:27017');
    
    // 데이터베이스 취득
    const database = client.db();
    console.log('database',database);
}