import { useState, useEffect } from "react";

function Filter({ todo, addTodo }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedButton, setSelectedButton] = useState("All");
  const [canClearCompleted, setCanClearCompleted] = useState(false);


  useEffect(() => {
    const count = todo.filter((item) => !item.completed).length;
    setVisibleCount(count);

    const hasHiddenItem = todo.some((item) => item.completed);
    setCanClearCompleted(hasHiddenItem);
  }, [todo]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === "Active") {
      const updatedTodo = todo.map((item) =>
        item.completed ? { ...item, hidden: true } : { ...item, hidden: false }
      );
      addTodo(updatedTodo);
    } else if (buttonName === "Completed") {
      const updatedTodo = todo.map((item) =>
        item.completed ? { ...item, hidden: false } : { ...item, hidden: true }
      );
      addTodo(updatedTodo);
    } else if (buttonName === "All") {
      const updatedTodo = todo.map((item) => ({ ...item, hidden: false }));
      addTodo(updatedTodo);
    }
  };

  const handleClearCompleted = () => {
    const filteredTodo = todo.filter((item) => !item.completed);
    addTodo(filteredTodo);
  };

  return (
    <div>
      <div id="filter-container">
        <span id="items-left">{visibleCount} items left</span>
        <button
          className={`filter-button ${
            canClearCompleted ? "clear-button" : "unclear-button"
          }`}
          onClick={canClearCompleted ? handleClearCompleted : null}
          disabled={!canClearCompleted}
        >
          Clear completed
        </button>
        <div>
          <button
            className={`filter-button ${
              selectedButton === "All" ? "checked-button" : "unchecked-button"
            }`}
            onClick={() => handleButtonClick("All")}
            style={{ marginRight: "3px" }}
          >
            All
          </button>
          <button
            className={`filter-button ${
              selectedButton === "Active"
                ? "checked-button"
                : "unchecked-button"
            }`}
            onClick={() => handleButtonClick("Active")}
            style={{ marginRight: "3px" }}
          >
            Active
          </button>
          <button
            className={`filter-button ${
              selectedButton === "Completed"
                ? "checked-button"
                : "unchecked-button"
            }`}
            onClick={() => handleButtonClick("Completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
