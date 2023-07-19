import Head from "next/head";
// import Link from "next/link";
import { api } from "~/utils/api";
import Header from "~/features/Header";
import { useAtom } from "jotai";

import { isModalOpenAtom } from "~/state/atoms";
import { useEffect } from "react";

import CreatePostModal from "~/features/CreatePostModal";
import Splash from "~/features/Splash";

export default function Home() {
  const [isModalOpen] = useAtom(isModalOpenAtom);

  useEffect(() => {
    const main = document.body;

    if (!main) {
      return;
    }

    main.style.overflow = isModalOpen ? "hidden" : "initial";
  }, [isModalOpen]);

  return (
    <>
      <Head>
        <title>madhouse</title>
        <meta
          name="description"
          content="tell us about websites that make you mad"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="w-[clamp(300px, 100%, 1200px)] mx-auto flex min-h-screen flex-col items-center justify-start bg-theme bg-opacity-20 p-4">
        <Splash />
        <Dashboard />
      </main>
      {isModalOpen ? <CreatePostModal /> : null}
    </>
  );
}

const posts: Post[] = [
  {
    id: 1,
    title: "Basic Tee 8-Pack",
    domain: "test-example.com",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    file: "/image-1.png",
    isVideo: false,
  },
  {
    id: 2,
    title: "Basic Tee",
    domain: "test-example.com",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    file: "/image-2.jpg",
    isVideo: false,
  },
  {
    id: 3,
    title: "Basic Tee 8-Pack",
    domain: "test-example.com",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    file: "/image-3.png",
    isVideo: false,
  },
  {
    id: 4,
    title: "This form desn't work when I tab out and tab back in",
    domain: "test-example.com",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    file: "/image-4.png",
    isVideo: false,
  },
  {
    id: 5,
    title: "Basic Tee 8-Pack",
    domain: "test-example.com",
    description:
      "make up to $3200 a month by working from your office! https://scam.me/8sd76f",
    file: "/image-5.png",
    isVideo: false,
  },
  {
    id: 6,
    title: "Website loads super slow on firefox, as per",
    domain: "test-example.com",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    file: "/image-6.mov",
    isVideo: true,
  },
];

interface Post {
  id: number;
  title: string;
  description: string;
  domain: string;
  file?: string;
  isVideo: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export function Dashboard() {
  const { data, isLoading, error } = api.posts.allPosts.useQuery();

  console.log(data);

  if (isLoading) {
    return (
      <div className="mt-16 w-full">
        <div className="py-16">
          <h2 className="mb-8 text-center text-4xl font-bold">
            Some Busted-#$@ sites
          </h2>

          <div className="columns-1 md:columns-2 lg:columns-3">
            {/* loaders */}

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative my-6 flex h-96 w-full animate-pulse flex-col gap-6 overflow-hidden rounded-lg border-4 border-theme-dark bg-theme-dark p-4"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full ">
      <div className="py-16">
        <h2 className="mb-8 text-center text-4xl font-bold">
          Some Busted-#$@ sites
        </h2>

        <div className="columns-1 md:columns-2 lg:columns-3">
          {posts.map((post) => (
            <a href={`/p/${post.id}`} key={post.id}>
              <div className="relative my-6 flex flex-col gap-6 overflow-hidden rounded-lg border-4 border-gray-300 bg-white p-4">
                <div className="flex flex-row items-start justify-start">
                  <span className="mr-2 rounded-full bg-theme bg-opacity-50 px-3 py-1 font-mono text-base font-bold text-theme-dark">
                    {post.id}
                  </span>
                  <p className="flex-grow py-1 text-base font-medium text-gray-900">
                    {post.title}
                  </p>
                </div>
                <div className="max-w-full">
                  {post.isVideo ? (
                    <video
                      src={post.file}
                      className="w-full rounded-lg transition-all hover:rounded-none sm:w-full"
                      muted
                      controls
                    />
                  ) : (
                    <img
                      src={post.file}
                      className="w-full rounded-lg transition-all hover:rounded-none sm:w-full"
                      alt={post.title}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <h3>
                    <span className="rounded-full bg-sky-200 px-3 py-1 text-sm font-medium text-sky-700">
                      {post.domain}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">{post.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
