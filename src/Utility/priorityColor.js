// priorityColor.js

export const getPriorityColor = (priority) => {
    let color = "";
    switch (priority) {
      case "high":
        color = "#FF0000"; // Red
        break;
      case "medium":
        color = "#FFA500"; // Orange
        break;
      case "low":
        color = "#008000"; // Green
        break;
      default:
        color = "grey"; // Default color
        break;
    }
    return color;
  };
  