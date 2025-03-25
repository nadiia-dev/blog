import Link from "next/link";
import Logo from "./Logo";

const MainNavigation = () => {
  return (
    <header className="w-full h-24 bg-gray-700 flex justify-between items-center py-0 px-[10%]">
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/posts"
              className="text-gray-200 text-lg hover:text-gray-300 active:text-gray-300 focus:text-gray-300 md:text-xl px-4 py-2"
            >
              All Posts
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-200 text-lg hover:text-gray-300 active:text-gray-300 focus:text-gray-300 md:text-xl px-4 py-2"
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
