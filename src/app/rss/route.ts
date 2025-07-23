import { Feed } from "feed";
import { getArticles } from "@/actions/articles";

const feed = new Feed({
  title: "Ferres RSS Feed",
  description: "Este é o meu feed RSS!",
  id: "https://ferres.io",
  link: "https://ferres.io/rss.xml",
  language: "pt-BR",
  copyright: "All rights reserved 2025, Ferres",
});

export async function GET() {
  const posts = await getArticles();

  posts.forEach((post) => {
    feed.addItem({
      title: `${post.title ?? ""}`,
      link: `https://ferres.io/articles/${post.slug}`,
      description: `${post.description ?? ""}`,
      date: new Date(post.publishedAt ?? ""),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
