import React, { ReactNode } from "react";
import MainNavigation from "./MainNavigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
