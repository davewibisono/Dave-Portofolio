const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Define a 1px width
ctx.lineWidth = 0.6;

// Define a new path:
ctx.beginPath();

// Define a triangle
ctx.moveTo(250, 10);
ctx.lineTo(80, 10);
ctx.bezierCurveTo(50, 10, 40, 10, 40, 40);
ctx.lineTo(40, 100);

// Draw it
ctx.strokeStyle = "white";
ctx.stroke();
