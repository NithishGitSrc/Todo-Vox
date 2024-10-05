import React, { useContext, useState, useRef } from "react";
import { TodoContext } from "./TodoContext"; // Import TodoContext, not TodoProvider
import mic from "../icons/mic.png";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


function NewTodo() {
  const { addTodo, deleteAllTodo } = useContext(TodoContext); // Use TodoContext, not TodoProvider
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const textareaRef = useRef(null);


   // Voice-to-text handler
   const handleVoiceInput = () => {
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewTodo((prevTodo) => prevTodo + " " + transcript); // Append voice input to the existing todo text
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todoObj = {
        task: newTodo,
        priority: priority,
        startTime: startTime,
        endTime: endTime,
        status: "pending",
      };
      addTodo(todoObj);
      setNewTodo("");
      setPriority("medium");
      setStartTime("");
      setEndTime("");
      textareaRef.current.focus();
    }
  };

  const handleEndTimeChange = (e) => {
    const selectedEndTime = e.target.value;

    if (startTime && selectedEndTime < startTime) {
      alert("End time cannot be less than start time.");
    } else {
      setEndTime(selectedEndTime);
    }
  };

  return (
    <div id="NewTodo">
      <div>
        <textarea
          ref={textareaRef}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />

        <div>
          <button className="micBtn btn" onClick={handleVoiceInput} >
            <img src={mic} id="VoiceBtn" />
          </button>
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}
      >
        <div id="priorityCont">
          <p>Priority :</p>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="timePicker">
          <p>Start Time :</p>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="timePicker">
          <p>End Time :</p>
          <input
            type="time"
            value={endTime}
            onChange={(e) => handleEndTimeChange(e)}
          />
        </div>

        <div>
         <button
            className="addBtn btn"    
            type="button"
            onClick={handleAddTodo}
          >
            ADD
          </button>

          <button className="clrDelbtn btn">Clear All</button>
          <button
            type="button"
            style={{ backgroundColor: "rebeccapurple" }}
            className="clrDelbtn btn"
            onClick={deleteAllTodo}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTodo;
