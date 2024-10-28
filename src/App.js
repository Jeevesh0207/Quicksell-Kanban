import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { DropMenu, KanbanBoard } from "./components";
import { Display, Down } from "./svg";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayData, fetchData, setfilterData } from "./redux/actions";
import { groupAndSortTickets } from "./services";

function App() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayBoxRef = useRef(null);
  const dropMenuRef = useRef(null);

  const { list, loading, error } = useSelector((state) => state.getDataList);
  const { groupBy, orderBy } = useSelector((state) => state.getDisplayData);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (
      displayBoxRef.current &&
      !displayBoxRef.current.contains(event.target) &&
      dropMenuRef.current &&
      !dropMenuRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("filter-option");
    if (data) {
      dispatch(setDisplayData(JSON.parse(data)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (list && !loading) {
      const data = groupAndSortTickets(
        list.tickets,
        list.users,
        groupBy,
        orderBy
      );
      if (data) {
        dispatch(setfilterData(data));
      }
    }
  }, [groupBy, orderBy, loading, dispatch, list]);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="App">
      <div className="header border-shadow">
        <div
          className="display-box border-shadow"
          ref={displayBoxRef}
          onClick={toggleMenu}
        >
          <Display />
          <p>Display</p>
          <Down />
          {isMenuOpen && <DropMenu ref={dropMenuRef} />}
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}

export default App;
