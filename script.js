const outputDiv = document.getElementById("output");
const canvas = document.getElementById("visualization");
console.log = (...args) =>
  (outputDiv.innerHTML += "#> " + args.join(" ") + "<br>");
const error = (err) =>
  console.log('<span style="color:red;">' + err + "</span>");
require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" },
});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`,
    ],
    { type: "text/javascript" }
  )
);

require(["vs/editor/editor.main"], function () {
  let editor = monaco.editor.create(document.getElementById("container"), {
    value: `
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
 * You can also import js packages below! Just enter package name and click
 * "Import"
 */
    `,
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true,
  });
  setTimeout(() => {
    editor.getAction("editor.action.formatDocument").run();
  }, 1000);
  // Run code button
  document.getElementById("run-btn").addEventListener("click", () => {
    try {
      const code = editor.getValue();
      const func = new Function(code);
      func();
    } catch (err) {
      error(err);
    }
  });
});

// Add package button
document.getElementById("add-package-btn").addEventListener("click", () => {
  const pkg = document.getElementById("package-input").value;
  if (pkg) {
    const script = document.createElement("script");
    script.src = `https://cdn.jsdelivr.net/npm/${pkg}`;
    script.onload = () => console.log(`Loaded package: ${pkg}`);
    script.onerror = () => error(`Failed to load package: ${pkg}`);
    document.head.appendChild(script);
  }
});
