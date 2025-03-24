import Link from "next/link";
import Logo from "./Logo";

const MainNavigation = () => {
  return (
    <header className="w-full h-24 bg-gray-800 flex justify-between items-center py-0 px-[10%]">
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/posts"
              className="text-gray-900 text-lg hover:text-gray-950 active:text-gray-950 focus:text-gray-950 md:text-xl px-4 py-2"
            >
              All Posts
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-900 text-lg hover:text-gray-950 active:text-gray-950 focus:text-gray-950 md:text-xl px-4 py-2"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
