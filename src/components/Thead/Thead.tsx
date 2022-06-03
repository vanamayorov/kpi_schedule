import { FC } from "react";
import s from "./Thead.module.scss";
const Thead: FC = () => {
  const days = [
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
  ];

  return (
    <thead>
      <tr className={s.tr}>
        <th className={s.th}>{" "}</th>
        {days.map((day, ind) => (
          <th className={s.th} key={ind}>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
