import { useState } from "react";
import Add from "./todos/add.js";
import List from "./todos/list.js";
import Filter from "./todos/filter.js";
import "./style.css";

function Todos() {
  const [todo, setTodo] = useState([
    {
      text: "Learn JavaScript",
      completed: false,
      hidden: false,
    },
    {
      text: "Learn React",
      completed: false,
      hidden: false,
    },
    {
      text: "Have a life!",
      completed: false,
      hidden: false,
    },
  ]);
  return (
    <div>
      <div id="todos-header">todos</div>
      <div id="todos-container">
        <Add todo={todo} addTodo={setTodo} />
        <List todo={todo} addTodo={setTodo} />
        <Filter todo={todo} addTodo={setTodo} />
      </div>
    </div>
  );
}

export default Todos;
