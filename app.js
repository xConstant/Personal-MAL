const logBtn = document.getElementById("logBtn");
const logList = document.getElementById("logList");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const countEl = document.getElementById("count");

const setGoalBtn = document.getElementById("setGoalBtn");
const progressBar = document.getElementById("progressBar");
const goalText = document.getElementById("goalText");

let count = 0;
let selectedVariant = "Standard";

let logs = JSON.parse(localStorage.getItem("logs")) || [];
let goal = JSON.parse(localStorage.getItem("goal")) || null;

// Variant selection
document.querySelectorAll(".variant").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".variant").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedVariant = btn.textContent;
  });
});

// Counter
plusBtn.onclick = () => {
  count++;
  countEl.textContent = count;
};

minusBtn.onclick = () => {
  if (count > 0) count--;
  countEl.textContent = count;
};

// Add log
logBtn.onclick = () => {
  if (count === 0) return;

  logs.push({
    date: new Date().toISOString().split("T")[0],
    variant: selectedVariant,
    reps: count
  });

  localStorage.setItem("logs", JSON.stringify(logs));
  count = 0;
  countEl.textContent = 0;

  renderLogs();
  updateGoal();
};

// Set goal
setGoalBtn.onclick = () => {
  const total = Number(document.getElementById("goalTotal").value);
  const days = Number(document.getElementById("goalDays").value);
  if (!total || !days) return;

  goal = {
    total,
    days,
    start: new Date().toISOString().split("T")[0]
  };

  localStorage.setItem("goal", JSON.stringify(goal));
  updateGoal();
};

// Render logs
function renderLogs() {
  logList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  logs.filter(l => l.date === today).forEach(l => {
    const li = document.createElement("li");
    li.textContent = `${l.variant} — ${l.reps} reps`;
    logList.appendChild(li);
  });
}

// Goal progress
function updateGoal() {
  if (!goal) return;

  const completed = logs.reduce((sum, l) => sum + l.reps, 0);
  const percent = Math.min((completed / goal.total) * 100, 100);

  progressBar.style.width = percent + "%";
  goalText.textContent = `${completed} / ${goal.total} push-ups completed`;
}

// Init
renderLogs();
updateGoal();
