/* ── STATE ── */
let passwordVisible = false;

const passwordInput = document.getElementById("password");
const passwordLength = document.getElementById("passwordLength");
const saveButton = document.getElementById("saveButton");
const generateBtn = document.getElementById("generateBtn");
const eyeIcon = document.getElementById("eyeIcon");
const copyBtn = document.getElementById("copyBtn");
const copyIcon = document.getElementById("copyIcon");
const strengthWrap = document.getElementById("strengthWrap");
const strengthLabel = document.getElementById("strengthLabel");
const bars = [1, 2, 3, 4].map((i) => document.getElementById("bar" + i));

/* ── GENERATOR ── */
function generatePassword(length) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeric = "0123456789";
  const symbol = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  const pool = lower + upper + numeric + symbol;
  let result = "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    result += pool[arr[i] % pool.length];
  }
  return result;
}

/* ── STRENGTH ── */
function calcStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(4, score);
}

function updateStrength(pwd) {
  if (!pwd) {
    strengthWrap.style.display = "none";
    return;
  }
  strengthWrap.style.display = "block";
  const score = calcStrength(pwd);
  const levels = [
    "",
    "active-weak",
    "active-fair",
    "active-good",
    "active-strong",
  ];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  bars.forEach((bar, idx) => {
    bar.className = "strength-bar";
    if (idx < score) bar.classList.add(levels[score]);
  });
  strengthLabel.textContent = labels[score];
  strengthLabel.style.color = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][
    score
  ];
}

/* ── GET PASSWORD ── */
function getPassword() {
  const len = parseInt(passwordLength.value);
  if (!passwordLength.value || isNaN(len) || len < 4) {
    showToast("Enter a length of at least 4", "warn");
    return;
  }
  if (len > 128) {
    showToast("Maximum length is 128 characters", "warn");
    return;
  }

  // Brief loading state
  generateBtn.classList.add("generating");
  setTimeout(() => {
    const pwd = generatePassword(len);
    passwordInput.value = pwd;

    // Reset visibility to hidden after new gen
    passwordInput.type = "password";
    passwordVisible = false;
    eyeIcon.className = "bi bi-eye";

    updateStrength(pwd);
    generateBtn.classList.remove("generating");
    showToast("Password generated successfully!");
  }, 320);
}

/* ── TOGGLE VISIBILITY ── */
function toggleVisibility() {
  if (!passwordInput.value) {
    showToast("Generate a password first", "warn");
    return;
  }
  passwordVisible = !passwordVisible;
  passwordInput.type = passwordVisible ? "text" : "password";
  eyeIcon.className = passwordVisible ? "bi bi-eye-slash" : "bi bi-eye";
}

/* ── COPY ── */
function copyPassword() {
  if (!passwordInput.value) {
    showToast("Nothing to copy yet", "warn");
    return;
  }
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    copyBtn.classList.add("copied");
    copyIcon.className = "bi bi-check-lg";
    showToast("Copied to clipboard!");
    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyIcon.className = "bi bi-copy";
    }, 2000);
  });
}

/* ── SAVE PASSWORD ── */
function savePassword() {
  if (!passwordInput.value) {
    showToast("Generate a password first", "warn");
    return;
  }
  const content = `PassForge — Generated Password\n${"─".repeat(36)}\nPassword : ${passwordInput.value}\nLength   : ${passwordInput.value.length}\nGenerated: ${new Date().toLocaleString()}\n${"─".repeat(36)}\nKindly store this in a password manager.`;
  saveButton.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content),
  );
  saveButton.setAttribute("download", "MyPassword_PassForge.txt");
  showToast("Password saved as .txt file!");
}

/* ── TOAST ── */
function showToast(msg, type) {
  const toast = document.getElementById("toast");
  const icon = toast.querySelector("i");
  document.getElementById("toastMsg").textContent = msg;
  toast.className = "toast-bar" + (type === "warn" ? " warn" : "");
  icon.className =
    type === "warn"
      ? "bi bi-exclamation-circle-fill"
      : "bi bi-check-circle-fill";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ── ENTER KEY ── */
passwordLength.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getPassword();
});
