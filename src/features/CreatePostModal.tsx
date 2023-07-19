import { useState, useEffect } from "react";
import { useAtom } from "jotai";

import { useRouter } from "next/router";

import { useSpring, animated } from "@react-spring/web";
import { api } from "~/utils/api";

import { isModalOpenAtom } from "../state/atoms";
import { X } from "lucide-react";

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

export default function CreatePostModal() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);

  const createPostMutation = api.posts.createPost.useMutation();

  // const router = useRouter();

  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

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

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <animated.div
      className="absolute top-0 z-10 flex min-h-screen w-full items-center justify-center bg-theme-dark bg-opacity-50 backdrop-blur-sm"
      style={springs}
    >
      <div className="w-[clamp(300px, 100%, 1200px)] xs:p-2 mx-auto flex items-center justify-center">
        <div className="relative rounded-lg border-4 border-gray-300 bg-white p-8">
          {isLoading ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-theme bg-opacity-25 backdrop-blur-sm">
              <h2 className="mb-6 text-center text-2xl font-bold text-theme-dark">
                {`Submiting your ticket...`}
              </h2>
              <img src={"favicon.ico"} className=" w-4 animate-spin" />
            </div>
          ) : null}
          <div className="flex items-start justify-between">
            <h2 className="mb-6 text-2xl font-bold text-theme-dark">
              {`Report a broken site`}
            </h2>
            <button
              data-close="create-post-modal"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              /* @ts-ignore */
              onClick={closeModal}
            >
              <X className="h-8" />
            </button>
          </div>
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
              />
              <p className="whitespace-pre-wrap text-xs text-gray-600">
                {`Please describe the issue and what caused it to the best of your ability.
    
1. Start by specifying the page or section where you encountered the issue.

2. Describe any specific actions you took before the problem occurred.

3. Include any error messages or unexpected behaviors you noticed.


Feel free to add any additional information that might be helpful. Your feedback is invaluable to us in improving the internet and other users' experience. Thank you for your assistance!
  `}
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
