import React, { useRef, useState } from "react";
import "./TodoItem.scss";
import delIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png";
import saveIcon from "../icons/save.png";

const TodoItem = ({
  todo,
  toggleCheckBox,
  removeTodo,
  setAllTodos,
  copyOfTodos,
}) => {
  const itemInput = useRef();
  const [editIconSource, setEditIconSource] = useState(editIcon);

  const editItem = (id) => {
    const todoToEdit = copyOfTodos.find((element) => element.id === id);
    todoToEdit.name = itemInput.current.value;
    setAllTodos(copyOfTodos);
  };

  const toggleEditIcon = () => {
    itemInput.current.disabled = !itemInput.current.disabled;
    if (itemInput.current.disabled === false) {
      setEditIconSource(saveIcon);
    } else {
      setEditIconSource(editIcon);
    }
  };

  return (
    <div className="todoItem">
      <div id="checkbox-container">
        <p>Mark as important</p>
        <input
          type="checkbox"
          checked={todo.important}
          onChange={() => toggleCheckBox(todo.id)}
          className="checkBox"
        />
      </div>
      <div className="textArea-container">
        <textarea
          value={todo.name}
          onChange={() => editItem(todo.id)}
          placeholder="Type here..."
          disabled={true}
          ref={itemInput}
        />
      </div>
      <img
        src={editIconSource}
        onClick={toggleEditIcon}
        className="editOrSave"
        alt="edit-or-save-icon"
      />
      <img src={delIcon} alt="delete" onClick={() => removeTodo(todo.id)} />
    </div>
  );
};

export default TodoItem;
