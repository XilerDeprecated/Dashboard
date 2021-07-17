import React, { useEffect, useState } from "react";

import { Content } from "./components/Content.comp";
import { Header } from "./components/Header.comp";
import { LayoutProps } from "./index.types";
import { Sidebar } from "./components/Sidebar.comp";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const Layout: React.FC<LayoutProps> = ({ barItems, children }) => {
  const { width } = useWindowDimensions();

  if (width <= 640)
    return (
      <div className="flex flex-col justify-center w-screen h-screen bg-accent-500">
        <h1 className="w-10/12 mx-auto text-xl font-bold text-center">
          We are working on it!
        </h1>
        <h2 className="w-10/12 mx-auto text-center">
          Our mobile dashboard is currently still under development, thank you
          for your patience!
        </h2>
      </div>
    );

  return (
    <>
      <Sidebar barItems={barItems ?? []} />
      <Header />
      <Content>{children}</Content>
    </>
  );
};
