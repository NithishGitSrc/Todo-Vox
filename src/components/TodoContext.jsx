import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {


  const [TodoList, setTodosList] = useState(() => {
    
    const savedTodos = localStorage.getItem("TodoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  useEffect(()=>{
    localStorage.setItem("TodoList", JSON.stringify(TodoList));
  },[TodoList])

  const addTodo = (newTodo) => {
    setTodosList((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      console.log(updatedTodos);
      return updatedTodos;
    });
  };

  const delTodo = (index) => {
    const updatedTodos = TodoList.filter((todo, todoIndex) => todoIndex !== index);
    setTodosList(updatedTodos);
  };
  
  const updateTodoStatus = (index) => {
    setTodosList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      if (newTodoList[index].status === "pending") {
        newTodoList[index].status = "completed";
        // console.log(`Task '${newTodoList[index].task}' updated to completed.`);
      } else {
        newTodoList[index].status = "pending";
        // console.log(`Task '${newTodoList[index].task}' updated to pending`);
      }
      return newTodoList;
    });
  };

  const modifyTodo = (index, newTodo )=>{
    setTodosList((prevTodoList)=>{

      const newTodoList = [...prevTodoList];
      newTodoList[index] = newTodo;
      return newTodoList;

    })
  }

  const deleteAllTodo = ()=>{
    setTodosList([])
  }

  return (
    <TodoContext.Provider
      value={{ TodoList, addTodo, modifyTodo, delTodo, updateTodoStatus, deleteAllTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
