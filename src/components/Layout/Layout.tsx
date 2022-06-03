import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Layout.module.scss";

const Layout: FC = () => {
  return (
    <div className={s.root}>
      <Header />
      <div className={s.wrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
