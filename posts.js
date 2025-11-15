// assets/js/posts.js
const POSTS = [
  {
    id: "p1",
    title: "Sunset at Panambur Beach",
    author: "Aisha",
    date: "2025-10-05",
    thumbnail: "assets/img/panambur.jpg",
    tags: ["beach","sunset","kudla"],
    category: "Beaches",
    content: `<p>Panambur is famous for its long sandy beaches...</p><p><strong>Tips:</strong> Go during late afternoon...</p>`
  },
  {
    id: "p2",
    title: "Temple walk: Kadri Manjunath",
    author: "Ravi",
    date: "2025-09-22",
    thumbnail: "assets/img/kadri.jpg",
    tags: ["temple","history","culture"],
    category: "Culture",
    content: `<p>Kadri Manjunath Temple is a historic temple...</p>`
  }
  // add more posts...
];

const GUIDES = [
  {
    id: "g1",
    name: "Suresh B",
    bio: "Local guide, food lover, historian of Kudla.",
    expertise: ["Culture","History","Food"],
    avatar: "assets/img/guide1.jpg",
    social: { instagram: "#", twitter: "#" },
    posts: ["p2"]
  }
];

const DESTINATIONS = [
  {
    id: "d1",
    name: "Panambur Beach",
    description: "Busy beach with water sports and sunsets.",
    images: ["assets/img/panambur.jpg"],
    mapEmbed: "" // put iframe src if you want
  }
];
