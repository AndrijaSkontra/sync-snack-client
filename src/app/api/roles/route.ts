import { getClientMongo } from "@/commons/db-connect";

export async function POST(request: Request) {
  const client = await getClientMongo();
  const dbName = "groupRoles";
  const db = client.db(dbName);
  const collection = db.collection("rolesClc");
  const data = await request.json();
  await collection.updateOne(
    { groupId: data.groupId },
    { $set: data },
    { upsert: true },
  );
  client.close();
  // await collection.insertOne(data);
  return new Response("", { status: 200 });
}
