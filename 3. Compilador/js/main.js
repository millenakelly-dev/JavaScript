document.addEventListener('DOMContentLoaded', function () {
    const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: "text/x-csrc",
        theme: "material",
        lineNumbers: true,
        indentUnit: 4,
        smartIndent: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        lineWrapping: true
    });

    editor.setValue("#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}");

    async function compileCode() {
        const code = editor.getValue();
        const outputElement = document.getElementById("output");
        outputElement.textContent = "🔄 Running...";
        await executeCode(code);
    }

    async function executeCode(code) {
        const outputElement = document.getElementById("output");

        try {
            const submitRes = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": "af3197dc7fmsh351b8b246b79538p1c0e91jsn4b6be0a66c46",
                    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
                },
                body: JSON.stringify({
                    language_id: 50,
                    source_code: code
                })
            });

            const result = await submitRes.json();

            if (result.compile_output) {
                outputElement.textContent = "⚠ Erro de compilação:\n" + result.compile_output;
                return;
            }

            outputElement.textContent = result.stdout || result.stderr || "⚠ Sem saída!";

        } catch (error) {
            outputElement.textContent = "⚠ Error: " + error.message;
        }
    }

    const runButton = document.querySelector(".run-btn");
    runButton.addEventListener('click', compileCode);
});