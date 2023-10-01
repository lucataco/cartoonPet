import { useSession } from "next-auth/react";
import Script from "next/script";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";

export default function Pricing() {
  const { data: session } = useSession();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/remaining", fetcher);
  let userEmail = (session?.user && session.user.email) ? session.user.email : "guest@cartoonpet.pics";

  return (
    <div className="flex mx-auto max-w-7xl overflow-visible flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>CartoonPet Pricing</title>
      </Head>
      <Script src="https://js.stripe.com/v3/pricing-table.js" />
      <Header photo={session?.user?.image || undefined} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mb-0 mb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
              Purchase CartoonPet Credits
            </p>
          </div>
        </div>
        {session?.user?.email ? (
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 mb-10">
            You currently have{" "}
            <span className="font-semibold text-gray-400">
              {data?.remainingGenerations} credits
            </span>
            . Purchase more below.
          </p>
        ) : (
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 mb-10">
            Please{" "}
            <Link
              href="/dream"
              className="text-green-600 underline underline-offset-2"
            >
              log in to use your credits
            </Link>
          </p>
        )}
      </main>
      <div className="w-full">
          {/* @ts-ignore */}
          <stripe-pricing-table
            pricing-table-id="prctbl_1NvvskLUYb1rdMDZ5YMygYko"
            publishable-key="pk_live_51LzUILLUYb1rdMDZYbmwC5xp4xvEIHTahSkdDLAmXSgNtafpbzsb7CcgidReSKfpHRyCtZWAZWVFWxVNdakVxZ2300Q8cCAOv0"
            client-reference-id={userEmail}
            customer-email={userEmail}
          />
      </div>
      <div className="mt-10 flex items-center gap-x-4">
        <h4 className="flex-none leading-6 mt-2 text-2xl font-bold tracking-tight text-gray-700 sm:text-5xl">
          What’s included
        </h4>
        <div className="h-px flex-auto bg-gray-100"></div>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6 mb-10"
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
          Save your generated pictures
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
          Get more cartoon poses and styles
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
      <p className="center text-gray-400 mb-5 pl-5 sm:pl-0">
        Interested in team or bulk pricing? <br />
        Email: help@catacolabs.com
      </p>
      <Footer />
    </div>
  );
}
