import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen text-white bg-gradient-to-r from-red-600 to-yellow-400">
      <div className="flex flex-col flex-grow h-full w-full items-center justify-center mt-10">
        <div className="text-center">
          {/* Hero Section */}
          <h1 className="text-6xl font-extrabold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl mb-10">
            Manage your releases and repositories easily in one place
          </p>

          {/* Menu Buttons */}
          <nav className="space-x-6">
            <Link href="/releases" className="my-hero-button">Releases</Link>
            <Link href="/repositories" className="my-hero-button">Repositories</Link>
          </nav>
        </div>   
      </div>
    </main> 
  );
}