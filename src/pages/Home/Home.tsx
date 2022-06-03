import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import Table from "../../components/Table/Table";
import TableLoader from "../../components/TableLoader/TableLoader";
import s from "./Home.module.scss";

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("groupParam") || "";
  const { groupLessons, groupName, week, isLoading, error } =
    useFetching(queryParam);

  const generateTables = () => {
    const tablesArr = [];

    for (let i = 1; i <= 2; i++) {
      tablesArr.push(
        <Table
          title={i === 1 ? "Перший" : "Другий"}
          lessons={groupLessons.filter((lesson) => +lesson.lesson_week === i)}
          currentWeek={week === i}
          key={i}
        />
      );
    }
    return tablesArr;
  };

  return (
    <>
      {error && <h2 className={s.error}>{error} :(</h2>}
      {isLoading && (
        <div className={s.loader_wrapper}>
          <TableLoader />
        </div>
      )}

      {!!groupLessons.length && (
        <div className={s.wrapper}>
          <h2 className={s.title}>
            Розклад занять для {groupName?.toUpperCase()}
          </h2>
          {generateTables()}
        </div>
      )}
    </>
  );
};

export default Home;
