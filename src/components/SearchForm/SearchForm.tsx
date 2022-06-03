import axios from "axios";
import debounce from "lodash.debounce";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { IGroupsList } from "../../types/api";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import api from "../../api";
import s from "./SearchForm.module.scss";

interface ISearchForm {
  textLabel: string;
  textBtn: string;
}

const FormButton = styled(Button)({
  backgroundColor: "rgb(30,64,175)",
  display: "inline-block",
  width: "10rem",
  padding: "0.5rem",
  borderRadius: "0.75rem",
  margin: "0 auto",
  ":hover": {
    backgroundColor: "rgb(30,64,175)",
  },
});

const FormInput = styled(TextField)({
  marginBottom: "0.5rem",
  "& label.Mui-focused": {
    color: "rgb(30,64,175)",
  },
  "&:hover label": {
    color: "rgb(30,64,175)",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "rgb(30,64,175)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(30,64,175)",
    },
  },
});

const GroupsList = styled(List)({
  position: "absolute",
  top: "56px",
  left: 0,
  right: "15px",
  borderRadius: "4px",
  borderColor: "rgba(0, 0, 0, 0.23)",
  borderStyle: "solid",
  borderWidth: "1px",
  display: "none",
  borderTop: "none",
  borderTopLeftRadius: "0",
  borderTopRightRadius: "0",
  padding: 0,
  maxHeight: "50vh",
  overflowY: "auto",
  zIndex: 2,
  backgroundColor: "#fff",
});

const GroupsListItem = styled(ListItem)({
  ":not(:last-child)": {
    borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
  },
});

const SearchForm: FC<ISearchForm> = ({ textLabel, textBtn }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [val, setVal] = useState("");
  const [error, setError] = useState("");
  const [groupsList, setGroupsList] = useState<IGroupsList[]>([]);
  const { pathname } = useLocation();
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const inputValue = val.toLowerCase().trim();
    if (!inputValue) {
      setError("Введіть назву групи для відображення!");
      return;
    }

    try {
      await api.endpoints.lessons(inputValue);
      setSearchParams({ groupParam: inputValue });
      setVal("");
      setError("");
    } catch (e) {
      setError("Такої групи не існує!");
    }
  };

  const onInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);

    if (
      !e.target.value.toLowerCase().trim() ||
      e.target.value.toLowerCase().trim().length <= 2
    ) {
      if (listRef.current) {
        listRef.current.style.display = "none";
      }
      setError("");
      setGroupsList([]);
      return;
    }

    handleInput(e.target.value);
    if (listRef.current) {
      listRef.current.style.display = "block";
    }
  };

  const handleInput = useCallback(
    debounce(async (groupName: string) => {
      try {
        const { data } = await api.endpoints.groups(groupName);
        setGroupsList(data.data);
        setError("");
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log(e.response?.statusText);
        } else {
          console.log((e as Error).message);
        }
      }
    }, 400),
    []
  );

  const listClickHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    if (listRef.current) {
      listRef.current.style.display = "block";
    }
  }, []);

  const documentClickHandler = useCallback(() => {
    if (listRef.current) {
      listRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    listRef?.current?.addEventListener("click", listClickHandler);
    document.addEventListener("click", documentClickHandler);
    setError("");

    return () => {
      document.removeEventListener("click", documentClickHandler);
      listRef?.current?.removeEventListener("click", listClickHandler);
    };
  }, [pathname]);

  return (
    <form className={s.root} onSubmit={handleForm}>
      <FormInput
        label={textLabel}
        variant="outlined"
        value={val}
        onInput={onInputField}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <FormButton className={s.btn} variant="contained" type="submit">
        {textBtn}
      </FormButton>
      <GroupsList ref={listRef}>
        {groupsList?.map(i => (
          <GroupsListItem key={i.group_id} disablePadding>
            <Link className={s.link} to={`/?groupParam=${i.group_id}`}>
              {i.group_full_name}
            </Link>
          </GroupsListItem>
        ))}
      </GroupsList>

      {error && <div className={s.error}>{error}</div>}
    </form>
  );
};

export default SearchForm;
