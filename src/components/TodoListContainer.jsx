import React, { useContext, useEffect, useState } from "react";
import NewTodo from "./NewTodo";
import Todos from "./Todos";
import { TodoProvider } from "./TodoContext";

function TodoListContainer() {

      
  return (
    <div id="TodoListPanel" style={{ position: "relative" }}>
      <div id="TodoListContainer">
        <TodoProvider>
          
          <NewTodo />
          
          <Todos />

        </TodoProvider>
      </div>
    </div>
  );
}

export default TodoListContainer;
