import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(`\n\nThe selected groupId 👥: ${body.groupId} 👥 \n\n`);
  //  TODO: store this in a nextjs cookie!
  //  also should make sure every localstorage groupId set is also getting here...
  cookies().set("GroupId", body.groupId);
  return new Response("Success setting the server GroupId cookie", {
    status: 200,
  });
}
