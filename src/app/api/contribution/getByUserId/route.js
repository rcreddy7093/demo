// pages/api/contributions/getUserById.js
import { contributionData } from '../../../db/contributionData';

// Helper to find items by user_id
function findUserByUserId(userId) {
  return contributionData.filter(data => data.user_id === userId);
}

  
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const item = findUserByUserId(Number(id));
    if (!item) {
      return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  
  }
  else{
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
}
