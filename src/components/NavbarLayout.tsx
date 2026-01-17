import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type NavbarLayoutProps = {
  children?: React.ReactNode;
};

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  return (
    <div className="w-full m-0 p-0">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default NavbarLayout;
