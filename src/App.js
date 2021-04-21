import React, { useRef, useState, useEffect } from "react";
import TodoList from "./todoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";

const LOCAL_STORAGE_KEY = "TODO-APP-DATA";

const App = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [importantTodos, setImportantTodos] = useState([]);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const newTodo = useRef();

  const copyOfTodos = [...allTodos];
  const copyOfImportantTodos = [...importantTodos];

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    setAllTodos(dataFromLocalStorage);
    setImportantTodos(
      dataFromLocalStorage.filter((element) => element.important === true)
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allTodos));
  }, [allTodos]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newItem = newTodo.current.value;

    if (newItem === "") return;
    const updatedTodos = [
      ...copyOfTodos,
      { id: uuidv4(), name: newItem, important: false },
    ];
    setAllTodos(updatedTodos);
    newTodo.current.value = null;
  };

  const toggleCheckBox = (id) => {
    const itemToToggle = copyOfTodos.find((element) => element.id === id);
    itemToToggle.important = !itemToToggle.important;
    setAllTodos(copyOfTodos);
    const important = copyOfTodos.filter(
      (element) => element.important === true
    );
    setImportantTodos(important);
  };

  const removeTodo = (id) => {
    const todoToRemoveIndex = copyOfTodos.findIndex(
      (element) => element.id === id
    );
    copyOfTodos.splice(todoToRemoveIndex, 1);
    copyOfImportantTodos.splice(todoToRemoveIndex, 1);
    setAllTodos(copyOfTodos);
    setImportantTodos(copyOfImportantTodos);
  };

  const showImportant = () => {
    setShowImportantOnly(!showImportantOnly);
  };

  return (
    <>
      <TodoList
        setAllTodos={setAllTodos}
        todos={allTodos}
        handleAddTodo={handleAddTodo}
        newTodo={newTodo}
        toggleCheckBox={toggleCheckBox}
        removeTodo={removeTodo}
        copyOfTodos={copyOfTodos}
        showImportant={showImportant}
        copyOfImportantTodos={copyOfImportantTodos}
        showImportantOnly={showImportantOnly}
      />
    </>
  );
};

export default App;
