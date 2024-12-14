import { userData } from '../../../db/userData';
export async function POST(req) {
  const { username,phoneNumber, password } = await req.json(); 
const newItem={name:username,phoneNumber:phoneNumber,password:password,role:"USER"};
  newItem.id = userData.length ? userData[userData.length - 1].id + 1 : 1;
  console.log(newItem);
  userData.push(newItem);
  const { password: _, ...userWithoutPassword } = newItem;

  return new Response(JSON.stringify(userWithoutPassword), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
