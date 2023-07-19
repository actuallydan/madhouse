// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { db } from "~/db/connection";

import { posts } from "~/db/schema";

import { z } from "zod";

// interface Post {
//   id: number;
//   title: string;
//   description: string;
//   url: string;
//   file?: string;
//   isVideo: boolean;
//   createdAt?: number;
//   updatedAt?: number;
// }

export const postsRouter = createTRPCRouter({
  allPosts: publicProcedure.query(() => {
    return db.select().from(posts).limit(50);
  }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        domain: z.string(),
        file: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);

      try {
        const res = await db.insert(posts).values({
          title: input.title,
          description: input.description,
          domain: input.domain,
          file: input.file,
          isVideo: isVideoFile(input.file),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        console.log(res);
        return res;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
});

function isVideoFile(url: string) {
  if (!url) {
    return false;
  }
  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".wmv",
    ".flv",
    ".webm",
    ".m4v",
    ".mpg",
    ".mpeg",
    ".3gp",
  ];

  let fileExtension = url.split(".").pop();
  if (!fileExtension) {
    return false;
  }
  fileExtension = fileExtension.toLowerCase();

  return videoExtensions.includes(`.${fileExtension}`);
}
