import React, { useContext } from "react";
import Todo from "./Todo";
import { TodoContext } from "./TodoContext"; // Import TodoContext, not TodoProvider

function Todos() {
  const { TodoList, updateTodoStatus, delTodo } = useContext(TodoContext);

  return (
    <>
    
      <div className="TodosContainer">
      {(!TodoList.length)?("Nothing here yet! Time to start organizing your day. "):
        TodoList.map((todo, index) => {
          if (todo.status == "pending")
            return (
              <Todo
                key={index}
                index={index}
                todo={todo}
                updateTodoStatus={updateTodoStatus}
                delTodo={delTodo}
              />
            );
        })}
      </div>
      <div className="TodosContainer">
        {(!TodoList.length)?("Clear skies ahead—no tasks in sight!"):
        TodoList.map((todo, index) => {
          if (todo.status == "completed")
            return (
              <Todo
                key={index}
                index={index}
                todo={todo}
                updateTodoStatus={updateTodoStatus}
                delTodo={delTodo}
              />
            );
        })}
      </div>
    </>
  );
}

export default Todos;
