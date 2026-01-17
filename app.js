const logBtn = document.getElementById("logBtn");
const logList = document.getElementById("logList");

const setGoalBtn = document.getElementById("setGoalBtn");
const progressBar = document.getElementById("progressBar");
const goalText = document.getElementById("goalText");

// Load data
let logs = JSON.parse(localStorage.getItem("logs")) || [];
let goal = JSON.parse(localStorage.getItem("goal")) || null;

// Save helpers
function saveLogs() {
  localStorage.setItem("logs", JSON.stringify(logs));
}

function saveGoal() {
  localStorage.setItem("goal", JSON.stringify(goal));
}

// Add push-up log
logBtn.addEventListener("click", () => {
  const variant = document.getElementById("variant").value;
  const reps = Number(document.getElementById("reps").value);
  if (!reps) return;

  logs.push({
    date: new Date().toISOString().split("T")[0],
    variant,
    reps
  });

  saveLogs();
  renderLogs();
  updateGoalProgress();
});

// Set goal
setGoalBtn.addEventListener("click", () => {
  const total = Number(document.getElementById("goalTotal").value);
  const days = Number(document.getElementById("goalDays").value);

  if (!total || !days) return;

  goal = {
    total,
    days,
    startDate: new Date().toISOString().split("T")[0]
  };

  saveGoal();
  updateGoalProgress();
});

// Render today logs
function renderLogs() {
  logList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  logs
    .filter(log => log.date === today)
    .forEach(log => {
      const li = document.createElement("li");
      li.textContent = `${log.variant} – ${log.reps}`;
      logList.appendChild(li);
    });
}

// Goal progress
function updateGoalProgress() {
  if (!goal) return;

  const completed = logs.reduce((sum, log) => sum + log.reps, 0);
  const percent = Math.min((completed / goal.total) * 100, 100);

  progressBar.style.width = percent + "%";
  goalText.textContent = `${completed} / ${goal.total} push-ups completed`;
}

// Init
renderLogs();
updateGoalProgress();
