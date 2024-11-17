import "../globals.css";
import Link from "next/link";
import { metadata } from "../layout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <div className="min-h-screen bg-gray-100">
          {/* Header Section */}
          <header className="bg-gradient-to-r from-red-600 to-yellow-400 text-white shadow-lg">
            <Link href="/" className="text-white ">
              <div className="max-w-7xl mx-auto px-4 py-6 flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-12 h-12"
            >
              <path d="M12 2L3.5 8v8l8.5 6 8.5-6V8L12 2zm0 2.12l6.5 4.68v6.4L12 19.88 5.5 15.2V8.8L12 4.12zM9 9v6h6V9H9z" />
            </svg>
              <h1 className="text-2xl font-bold tracking-wide">{`${metadata.title}`}</h1>
            </div>
            </Link>
          </header> 
      
          {/* Main Content */}
          <main className="max-w-7xl p-6 sm:mx-6 lg:mx-auto bg-white shadow-lg rounded-lg mt-8 text-gray-600">
            {children}
        </main>
      </div>
  );
}