import { Link } from "react-router";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./theme-mode-toggle";

const Navbar = () => {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const links = ["How it works", "Recipes", "About"];
  return (
    <header className="fixed top-0 w-full p-1.5 bg-transparent backdrop-blur-sm z-40">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center">
            <img src="/pika-smart-logo.svg" alt="pika smart logo" />
          </Link>
        </div>
        <ul className="hidden md:flex justify-between items-center gap-8 text-primary">
          {links.map((link, idx) => (
            <li
              key={idx}
              className={`text-sm text-primary/80 font-bold hover:text-orange-400/80 ${selectedLink === link ? "text-orange-300/80" : ""}`}
            >
              <a href="#" onClick={() => setSelectedLink(link)}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center gap-4">
          <Button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 cursor-pointer">
            <Link to="/sign-in">Get Started</Link>
          </Button>
          <ModeToggle />
          <button
            className="md:hidden bg-none border-none text-gray-800/80 dark:text-white  hover:text-orange-400/80 cursor-pointer"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {openMobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg shadow-primary/10 py-6 px-6 flex flex-col gap-4 border-t">
          {links.map((item) => (
            <a
              key={item}
              href={`#`}
              className="text-primary font-medium py-2 border-b border-gray-100 hover:text-orange-400/80 transition duration-300"
              onClick={() => setOpenMobileMenu(false)}
            >
              {item}
            </a>
          ))}
          <Button className="bg-orange-500 text-white hover:bg-orange-500/70 rounded-lg font-semibold mt-2 w-full">
            <Link to="/sign-in">Get Started</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
