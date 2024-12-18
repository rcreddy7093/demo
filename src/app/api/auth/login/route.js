import { userData } from '../../../db/userData';
export async function POST(req) {
  const { username, password } = await req.json();  // Parse the incoming JSON body

  // Find the user in the userData array by phoneNumber
  const user = userData.find(user => user.phoneNumber === username);

  // Check if the user is found
  if (!user) {
      return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
  }

  // Check if the password is correct
  if (user.password !== password) {
      return new Response(
          JSON.stringify({ error: "Invalid password" }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
  }

  // Exclude the password before returning the user object
  const { password: _, ...userWithoutPassword } = user;

  // If user is found and password is correct
  return new Response(
      JSON.stringify({ message: "Login successful", user: userWithoutPassword }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
