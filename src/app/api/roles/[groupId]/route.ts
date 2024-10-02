import { getClientMongo } from "@/commons/db-connect";

export const revalidate = 1;

export async function GET(request: Request, { params }: any) {
  const client = await getClientMongo();
  const dbName = "groupRoles";
  const db = client.db(dbName);
  const collection = db.collection("rolesClc");
  const data = await collection.find({ groupId: params.groupId }).toArray();
  client.close();
  return new Response(JSON.stringify(data), { status: 200 });
}
