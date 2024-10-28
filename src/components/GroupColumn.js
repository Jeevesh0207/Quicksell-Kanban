import React, { useMemo } from "react";
import {
  Add,
  Backlog,
  Canceled,
  HighPriority,
  InProgress,
  Done,
  LowPriority,
  MediumPriority,
  NoPriority,
  ThreeDot,
  Todo,
  UrgentPriority,
  User,
} from "../svg";
import Card from "./Card";
import { useSelector } from "react-redux";

function GroupColumn({ Name, List }) {
  const groupBy = useSelector((state) => state.getDisplayData.groupBy);

  const ByStatus = useMemo(
    () => ({
      Backlog: <Backlog />,
      Todo: <Todo />,
      "In progress": <InProgress />,
      Done: <Done />,
      Canceled: <Canceled />,
    }),
    []
  );

  const ByPriority = useMemo(
    () => ({
      "No priority": <NoPriority />,
      Urgent: <UrgentPriority />,
      High: <HighPriority />,
      Medium: <MediumPriority />,
      Low: <LowPriority />,
    }),
    []
  );

  const Icon =
    groupBy === "Status" ? (
      ByStatus[Name]
    ) : groupBy === "Priority" ? (
      ByPriority[Name]
    ) : (
      <User />
    );

  return (
    <div className="GroupColumn">
      <div className="heading">
        <div className="left">
          {Icon}
          <p>{Name}</p>
          <p>{List?.length}</p>
        </div>
        <div className="right">
          <Add size={20} />
          <ThreeDot size={20} />
        </div>
      </div>
      <div className="cards">
        <Card List={List} />
      </div>
    </div>
  );
}

export default React.memo(GroupColumn);
