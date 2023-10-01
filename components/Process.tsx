import Image from "next/image";
import Link from "next/link";

export function Process() {
  return (
    <section id="process" aria-label="How to use" className="py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 md:px-7">
        <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800 sm:text-6xl">
            The Process
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-gray-600  text-gray-600 leading-7">
            As simple as 1, 2, 3!
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-16 lg:max-w-none lg:grid-cols-3"
        >
          <li
            key={"step-1"}
            className="hover:scale-105 transition duration-300 ease-in-out "
          >
            <figure className="relative rounded-2xl bg-white-700 p-6 shadow-xl shadow-slate-900/10">
              <p className="text-4xl tracking-tight text-green-700">#1</p>
              <div className="font-bold text-base text-gray-800 mt-4">
                Upload your pet's photo
              </div>
              <div className="rounded-full text-gray-500 mt-2">
                We only need one photo of your pal to get started
              </div>
            </figure>
          </li>
          <li
            key={"step-2"}
            className="hover:scale-105 transition duration-300 ease-in-out "
          >
            <figure className="relative rounded-2xl bg-white-700 p-6 shadow-xl shadow-slate-900/10">
              <p className="text-4xl tracking-tight text-green-700">#2</p>
              <div className="font-bold text-base text-gray-800 mt-4">
                Ready in under 60 seconds
              </div>
              <div className="rounded-full text-gray-500 mt-2">
                Our AI will generate a portrait cartoon image of your pet in seconds, not hours
              </div>
            </figure>
          </li>
          <li
            key={"step-3"}
            className="hover:scale-105 transition duration-300 ease-in-out "
          >
            <figure className="relative rounded-2xl bg-white-700 p-6 shadow-xl shadow-slate-900/10">
              <p className="text-4xl tracking-tight text-green-700">#3</p>
              <div className="font-bold text-base text-gray-800 mt-4">
                Download your cartoon images
              </div>
              <div className="rounded-full text-gray-500 mt-2">
                Download your cartoon images in high-resolution
              </div>
            </figure>
          </li>
        </ul>
      </div>

      <div className="mx-auto md:text-center">
        <div className="mt-16 items-center text-center gap-x-4">
            <h4 className="flex-none leading-6 mt-2 text-xl font-bold tracking-tight text-gray-700 sm:text-2xl">
              What’s included
            </h4>
            <p className="mx-auto mt-6 max-w-xl text-lg sm:text-gray-600 text-gray-600 leading-7">
              Login and get 1 free credit to try
            </p>
        </div>
      </div>

      <div className="flex flex-1 w-full flex-col items-center justify-center text-center mb-4">
        <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6"
        >
          <li className="flex gap-x-3">
            <svg
              className="h-6 w-5 flex-none text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Save your generated images
          </li>
          <li className="flex gap-x-3">
            <svg
              className="h-6 w-5 flex-none text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Get more poses and styles
          </li>
          <li className="flex gap-x-3">
            <svg
              className="h-6 w-5 flex-none text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Premium support by email
          </li>
          <li className="flex gap-x-3">
            <svg
              className="h-6 w-5 flex-none text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Ability to request features
          </li>
          <li className="flex gap-x-3">
            <svg
              className="h-6 w-5 flex-none text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Commercial usage of photos
          </li>
          <li className="flex gap-x-3">
            <svg
              className="h-6 w-5 flex-none text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            Early access to future features
          </li>
        </ul>
      </div>
      
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center mb-4">
        <Link
          className="bg-green-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-green-500 transition"
          href="/dream"
        >
          Create Yours Now
        </Link>
      </div>

    </section>
  );
}
