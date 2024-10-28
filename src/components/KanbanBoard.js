import React, { useMemo } from "react";
import GroupColumn from "./GroupColumn";
import { useSelector } from "react-redux";

function KanbanBoard() {
  const filterData = useSelector((state) => state.getFilterData.filterData);

  const filteredEntries = useMemo(
    () => Object.entries(filterData),
    [filterData]
  );

  return (
    <div className="KanbanBoard">
      {filteredEntries.map(([key, value]) => (
        <GroupColumn Name={key} List={value} key={key} />
      ))}
    </div>
  );
}

export default React.memo(KanbanBoard);
