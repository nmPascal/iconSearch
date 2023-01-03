import React from "react";
import CSS from "./style.module.css";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className={CSS.layout}>{children}</div>;
};

export default Layout;
