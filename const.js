const DEFAULT_VALUE = `
//You can log
console.log("Hello there!")

// And you can draw! You can access to "canvas" by default.
const ctx = canvas.getContext('2d');
// Set canvas size to fill the screen or parent dynamically
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Draw a triangle
ctx.beginPath();
ctx.moveTo(centerX, centerY - 100); // Top point
ctx.lineTo(centerX - 100, centerY + 100); // Bottom-left point
ctx.lineTo(centerX + 100, centerY + 100); // Bottom-right point
ctx.closePath();
ctx.fillStyle = 'lightblue';
ctx.fill();
ctx.strokeStyle = 'blue';
ctx.stroke();

// Draw an emoji inside the triangle
ctx.font = '20px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('😊', centerX, centerY);

/**
 * You can also import js packages! Just enter package URL and click
 * "Import"
 * 
 * Note that not all packages will be easily supported. A good example to use
 * is 'lodash'.
 */
    `;
