import React from "react";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Header />

      <div className="main">
        <div className="container">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
