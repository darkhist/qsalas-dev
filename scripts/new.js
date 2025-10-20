import { writeFileSync, mkdirSync } from "node:fs";
import { input, editor, confirm } from "@inquirer/prompts";
import path from "node:path";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const title = await input({ message: "What should I call this thought?" });

const slug = slugify(title);
const now = new Date();
const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
const timestamp = now.toLocaleTimeString("en-US", {
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const matter = `---
title: "${title}"
date: "${date}"
time: "${timestamp}"
description: ""
---

import { Image } from 'astro:assets';

`;

const content = await editor({
  message: "What are you thinking about?",
  default: matter,
  postfix: ".mdx",
});

const publish = await confirm({ message: "Publish?" });

const folderName = `${date}-${slug}`;
const destination = publish
  ? path.join("src/content/blog", folderName)
  : path.join(process.env.HOME, "Documents/blog/drafts", folderName);

mkdirSync(destination, { recursive: true });

const filePath = path.join(destination, "index.mdx");
writeFileSync(filePath, content, { encoding: "utf-8" });

console.log(`\n🧙 Created new post at ${filePath}\n`);
