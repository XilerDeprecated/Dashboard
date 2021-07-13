import React, { useEffect, useState } from "react";

import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { LayoutProps } from "./index.types";
import { Sidebar } from "./components/Sidebar";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const Layout: React.FC<LayoutProps> = ({ barItems, children }) => {
  const { width } = useWindowDimensions();

  if (width <= 640)
    return (
      <div className="bg-accent-500 h-screen w-screen flex flex-col justify-center">
        <h1 className="w-10/12 text-center mx-auto font-bold text-xl">We are working on it!</h1>
        <h2 className="w-10/12 text-center mx-auto">
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
