import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSpring, animated } from "@react-spring/web";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <main className="w-[clamp(300px, 100%, 1200px)] mx-auto flex min-h-screen flex-col items-center justify-start bg-theme bg-opacity-20 p-4">
        <button onClick={() => setIsModalOpen(true)}>open</button>
        <Dashboard />
      </main>
      {isModalOpen ? <CreatePostModal toggleModal={setIsModalOpen} /> : null}
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
      <div className="w-full ">
        <div className="py-16 sm:py-24">
          <h2 className="sr-only">posts</h2>

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
      <div className="py-16 sm:py-24">
        <h2 className="sr-only">posts</h2>

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

interface FormData {
  title: string;
  description: string;
  domain: string;
  file: string;
}

const defaultFormData = {
  title: "",
  description: "",
  domain: "",
  file: "",
};

function CreatePostModal({
  toggleModal,
}: {
  toggleModal: (arg: boolean) => void;
}) {
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  const createPostMutation = api.posts.createPost.useMutation();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const main = document.body;
    if (!main) {
      return;
    }

    main.style.overflow = "hidden";

    () => {
      main.style.overflow = "initial";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can perform any validation or API calls here with the formData

    if (/^(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/.test(formData.domain)) {
      // do some sort of error
      return;
    }
    console.log(formData);
    setIsLoading(true);

    createPostMutation
      .mutateAsync(formData)
      .then((res) => {
        console.log(res);
        setFormData(defaultFormData);
        // should go to page with id

        // router.push(`/${res.domain}/${res.id}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function closeModal(e: React.ChangeEvent<HTMLDivElement>) {
    const id = e.target.getAttribute("id");

    console.log(id);
    if (id === "create-post-modal") {
      const main = document.body;

      if (!main) {
        return;
      }
      main.style.overflow = "initial";

      toggleModal(false);
    }
  }

  return (
    <animated.div
      className="absolute top-0 z-10 flex min-h-screen w-full items-center justify-center bg-theme-dark bg-opacity-50 backdrop-blur-sm"
      id="create-post-modal"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      onClick={closeModal}
      style={springs}
    >
      <div className="w-[clamp(300px, 100%, 1200px)] mx-auto flex items-center justify-center">
        <div className="relative rounded-lg border-4 border-gray-300 bg-white p-8">
          {isLoading ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-theme bg-opacity-25 backdrop-blur-sm">
              <h2 className="mb-6 text-center text-2xl font-bold text-theme-dark">
                {`Submiting your ticket...`}
              </h2>
              <img src={"favicon.ico"} className=" w-4 animate-spin" />
            </div>
          ) : null}
          <h2 className="mb-6 text-center text-2xl font-bold text-theme-dark">
            {`Someone's website not working? Do tell! We'll let them know.`}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-theme-dark"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-4 py-2 focus:border-theme focus:outline-none"
                required
              />
              <p className="text-xs text-gray-600">
                Briefly summarize the problem you are experiencing
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-theme-dark"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-4 py-2 focus:border-theme focus:outline-none"
                rows={3}
                required
                // placeholder={`

                // `}
              />
              <p className="whitespace-pre-wrap text-xs text-gray-600">
                {`If you've encountered a problem or bug on a website, we appreciate your help in providing detailed instructions on how to recreate it. This will be used to assist the team in understanding and resolving the issue effectively.

Please follow these steps to explain how to reproduce the problem:

1. Start by specifying the page or section where you encountered the issue.
2. Describe any specific actions you took before the problem occurred.
3. Include any error messages or unexpected behaviors you noticed.
4. Let us know if the issue happens consistently or intermittently.
5. If applicable, mention the device, browser, and operating system you're using.

Feel free to add any additional information that might be helpful. Your feedback is invaluable to us in improving the internet and other users' experience. Thank you for your assistance!
`}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-theme-dark"
              >
                Domain
              </label>
              <input
                type="text"
                name="domain"
                id="domain"
                value={formData.domain}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-4 py-2 focus:border-theme focus:outline-none"
                title="Please enter a valid domain name (e.g., example.com)"
                required
                placeholder={"www.facebook.com"}
              />
              <p className="text-xs text-gray-600">
                Provide the URL address of the website
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-theme-dark"
              >
                File
              </label>
              <input
                type="text"
                name="file"
                id="file"
                value={formData.file}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border px-4 py-2 focus:border-theme focus:outline-none"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-md bg-theme-dark px-4 py-2 text-theme hover:bg-theme hover:text-theme-dark focus:border-theme focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </animated.div>
  );
}
