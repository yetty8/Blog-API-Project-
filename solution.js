import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized FinanceYou must be the change you wish to see in the world.",
    content:
      " Spread love everywhere you go. Let no one ever come to you without leaving happier.The only thing we have to fear is fear itself. Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate: only love can do that. Do one thing every day that scares you.Well done is better than well said.The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.It is during our darkest moments that we must focus to see the light.Do not go where the path may lead; go instead where there is no path and leave a trail.",
     
    author: "Yetbarek Temesgen",
    date: " 2024-11-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Be yourself; everyone else is already taken.",
    content:
      "You will face many defeats in life, but never let yourself be defeated.Go confidently in the direction of your dreams! Live the life you've imagined. In the end, it's not the years in your life that count. It's the life in your years. Never let the fear of striking out keep you from playing the game. In this life we cannot do great things. We can only do small things with great love. Many of life's failures are people who did not realize how close they were to success when they gave up. You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    author: "Rebecca Temesgen",
    date: "2024-11-05T14:30:00Z",
  },
  {
    id: 3,
    title: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    content:
      "Life is really simple, but we insist on making it complicated. May you live all the days of your life. Life itself is the most wonderful fairy tale. Do not let making a living prevent you from making a life. Go confidently in the direction of your dreams! Live the life you've imagined.” – Henry David Thoreau",
    author: "Prince Temesgen",
    date: "2024-11-10T09:15:00Z",
  },
  {
    id: 4,
    title: "Life is made of ever so many partings welded together.",
    content:
      "In the depth of winter, I finally learned that within me there lay an invincible summer. In three words, I can sum up everything I've learned about life: it goes on. So we beat on, boats against the current, borne back ceaselessly into the past. Life is either a daring adventure or nothing. You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    author: "Coco Temesgen",
    date: " 2024-11-20T09:15:00Z",
  },
  {
    id: 5,
    title: "The secret of success is to do the common thing uncommonly well.",
    content:
      "Success is not final; failure is not fatal: It is the courage to continue that count. Success usually comes to those who are too busy to be looking for it. If you want to make your dreams come true, the first thing you have to do is wake up. If you really look closely, most overnight successes took a long time. The secret of success is to do the common thing uncommonly well. I find that the harder I work, the more luck I seem to have. The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt",
    author: "Hazel Temesgen",
    date: "2024-11-30T09:15:00Z",
  },
  
];

let lastId = 5;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
