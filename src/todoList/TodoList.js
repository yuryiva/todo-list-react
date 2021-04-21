import React from "react";
import TodoItem from "../todoItem/TodoItem";
import "./TodoList.scss";

const TodoList = ({
  todos,
  handleAddTodo,
  newTodo,
  toggleCheckBox,
  removeTodo,
  setAllTodos,
  copyOfTodos,
  showImportant,
  copyOfImportantTodos,
  showImportantOnly,
}) => {
  return (
    <>
      <form onSubmit={handleAddTodo}>
        <h1>TODO LIST</h1>
        <section>
          <input type="text" ref={newTodo} placeholder="Type here..." />
          <button>ADD TODO</button>
        </section>
      </form>
      <div className="toggle-container">
        <label className="toggle-control">
          <h3>SHOW IMPORTANT ONLY</h3>
          <input type="checkbox" onChange={() => showImportant()} />
          <span className="control"></span>
        </label>
      </div>

      <div className="list">
        {showImportantOnly === true && copyOfImportantTodos.length > 0
          ? copyOfImportantTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleCheckBox={toggleCheckBox}
                removeTodo={removeTodo}
                setAllTodos={setAllTodos}
                copyOfTodos={copyOfTodos}
              />
            ))
          : todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleCheckBox={toggleCheckBox}
                removeTodo={removeTodo}
                setAllTodos={setAllTodos}
                copyOfTodos={copyOfTodos}
              />
            ))}
      </div>
    </>
  );
};

export default TodoList;
