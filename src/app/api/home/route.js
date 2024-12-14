// src/app/api/hello/route.js

export async function GET(request) {
  const data = {
    name: ' Well Come To United Hands',
    img: 'http/1334.3.3',
    description: "A group dedicated to celebrating the spirit of togetherness and harmony, where every festival becomes a symbol of joy, love, and shared traditions. Through collective efforts, we light up our community with happiness and create cherished memories that strengthen our bonds",

    adds: [
      {
        id: 1,
        name: 'Celebrate Together, Support with Love!',
        description: 'Your support helps us celebrate festivals with joy and unity. Donate to spread happiness, preserve traditions, and strengthen our community bonds!',
        img: 'https://media.istockphoto.com/id/1436319269/vector/group-of-diverse-people-with-arms-and-hands-raised-towards-a-hand-painted-heart-charity.jpg?s=612x612&w=0&k=20&c=gZdRZiNly1HoX4k0Qa8LnlTOD6fjjHSm_haq7pizYD4=',
      },
      {
        id: 2,
        name: 'Donate ',
        description: 'Join hands with us in spreading joy and unity! Your contributions make it possible to celebrate our festivals with greater warmth and togetherness. By donating, you’re not just giving money; you’re helping us preserve traditions, strengthen bonds, and create memories that last a lifetime. Let’s celebrate the spirit of community, one festival at a time!',
        img: 'https://fingreen.org/wp-content/uploads/2024/06/shutterstock-2341161137-1-66790ede00d5f.webp',
      },
      {
        id: 3,
        name: 'Community Growth Initiative',
        description: 'To build a self-sustaining financial system that empowers individuals, preserves cultural traditions, and creates lasting legacies for future generations.Through this initiative, we aim to transform small contributions into meaningful impact, driving community success and prosperity.',
        img: 'https://cdn.shopify.com/s/files/1/0070/7032/articles/how_20to_20make_20money_20on_20youtube_a139ac8e-6e39-4873-89ba-879c708a8b4d.jpg?v=1730128493',
      }
    ],
    addsRotatingTime: 10000,
    events: [{
      id: 1,
      name: "Strength in unity, joy in community.",
      description: 'This program unites our village friends in the spirit of togetherness, where everyone contributes a small amount monthly. These funds are dedicated to celebrating festivals and events that bring us closer as a community. It’s not just about money—it’s about sharing joy, fostering relationships, and creating lifelong memories. Together, we make every celebration brighter and every event more meaningful.',
      startDate: '',
      endDate: '',
      img: 'https://fingreen.org/wp-content/uploads/2024/06/shutterstock-2341161137-1-66790ede00d5f.webp',
      subEvents: [
        {
          id:1,
          name:'',
          img:'',
          description:''
        }
      ]
    }],

  }
    ;

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
