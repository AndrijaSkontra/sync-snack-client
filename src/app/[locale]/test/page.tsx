export const revalidate = false;
export default async function Test() {
  const data2 = await fetch("http://localhost:3000/api/tes", {
    next: { revalidate: 3 },
  });
  const json = await data2.json();
  return "test";
}
