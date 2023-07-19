import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { X, MenuIcon, Bell, Search } from "lucide-react";
import { useAtom } from "jotai";

import { isModalOpenAtom } from "../state/atoms";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [, setIsModalOpen] = useAtom(isModalOpenAtom);

  return (
    <header className="fixed z-10 flex w-full items-center justify-center bg-theme-dark px-4">
      <div className="mx-auto w-full md:w-4/5 lg:w-[1200px]">
        <div className="relative flex justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <a href="#">
                <img
                  className="h-8 w-auto"
                  src="/favicon.ico"
                  alt="madhouse logo"
                />
              </a>
            </div>
          </div>
          <div className="mx-4 min-w-0 flex-1">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-white bg-opacity-10 py-1.5 pl-10 pr-3 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="ml-6 inline-flex items-center rounded-md bg-theme px-3 py-2 text-sm font-semibold text-theme-dark hover:bg-theme hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
