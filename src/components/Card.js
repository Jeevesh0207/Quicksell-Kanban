import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Backlog,
  Canceled,
  HighPriority,
  InProgress,
  Done,
  LowPriority,
  MediumPriority,
  NoPriority,
  Todo,
  UrgentPriority,
} from "../svg";

function Card({ List }) {
  const groupBy = useSelector((state) => state.getDisplayData.groupBy);

  const ByPriority = useMemo(
    () => ({
      0: <NoPriority />,
      1: <LowPriority />,
      2: <MediumPriority />,
      3: <HighPriority />,
      4: <UrgentPriority />,
    }),
    []
  );

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

  return (
    <>
      {List?.map((item) => (
        <div className="Card border-shadow" key={item.id}>
          <div className="top">
            <p>{item.id}</p>
            {groupBy !== "Users" && (
              <div className="pic">
                <p>{item.userInitials}</p>
              </div>
            )}
          </div>
          <div className="title">
            {groupBy === "Users" && (
              <span className="status">{ByStatus[item.status]}</span>
            )}
            <p>{item.title}</p>
          </div>
          <div className="bottom">
            <div className="left">
              {groupBy !== "Priority"
                ? ByPriority[item.priority]
                : ByStatus[item.status]}
            </div>
            <div className="tags">
              <div className="box border-shadow">
                <span></span>
                <p>Feature Request</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(Card);
