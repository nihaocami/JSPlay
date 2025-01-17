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
    value: DEFAULT_VALUE,
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
    script.src = `${pkg}`;
    script.onload = () => console.log(`Loaded package: ${pkg}`);
    script.onerror = () => error(`Failed to load package: ${pkg}`);
    document.head.appendChild(script);
  }
});
