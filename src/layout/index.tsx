import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { LayoutProps } from "./index.types";
import React from "react";
import { Sidebar } from "./components/Sidebar";

export const Layout: React.FC<LayoutProps> = ({ barItems, children }) => {
  return <>
    <Sidebar barItems={barItems ?? []} />
    <Header />
    <Content>{children}</Content>
  </>;
};
