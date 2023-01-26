import clientPromise from '../../../lib/mongodb';

// TODO : type update
export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db('whooing');
  switch (req.method) {
    case 'POST':
      let bodyObject = req.body;
      const data = await db.collection('whooing').insertOne(bodyObject);
      res.json(data);
      break;
    case 'GET':
      const allDatas = await db.collection('whooing').find({}).toArray();
      res.json({ status: 200, data: allDatas });
      break;
  }
}
