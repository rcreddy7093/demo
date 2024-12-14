// src/app/api/hello/route.js

export async function GET(request) {
    const data = [
      {
        id:1,
        title: 'Group Vision and Purpose',
        heading:'',
        subHeading:'Our community-driven group, established by dedicated working professionals, is built on the principles of collective contribution and shared cultural heritage. Each member donates a portion of their earnings monthly, creating a shared fund to support:',

       }
    ];
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  