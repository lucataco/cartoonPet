import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";
import { Process } from "../components/Process";

const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>CartoonPet - Turn your pet into a cartoon</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <a
          href="https://replicate.com/catacolabs/cartoonify"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-600 rounded-lg py-2 px-4 text-gray-600 text-sm mb-5 transition duration-300 ease-in-out hover:text-gray-400"
        >
          Used over{" "}
          <span className="text-green-600">500+</span>
          {" "}times and counting!
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-900 sm:text-7xl">
          Cartoon Pet pictures{" "}
          <span className="relative whitespace-nowrap text-green-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-700 text-gray-700 leading-7">
        Turn your pet into a cartoon in seconds. Create stunning realistic AI cartoon
        portraits of your pet that you would proudly show off on social media.
        </h2>
        <Link
          className="bg-green-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-green-500 transition"
          href="/dream"
        >
          Create Yours Now
        </Link>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original Pet</h3>
                <Image
                  alt="Original photo of a pet"
                  src="/pet-original.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Cartoon</h3>
                <Image
                  alt="Generated cartoon"
                  width={400}
                  height={400}
                  src="/pet-generated.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Testimonials />
      <Process />
      <section
        id="about"
        aria-label="About"
        className="py-10"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 md:px-7">
          <div className="mx-auto md:text-center">
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800 sm:text-6xl">
              About
            </h1>
            <p className="flex justify-center">
              <Image
                alt="catacolabs logo"
                width={80}
                height={80}
                src="/cat-logo.png"
              />
            </p>
            <p className="mx-auto mt-4 max-w-xl text-lg sm:text-gray-500 text-gray-500 leading-7">
              <Link target="_blank" href="https://catacolabs.com">
                <span className="text-green-600">CatacoLabs.com</span>
              </Link>
              {" "} is a software Lab company focused on research and experimentation. Inspired to create unique and 
              beautiful cartoon images for all pets, CatacoLabs is passionate about making cartoon pet images 
              that are both affordable and appealing to all.
            </p>
          </div>
        </div>
      </section>
      <section
        id="faq"
        aria-label="frequently asked questions"
        className="py-10"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 md:px-7">
          <div className="mx-auto md:text-center">
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800 sm:text-6xl">
              Frequently asked questions
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg sm:text-gray-500 text-gray-500 leading-7">
              Dont see your question below? Ask us at help@catacolabs.com
            </p>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6"
            >
               <li className="flex justify-center gap-x-3">
                1. What separates CartoonPetPics from others?  
                <br />
                Cheaper, faster turn around time, and open source!
              </li>
              <li className="flex justify-center  gap-x-3">
                2. What picture formats do you accept for upload?
                <br />
                We support JPG, PNG, WebP, and HEIC
              </li>
              <li className="flex justify-center gap-x-3">
                3. How do I save my cartoon images?
                <br />
                You can download your image as soon as you create it
              </li>
              <li className="flex justify-center  gap-x-3">
                4. What do you do with my photos?
                <br />
                We use it to render your cartoon picture, then delete them from our servers after 1 hour
              </li>
              <li className="flex justify-center  gap-x-3">
                5. Where is my data stored?
                <br />
                Data is stored securely on servers in the United States, by our vetted & secure third party partners
              </li>
              <li className="flex justify-center  gap-x-3">
                6. Is payment secure?
                <br />
                Yes, none of your credit card information is stored and all payments are processed through Stripe
              </li>
              <li className="flex justify-center  gap-x-3">
                7. Is my privacy protected?
                <br />
                Your email is used to identify your image generations. We will not sell your email, or spam you promotional content from other brands
              </li>
              <li className="flex justify-center  gap-x-3">
                8. Can I get a refund?
                <br />
                We will redeem your credits automatically if your upload is unsuitable for image processing. If you are not satisfied with your image, please contact us at help@catacolabs.com
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center mb-10">
          <Link
            className="bg-green-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-green-500 transition"
            href="/dream"
          >
            Create Yours Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
