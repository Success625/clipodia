import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-2 bg-gray-900 text-slate-100 flex justify-between z-50">
      <Link to="/">
        <img
          src="/logo.png"
          width={48}
          height={48}
          alt="logo"
          className="rounded-full inline-block mr-2"
        />
        <span className="inline-block text-xl font-bold font-work-sans">
          Clipodia
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
