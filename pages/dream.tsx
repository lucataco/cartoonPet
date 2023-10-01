import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import { useSession, signIn } from "next-auth/react";
import useSWR from "swr";
import { Rings } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/remaining", fetcher);
  const { data: session, status } = useSession();

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: {
      colors: {
        primary: "#2563EB", // Primary buttons & links
        error: "#ddf4d", // Error messages
        shade100: "#000", // Standard text
        shade200: "#444e", // Secondary button text
        shade300: "#fffd", // Secondary button text (hover)
        shade400: "#000c", // Welcome text
        shade500: "#0009", // Modal close button
        shade600: "#4447", // Border
        shade700: "#0002", // Progress indicator background
        shade800: "#0001", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
    onValidate: async (file: File): Promise<undefined | string> => {
      return data.remainingGenerations <= 0
        ? `No more generations left. Buy more above.`
        : undefined;
    },
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { imageUrl: fileUrl,
        }),
    });

    let genResponse = await res.json();
    let webhookUrl = genResponse.hook;
    if(webhookUrl == undefined){
      setError("Error fetching API call from  Replicate")
    } else {
      let roomId = genResponse.id;
      console.log("webhookUrl:", webhookUrl);
      console.log("roomId:" + roomId)
      let generatedImage: string | null = null;
      while (!generatedImage) {
        // Loop in 1s intervals until the alt text is ready
        let finalResponse = await fetch("/api/prediction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              hookUrl: webhookUrl,
              originalImg : fileUrl,
              roomId: roomId
            })
        });
        let jsonFinalResponse = await finalResponse.json();
        if (jsonFinalResponse[0].startsWith("https://")) {
          setRestoredImage(jsonFinalResponse[0]);
          break;
        } else if (jsonFinalResponse === "Filed to restore image") {
          console.log("Failed to generate cartoon")
          setError("Could not find a face in the image, make sure your face is centerd (not too close or far)m and try again")
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  const router = useRouter();

  useEffect(() => {
    if (router.query.success === "true") {
      toast.success("Payment successful!");
    }
  }, [router.query.success]);

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>CartoonPetPics</title>
      </Head>
      <Header photo={session?.user?.image || undefined} />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        {status === "authenticated" ? ( 
          <div></div>
        ) : (
          <a
            href="https://replicate.com/catacolabs/cartoonify"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-gray-700 text-sm my-6 duration-300 ease-in-out hover:text-gray-300 transition"
          >
            Over{" "}
            <span className="font-semibold text-green-600">1 thousand users</span>{" "}
            have used CartoonPetPics so far
          </a>
        )}
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800 sm:text-6xl mb-5">
          Generate your <span className="text-green-600">Cartoon</span> Picture
        </h1>
        {status === "authenticated" && data && !restoredImage && (
          <p className="text-gray-700">
            You have{" "}
            <span className="font-semibold text-gray-500">
              {data.remainingGenerations} generations
            </span>{" "}
            left.{" "}
            {data.remainingGenerations < 2 && (
              <span>
                Buy more generations{" "}
                <Link
                  href="/buy-credits"
                  className="font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-200 transition"
                >
                  here
                </Link>
                .
              </span>
            )}
          </p>
        )}
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {restoredImage && (
                <div>
                  Your cartoon picture has been successfully generated!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
              </div>
              {status === "loading" ? (
                <div className="max-w-[670px] h-[250px] flex justify-center items-center">
                  <Rings
                    height="100"
                    width="100"
                    color="white"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </div>
              ) : status === "authenticated" && !originalPhoto ? (
                <>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                      <Image
                        src="/number-1-black.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Upload a picture of your pet
                      </p>
                    </div>
                    <div className="flex w-96 ml-6 items-center space-x-3">
                      <ul
                        role="list"
                        className="mt-2 grid grid-cols-1 gap-4 leading-6 text-gray-500"
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
                          Choose an image where your pet is centered
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
                          Choose an image that fully captures your pet
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
                          Avoid having mutiple pets in your upload
                        </li>
                      </ul>
                    </div>
                  </div>
                  <UploadDropZone />
                </>
              ) : (
                !originalPhoto && (
                  <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] mt-2">
                    <div className="max-w-xl text-gray-600">
                      Sign in below with Google to create a free account and
                      generate your cartoon picture today. You will get 
                      1 generation for free.
                    </div>
                    <button
                      onClick={() => signIn("google")}
                      className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                    >
                      <Image
                        src="/google.png"
                        width={20}
                        height={20}
                        alt="google's logo"
                      />
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                )
              )}
              {originalPhoto && !restoredImage && (
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl h-96"
                  width={400}
                  height={400}
                />
              )}
              {restoredImage && originalPhoto && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Original Face</h2>
                    <Image
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative w-full h-96"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">Generated Picture</h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        width={400}
                        height={400}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button
                  disabled
                  className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8 max-w-[575px]"
                  role="alert"
                >
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Please try again later.
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                  </div>
                </div>
              )}
              <div className="flex space-x-4 justify-center">
                {originalPhoto && !loading && !error && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition"
                  >
                    Generate another Cartoon
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!)
                      );
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    Download generated Cartoon
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
