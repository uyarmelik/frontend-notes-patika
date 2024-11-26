function List({ todo, addTodo }) {
  const handleCheckboxChange = (index) => {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    addTodo(newTodo);
  };

  const handleTextChange = (e, index) => {
    const newText = e.target.value;
    const newTodo = [...todo];
    newTodo[index].text = newText;
    addTodo(newTodo);
  };

  const handleDelete = (index) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    addTodo(
      newTodo.map((item, i) => ({
        ...item,
        completed: item.completed,
        text: item.text,
      }))
    );
  };

  const visibleTodo = todo.filter((todoItem) => !todoItem.hidden);

  return (
    <div>
      <ul id="list-container">
        {visibleTodo.map((todoItem, i) => (
          <li className="todo-item" key={i}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="hidden-checkbox"
                onChange={() => handleCheckboxChange(i)}
                checked={todoItem.completed}
              />
              <svg className="displayed-checkbox" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </label>
            <input
              className="todo-item-text"
              type="text"
              value={todoItem.text}
              onChange={(e) => handleTextChange(e, i)}
              style={{
                textDecoration: todoItem.completed ? "line-through" : "none",
              }}
            />
            <button id="delete-button" onClick={() => handleDelete(i)}>
              <svg id="delete-icon" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
