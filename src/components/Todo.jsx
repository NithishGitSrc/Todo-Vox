import React, { useContext, useState, useEffect } from "react";
import { getPriorityColor } from "../Utility/priorityColor";
import { TodoContext } from "./TodoContext";

function Todo({ index, todo, updateTodoStatus, delTodo }) {
  const { modifyTodo } = useContext(TodoContext);

  const classname = todo.status === "pending" ? "Todo" : "Todo completed";
  let priority = getPriorityColor(todo.priority);

  // State for editing the task and time
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);
  const [updatedStartTime, setUpdatedStartTime] = useState(todo.startTime);
  const [updatedEndTime, setUpdatedEndTime] = useState(todo.endTime);

  // Ensure task, startTime, and endTime state updates when the `todo` prop changes
  useEffect(() => {
    setUpdatedTask(todo.task);
    setUpdatedStartTime(todo.startTime);
    setUpdatedEndTime(todo.endTime);
  }, [todo]);

  const handleSave = () => {
    const updatedTodo = {
      ...todo,
      task: updatedTask,
      startTime: updatedStartTime,
      endTime: updatedEndTime,
    };
    modifyTodo(index, updatedTodo);
    setIsEditing(false); // Exit editing mode after saving
  };

  const handleDelete = () => {
    // If currently editing, warn the user before deleting
    if (isEditing) {
      const confirmDelete = window.confirm(
        "You have unsaved changes. Do you really want to delete this task?"
      );
      if (!confirmDelete) {
        return; // Exit if the user cancels the deletion
      }
    }

    // Reset the editing state when deleting
    setIsEditing(false);
    delTodo(index); // Proceed to delete the task
  };

  return (
    <div
      className={classname}
      style={{ borderColor: `${priority}` }}
      draggable="true"
      key={index} // Make sure to use a unique key like `todo.id`
    >
      <div className="TodoCheckBox">
        <input
          type="checkbox"
          checked={todo.status !== "pending"}
          onChange={() => {
            updateTodoStatus(index);
          }}
        />
      </div>

      <div>
        <div>
          {isEditing ? (
            <>
              <p
                contentEditable
                suppressContentEditableWarning={true} // Prevents React from showing a warning
                onBlur={(e) => setUpdatedTask(e.target.innerText)} // Update state when user leaves the p element
                style={{
                  display: "inline-block",
                  border: "1px dashed grey",
                  padding: "5px",
                  borderRadius: "3px",
                }}
              >
                {updatedTask}
              </p>
            </>
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer", display: "inline-block" }} // Change cursor to indicate it's clickable
            >
              {todo.status === "completed" ? <del>{todo.task}</del> : todo.task}
            </p>
          )}

          {todo.startTime && (
            <>
              <hr />
              <div className="timeDetails">
                <span style={{ fontSize: "23px" }}>&#9202;</span>
                <div>
                  <input
                    type="time"
                    value={updatedStartTime}
                    onClick={() => setIsEditing(true)}
                    onChange={(e) => setUpdatedStartTime(e.target.value)}
                  />
                </div>

                {todo.endTime && (
                  <div>
                    <input
                      type="time"
                      value={updatedEndTime}
                      onClick={() => setIsEditing(true)}
                      onChange={(e) => setUpdatedEndTime(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {isEditing && (
          <div>
            <button onClick={handleSave} id="Savebtn">
              Save
            </button>
          </div>
          )}
        </div>
      </div>

      <button type="button" onClick={handleDelete}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  );
}

export default Todo;
