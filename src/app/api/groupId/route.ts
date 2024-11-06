export async function POST(request: Request) {
  const body = await request.json();
  console.log(`\n\nhi, this will execute well ${body.groupId} .... \n\n`);
  //  TODO: store this in a nextjs cookie!
  return new Response("", { status: 200 });
}
