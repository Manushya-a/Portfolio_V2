const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
  help: `Available commands: <span class="cmd">about</span>, <span class="cmd">projects</span>, <span class="cmd">skills</span>, <span class="cmd">contact</span>, <span class="cmd">clear</span>`,
  about: `Hi! I'm John Doe, a passionate Software Engineer who loves building cool stuff!`,
  projects: `<ul><li><b>Portfolio Website</b> - A personal site with a terminal UI (2024)</li><li><b>Weather App</b> - Real-time weather with JS &amp; APIs (2023)</li><li><b>Task Manager</b> - Productivity tool for teams (2022)</li></ul>`,
  skills: `<b>Languages:</b> JavaScript, Python, C++<br><b>Frameworks:</b> React, Node.js, Express<br><b>Tools:</b> Git, Docker, AWS`,
  contact: `Email: johndoe@email.com<br>LinkedIn: linkedin.com/in/johndoe`,
  clear: '',
};

let history = [];
let historyIndex = 0;

function printOutput(html) {
  if (html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
}

function handleCommand(cmd) {
  const command = cmd.trim().toLowerCase();
  printOutput(`<span class="terminal-prompt">user@portfolio:~$</span> <span class="typed-cmd">${cmd}</span>`);
  if (commands[command] !== undefined) {
    if (command === 'clear') {
      terminalOutput.innerHTML = '';
    } else {
      printOutput(commands[command]);
    }
  } else if (command) {
    printOutput(`bash: ${command}: command not found`);
  }
}

terminalInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const value = terminalInput.value;
    if (value) {
      history.push(value);
      historyIndex = history.length;
      handleCommand(value);
      terminalInput.value = '';
    }
  } else if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = history[historyIndex];
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      terminalInput.value = history[historyIndex];
    } else {
      terminalInput.value = '';
      historyIndex = history.length;
    }
    e.preventDefault();
  }
});

// Autofocus on input when clicking anywhere in terminal
terminalOutput.parentElement.addEventListener('click', () => {
  terminalInput.focus();
});

// Initial welcome message
printOutput('Type <span class="cmd">help</span> to see available commands.'); 