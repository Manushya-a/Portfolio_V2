const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
  welcome: `Welcome to my portfolio terminal! 👋<br>Type <span class="cmd">help</span> to see what you can do.`,
  help: `🆘 <b>Help & Commands</b><br><br>Welcome to your interactive portfolio terminal! Here you can explore my background, skills, projects, and more—just like a real command line.<br><br>Type any of the following commands to learn more:<br><br><ul style='margin:0.5em 0 0 1.2em;'>
<li><b>about</b> – Who I am and what I do</li>
<li><b>projects</b> – My featured projects and contributions</li>
<li><b>skills</b> – Languages, security concepts, and tools I use</li>
<li><b>education</b> – My academic background</li>
<li><b>certifications</b> – Certifications I have earned</li>
<li><b>leadership</b> – Leadership and club roles</li>
<li><b>contact</b> – How to reach me</li>
<li><b>sudo</b> – Try it for fun</li>
<li><b>clear</b> – Clear the terminal</li>
<li><b>welcome</b> – Show the welcome message again</li>
</ul><br>Use the navigation bar above to quickly fill the terminal with a command, or type it yourself and press Enter!`,
  about: `👋 <b>About Me</b><br><br>I'm Manav Acharya, a passionate student with a keen interest in <b>cyber security</b>.<br>I love exploring how things work under the hood, breaking and securing systems, and I'm always eager to learn more about the world of digital defense.`,
  projects: `💻 <b>Projects</b><br><br><ul style='margin-top:0.5em;'>
<li><a href="https://github.com/Manushya-a/Smart_Remote_Keylogger" target="_blank">Smart Remote Keylogger</a> – Python script simulating a keylogger for educational purposes, using websockets and pynput. <br><span style='font-size:0.95em;color:#aaa;'>(For research/education only!)</span></li>
<li><a href="https://github.com/Manushya-a/Lightening_Data_Exfilteration" target="_blank">Lightning Data Exfilteration</a> – Real-time lightning strike data collection and exfiltration via WebSocket, with multiple output modes (console, Excel, Google Sheets).</li>
<li><a href="https://github.com/OWASP/Nettacker/pull/1029" target="_blank">Custom Module for OWASP Nettacker</a> – Developed a new module for the automated penetration testing tool, enhancing vulnerability detection and reporting.</li>
</ul>`,
  skills: `🛡️ <b>Skills</b><br><br><b>Languages:</b> C++, Python, JavaScript<br><b>Security Concepts:</b> Network Security, Web Application Security<br><b>Tools:</b> N-map, Burp Suite, Wireshark`,
  education: `🎓 <b>Education</b><br><br>VIT Bhopal University: CGPA 8.61`,
  certifications: `📜 <b>Certifications</b><br><br><ul style='margin-top:0.5em;'><li>Google Cybersecurity Professional Certificate V2</li><li>The Bits and Bytes of Computer Networking</li></ul>`,
  leadership: `🌟 <b>Leadership</b><br><br><ul style='margin-top:0.5em;'>
<li><b>Director of Student Welfare Core Team</b><ul style='margin:0.3em 0 0.7em 1.2em;'>
<li style='list-style-type:none;'>&mdash; Served as Master of Ceremonies (MC) for the college’s annual fests, hosting events with 6000+ attendees.</li>
<li style='list-style-type:none;'>&mdash; Organized 30+ events under the Student Welfare Office within six months.</li>
</ul></li>
<li><b>Music Club Core Member</b><ul style='margin:0.3em 0 0.7em 1.2em;'>
<li style='list-style-type:none;'>&mdash; Managed the annual fest's stage, involving over 300+ musicians, and audience of approximately 12000+ students.</li>
<li style='list-style-type:none;'>&mdash; Hosted 20+ performances in college events.</li>
</ul></li>
</ul>`,
  contact: `✉️ <b>Contact</b><br><br>Email: <a href="mailto:manav_2004@outlook.com" target="_blank">manav_2004@outlook.com</a><br>LinkedIn: <a href="https://www.linkedin.com/in/manav-acharya-a76a14251/" target="_blank">linkedin.com/in/manav-acharya-a76a14251</a><br>GitHub: <a href="https://github.com/Manushya-a" target="_blank">github.com/Manushya-a</a>`,
  sudo: `Permission denied: You are not in the sudoers file. This incident will be reported.`,
  clear: '',
  'samaa': `<pre style="color:#ff69b4;font-size:1.1em;line-height:1.1;">
   *****     *****
  *******   *******
 ********* *********
 *******************
  *****************
   ***************
    *************
     ***********
      *********
       *******
        *****
         ***
          *
</pre>`,
};

let history = [];
let historyIndex = 0;

function printOutput(html, animate = false) {
  if (html) {
    const div = document.createElement('div');
    if (animate) {
      // Hide the user input cursor while animating
      if (terminalInput) terminalInput.style.caretColor = 'transparent';
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
          div.innerHTML = html.slice(0, i) + typoChar + '<span class="typing-cursor">|</span>';
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          isCorrecting = true;
          typoAt = i;
          typoCount++;
          setTimeout(typeChar, 180); // Pause on typo
        } else if (isCorrecting) {
          // Simulate backspace (remove typo)
          div.innerHTML = html.slice(0, typoAt) + '<span class="typing-cursor">|</span>';
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          isCorrecting = false;
          setTimeout(typeChar, 120); // Short pause after correction
        } else if (i <= html.length) {
          div.innerHTML = html.slice(0, i) + '<span class="typing-cursor">|</span>';
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          i++;
          setTimeout(typeChar, 25);
        } else {
          // Remove the cursor when done
          div.innerHTML = html;
          // Restore the user input cursor
          if (terminalInput) terminalInput.style.caretColor = '#1aff80';
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
  printOutput(`<span class="terminal-prompt">Manushya_a@portfolio:~$</span> <span class="typed-cmd">${cmd}</span>`);
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

// Add click event to nav links to set terminal input value
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const cmd = link.textContent.trim().toLowerCase();
    terminalInput.value = cmd;
    terminalInput.focus();
  });
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

// Custom cursor functionality
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-dot-outline');

if (cursorDot && cursorOutline) {
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update dot position immediately
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  // Animate outline with delay
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.3;
    outlineY += (mouseY - outlineY) * 0.3;
    
    cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
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