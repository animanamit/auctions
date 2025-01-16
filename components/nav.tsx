import Link from "next/link";

const Nav = () => {
  return (
    <nav className="w-full border border-red-500">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/auctions">Auctions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
