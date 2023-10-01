import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

export default function Header({ photo }: { photo?: string }) {
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function handleMenuClick() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if(window.innerWidth < 768)
      setIsSmallWindow(true)
  }, [])

  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <Image
          alt="CartoonPet logo"
          src="/logo.png"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        />
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          CartoonPet.pics
        </h1>
      </Link>
      {/* Check if logged in */}
      {photo ? (
        /* Check if small window in */
        isSmallWindow ? (
          <div className="flex flex-column mobile-menu-icon">
            {isOpen ? (
              <div className="items-center space-y-4">
                <GrClose onClick={handleMenuClick}/>
                <Link
                  href="/dream"
                  className="pr-4 flex space-x-2 hover:text-green-400 transition"
                >
                  <div>Create</div>
                </Link>
                <Link
                  href="/buy-credits"
                  className="pr-4 flex space-x-2 hover:text-green-400 transition"
                >
                  <div>Pricing</div>
                </Link>
                <Link
                  href="/dashboard"
                  className="pr-4 flex space-x-2 hover:text-green-400 transition"
                >
                  <div>History</div>
                </Link>
              </div>
            ) : (
              <AiOutlineMenu onClick={handleMenuClick}/>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/dream"
              className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-green-400 transition"
            >
              <div>Create</div>
            </Link>
            <Link
              href="/buy-credits"
              className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-green-400 transition"
            >
              <div>Pricing</div>
            </Link>
            <Link
              href="/dashboard"
              className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-green-400 transition"
            >
              <div>History</div>
            </Link>
            <Image
              alt="Profile picture"
              src={photo}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          </div>
        )
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            href="/buy-credits"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-green-400 transition"
          >
            <div>Pricing</div>
          </Link>
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-green-600 text-white px-5 py-2 text-sm shadow-md hover:bg-green-400 bg-green-600 font-medium transition"
            href="/dream"
          >
            <p>Log In</p>
          </Link>
        </div>
      )}
    </header>
  );
}