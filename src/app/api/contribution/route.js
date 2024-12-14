
import { contributionData } from '../../db/contributionData';
import { userData } from '../../db/userData';


// Helper to find an item by ID
function findById(id) {
  return contributionData.find(item => item.id === id);
}
function findUserByUserId(userId) {
  return userData.find(data => data.id === userId);
}

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const item = findById(Number(id));
    if (!item) {
      return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
    }
    const user=findUserByUserId(item.user_id);
    const result = {
      ...item,
      userName: user ? user.name : "Unknown User",
    };
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const contributionsWithUserNames = contributionData.map((contribution) => {
    const user = findUserByUserId(contribution.user_id);
    return {
      ...contribution,
      userName: user ? user.name : "Unknown User",
    };
  });
  return new Response(JSON.stringify(contributionsWithUserNames), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const newItem = await request.json();
  newItem.id = contributionData.length ? contributionData[contributionData.length - 1].id + 1 : 1;
  contributionData.push(newItem);

  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request) {
  const updatedItem = await request.json();
  const index = contributionData.findIndex(item => item.id === updatedItem.id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
  }

  contributionData[index] = { ...contributionData[index], ...updatedItem };
  return new Response(JSON.stringify(contributionData[index]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const index = contributionData.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
  }
  const deletedItem = contributionData.splice(index, 1);
  return new Response(JSON.stringify(deletedItem[0]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
