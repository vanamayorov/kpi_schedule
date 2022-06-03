import { FC } from "react";
import { ILesson } from "../../types/api";
import Thead from "../Thead/Thead";
import s from "./Table.module.scss";

const timeOfLessons = [
  { num: "1", start: "08:30" },
  { num: "2", start: "10:25" },
  { num: "3", start: "12:20" },
  { num: "4", start: "14:15" },
  { num: "5", start: "16:10" },
  { num: "6", start: "18:30" },
];

type lessonArrayType = ILesson | undefined;

interface ITableCell {
  lesson: lessonArrayType;
  currentDay: boolean;
}

const TableCell: FC<ITableCell> = ({ lesson, currentDay, ...props }) => {
  if (!lesson) {
    return <td className={currentDay ? s.td_active : s.td}></td>;
  }

  return (
    <td className={currentDay ? s.td_active : s.td}>
      <span className={s.label}>{lesson.lesson_full_name}</span>
      <span className={s.teacher}>{lesson.teacher_name}</span>
      <br />
      <span>{lesson.lesson_type}</span>
    </td>
  );
};

interface ITable {
  title: string;
  lessons: ILesson[];
  currentWeek: boolean;
}

const Table: FC<ITable> = ({ title, lessons, currentWeek, ...props }) => {
  const today = new Date().getDay() - 1;
  const daysArray = makeDaysArr();

  function makeDaysArr() {
    const daysArray: lessonArrayType[][] = [];
    for (let i = 1; i <= 6; i++) {
      const row: lessonArrayType[] = [];
      for (let j = 1; j <= 6; j++) {
        const lesson = lessons.find(
          (lesson) => +lesson.lesson_number === i && +lesson.day_number === j
        );

        row.push(lesson);
      }
      daysArray.push(row);
    }

    return daysArray.filter((arr) => new Set(arr).size > 1);
  }

  const markupArray = daysArray.map((item) => {
    const arr: JSX.Element[] = [];

    item.forEach((i, ind) => {
      arr.push(
        <TableCell
          key={Math.floor(Math.random() * 1e6)}
          lesson={i}
          currentDay={currentWeek && ind === today}
        />
      );
    });

    return arr;
  });

  return (
    <div className={s.wrapper}>
      <h3 className={s.subtitle}>{title} тиждень</h3>
      <table className={s.root}>
        <Thead />
        <tbody>
          {markupArray.map((markup, ind) => (
            <tr className={s.tr} key={ind}>
              <td className={s.td}>
                {timeOfLessons[ind].num} <br />
                {timeOfLessons[ind].start}
              </td>
              {markup}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
