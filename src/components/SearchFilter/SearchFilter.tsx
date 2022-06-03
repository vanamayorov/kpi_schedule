import { FC } from "react";
import SearchForm from "../SearchForm/SearchForm";

interface ISearchFilter {
  pathname: string;
}

const SearchFilter: FC<ISearchFilter> = ({ pathname }) => {
  if (pathname === "/") {
    return <SearchForm textLabel="Група" textBtn="Розклад занять" />;
  }

  return null;
};

export default SearchFilter;
