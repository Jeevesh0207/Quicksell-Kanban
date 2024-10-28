import React, { useRef, useCallback, forwardRef } from "react";
import { Down } from "../svg";
import menuJson from "../json/display.json";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayData } from "../redux/actions";

const DropMenu = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { groupBy, orderBy } = useSelector((state) => state.getDisplayData);
  const minidropRefs = useRef([]);

  const toggleMiniDrop = useCallback((index) => {
    minidropRefs.current.forEach((ref, i) => {
      if (ref)
        ref.style.display =
          i === index
            ? ref.style.display === "none"
              ? "block"
              : "none"
            : "none";
    });
  }, []);

  const handleSpanClick = useCallback(
    (event, index) => {
      const selectedValue = event.target.textContent;
      const data = {
        groupBy: index === 0 ? selectedValue : groupBy,
        orderBy: index === 1 ? selectedValue : orderBy,
      };
      dispatch(setDisplayData(data));
      localStorage.setItem("filter-option", JSON.stringify(data));
    },
    [dispatch, groupBy, orderBy]
  );

  return (
    <div
      className="dropmenu border-shadow"
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      {menuJson.map((item, index) => (
        <div className="row" key={index}>
          <div className="col">
            <p>{item.name}</p>
          </div>
          <div className="col">
            <div
              className="filter-box border-shadow"
              onClick={() => toggleMiniDrop(index)}
            >
              <p>{index === 0 ? groupBy : orderBy}</p>
              <Down />
              <div
                className="minidrop-menu border-shadow"
                ref={(el) => (minidropRefs.current[index] = el)}
                style={{ display: "none" }}
              >
                {item.list?.map((submenu, subIndex) => (
                  <span
                    key={subIndex}
                    onClick={(e) => handleSpanClick(e, index)}
                  >
                    {submenu}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default DropMenu;
