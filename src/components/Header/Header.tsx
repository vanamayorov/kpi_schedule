import { FC } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import SearchFilter from "../SearchFilter/SearchFilter";
import s from "./Header.module.scss";

const Header: FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("groupParam");

  return (
    <header>
      <div className={s.inner}>
        <NavLink to="./">
          <img className={s.img} src="./images/logo.png" alt="Logo" />
          <h1 className={s.title}>
            Департамент організації освітнього процесу
          </h1>
        </NavLink>
      </div>
      {!queryParam && <SearchFilter pathname={pathname} />}
    </header>
  );
};

export default Header;
