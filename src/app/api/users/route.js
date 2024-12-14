
import { userData } from '../../db/userData';


// Helper to find an item by ID
function findById(id) {
  return userData.find(item => item.id === id);
}

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const item = findById(Number(id));
    if (!item) {
      return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(userData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const newItem = await request.json();
  newItem.id = userData.length ? userData[userData.length - 1].id + 1 : 1;
  userData.push(newItem);

  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request) {
  const updatedItem = await request.json();
  const index = userData.findIndex(item => item.id === updatedItem.id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
  }

  userData[index] = { ...userData[index], ...updatedItem };
  return new Response(JSON.stringify(userData[index]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const index = userData.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
  }
  const deletedItem = userData.splice(index, 1);
  return new Response(JSON.stringify(deletedItem[0]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
