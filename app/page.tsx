import Link from 'next/link';

export default function Home() {
  return (
      <div className="text-center">
        {/* Hero Section */}
        <h1 className="text-6xl font-extrabold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-xl mb-10">
          Manage your releases and repositories easily in one place
        </p>

        {/* Menu Buttons */}
        <nav className="space-x-6">
          <Link href="/releases" className="my-button">
            Releases
          </Link>
          <Link href="/repositories" className="my-button">
            Repositories
          </Link>
        </nav>
      </div>    
  );
}