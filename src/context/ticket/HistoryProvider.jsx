import { useState } from "react";
import { historyContext as HistoryContext } from "./historyContext";

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addHistory = (order) => {
    setHistory((prev) => [...prev, order]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
