const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
  welcome: `Welcome to my portfolio terminal! 👋<br>Type <span class="cmd">help</span> to see what you can do.`,
  help: `Available commands: <span class="cmd">about</span>, <span class="cmd">projects</span>, <span class="cmd">skills</span>, <span class="cmd">education</span>, <span class="cmd">certifications</span>, <span class="cmd">leadership</span>, <span class="cmd">contact</span>, <span class="cmd">sudo</span>, <span class="cmd">clear</span>, <span class="cmd">welcome</span>`,
  about: `Hi! I'm John Doe, a passionate Software Engineer who loves building cool stuff!`,
  projects: `<ul><li><b>Portfolio Website</b> - A personal site with a terminal UI (2024)</li><li><b>Weather App</b> - Real-time weather with JS &amp; APIs (2023)</li><li><b>Task Manager</b> - Productivity tool for teams (2022)</li></ul>`,
  skills: `<b>Languages:</b> JavaScript, Python, C++<br><b>Frameworks:</b> React, Node.js, Express<br><b>Tools:</b> Git, Docker, AWS`,
  education: `<b>B.Sc. Computer Science</b> - University of Example (2018-2022)<br><b>High School</b> - Example High (2014-2018)`,
  certifications: `<ul><li>Microsoft Certified: Azure AI Fundamentals</li><li>Data Analyst Associate Certificate - DataCamp</li><li>SQL Associate Certificate - DataCamp</li><li>Microsoft Global Hackathon Volunteer</li></ul>`,
  leadership: `<ul><li>Team Lead - Hackathon 2023</li><li>Mentor - Coding Bootcamp 2022</li><li>Club President - University Coding Club</li></ul>`,
  contact: `Email: johndoe@email.com<br>LinkedIn: linkedin.com/in/johndoe`,
  sudo: `Permission denied: You are not in the sudoers file. This incident will be reported.`,
  clear: '',
};

let history = [];
let historyIndex = 0;

function printOutput(html, animate = false) {
  if (html) {
    const div = document.createElement('div');
    if (animate) {
      let i = 0;
      let typoCount = 0;
      let isCorrecting = false;
      let typoAt = -1;
      let typoChar = '';
      terminalOutput.appendChild(div); // Append once
      function typeChar() {
        // Only allow a few typos per line
        const allowTypo = typoCount < 2 && Math.random() < 0.08 && i > 2 && i < html.length - 2;
        if (!isCorrecting && allowTypo) {
          // Insert a random wrong character
          typoChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
          div.innerHTML = html.slice(0, i) + typoChar;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          isCorrecting = true;
          typoAt = i;
          typoCount++;
          setTimeout(typeChar, 180); // Pause on typo
        } else if (isCorrecting) {
          // Simulate backspace (remove typo)
          div.innerHTML = html.slice(0, typoAt);
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          isCorrecting = false;
          setTimeout(typeChar, 120); // Short pause after correction
        } else if (i <= html.length) {
          div.innerHTML = html.slice(0, i);
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          i++;
          setTimeout(typeChar, 25);
        } else {
          // Add extra space after animated output
          const spacer = document.createElement('div');
          spacer.style.height = '0.7em';
          terminalOutput.appendChild(spacer);
        }
      }
      typeChar();
    } else {
      div.innerHTML = html;
      terminalOutput.appendChild(div);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }
}

function handleCommand(cmd) {
  const command = cmd.trim().toLowerCase();
  printOutput(`<span class="terminal-prompt">Manushya.a@portfolio:~$</span> <span class="typed-cmd">${cmd}</span>`);
  if (commands[command] !== undefined) {
    if (command === 'clear') {
      terminalOutput.innerHTML = '';
      terminalOutput.scrollTop = 0;
    } else {
      printOutput(commands[command], true);
    }
  } else if (command) {
    printOutput(`bash: ${command}: command not found`, true);
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

// Apply retro block cursor to terminal input
if (terminalInput) {
  terminalInput.classList.add('custom-cursor');
  terminalInput.addEventListener('focus', () => terminalInput.classList.add('custom-cursor'));
  terminalInput.addEventListener('blur', () => terminalInput.classList.remove('custom-cursor'));
}

// Initial welcome message
handleCommand('welcome');

// Footer IST time updater
function updateFooterTime() {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
  const h = String(ist.getHours()).padStart(2, '0');
  const m = String(ist.getMinutes()).padStart(2, '0');
  const s = String(ist.getSeconds()).padStart(2, '0');
  const timeStr = `${h}:${m}:${s}`;
  const footerTime = document.getElementById('footer-time');
  if (footerTime) footerTime.textContent = timeStr;
}
setInterval(updateFooterTime, 1000);
updateFooterTime(); 