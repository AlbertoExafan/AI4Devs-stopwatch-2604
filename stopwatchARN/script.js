// ===== UTILS =====
function pad(num, len) {
    return num.toString().padStart(len, "0");
}

// ===== VARIABLES GLOBALES =====
// Para COUNTDOWN
let digits = ["0","0","0","0","0","0","0","0","0"];
let cdInterval;
let cdRemaining = 0; // milisegundos restantes
let cdRunning = false;
let cdEndTime;

// Para STOPWATCH
let swInterval;
let swStartTime;
let swElapsed = 0;   // milisegundos acumulados
let isRunning = false;

// ===== FUNCIONES PARA BLOQUEAR / DESBLOQUEAR BOTONES NUMÉRICOS =====
function disableNumberButtons() {
    const btns = document.querySelectorAll(".keypad button:not(#cd-set):not(.clear)");
    btns.forEach(btn => btn.disabled = true);
}

function enableNumberButtons() {
    const btns = document.querySelectorAll(".keypad button:not(#cd-set):not(.clear)");
    btns.forEach(btn => btn.disabled = false);
}

// ===== PANTALLAS =====
function showCountdown() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("countdown-screen").classList.remove("hidden");
    updateCdDisplayFromDigits();
}

function showStopwatch() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("stopwatch-screen").classList.remove("hidden");
    updateSwDisplay();
}

function goBack() {
    document.getElementById("stopwatch-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

// ===== CUENTA ATRÁS =====

// Mostrar desde array digits
function updateCdDisplayFromDigits() {
    let h = digits[0] + digits[1];
    let m = digits[2] + digits[3];
    let s = digits[4] + digits[5];
    let ms= digits[6] + digits[7] + digits[8];
    document.getElementById("display").innerText =
        `${h}:${m}:${s}:${ms}`;
}

// Presionar número
function pressNum(n) {
    if (cdRunning) return;  // bloquear numéricos si está corriendo
    digits.shift();
    digits.push(n + "");
    updateCdDisplayFromDigits();
}

// Set / Stop / Continue
function toggleCountdown() {
    const btn = document.getElementById("cd-set");

    if (!cdRunning) {
        // Si está en Continue o Set
        let totalMs;

        if (cdRemaining > 0) {
            // continuar desde pausa
            totalMs = cdRemaining;
        } else {
            // lectura inicial desde los dígitos
            let hours = parseInt(digits[0] + digits[1]);
            let mins  = parseInt(digits[2] + digits[3]);
            let secs  = parseInt(digits[4] + digits[5]);
            let millis= parseInt(digits[6] + digits[7] + digits[8]);
            totalMs = ((hours * 3600 + mins * 60 + secs) * 1000) + millis;
        }

        if (totalMs > 0) {
            cdRunning = true;
            btn.innerText = "Stop";

            disableNumberButtons(); // bloquear numéricos

            cdEndTime = Date.now() + totalMs;
            startCdInterval();
        }
    } else {
        // está corriendo → pausar
        pauseCountdown();
        btn.innerText = "Continue";

        enableNumberButtons(); // desbloquear numéricos
    }
}

function startCdInterval() {
    clearInterval(cdInterval);

    cdInterval = setInterval(() => {
        let remaining = cdEndTime - Date.now();

        if (remaining <= 0) {
            clearInterval(cdInterval);
            cdRunning = false;
            cdRemaining = 0;
            document.getElementById("cd-set").innerText = "Set";

            enableNumberButtons(); // desbloquear

            alert("¡Tiempo terminado!");
            clearAll();
            return;
        }

        cdRemaining = remaining;
        updateCdDisplay(remaining);

    }, 30);
}

function updateCdDisplay(remaining) {
    let h = Math.floor(remaining / 3600000);
    let m = Math.floor((remaining % 3600000) / 60000);
    let s = Math.floor((remaining % 60000) / 1000);
    let mil = remaining % 1000;

    document.getElementById("display").innerText =
        `${pad(h,2)}:${pad(m,2)}:${pad(s,2)}:${pad(mil,3)}`;
}

function pauseCountdown() {
    clearInterval(cdInterval);
    cdRunning = false;
}

function clearAll() {
    clearInterval(cdInterval);

    digits = ["0","0","0","0","0","0","0","0","0"];
    cdRemaining = 0;
    cdRunning = false;
    document.getElementById("display").innerText = "00:00:00:000";
    document.getElementById("cd-set").innerText = "Set";

    enableNumberButtons(); // desbloquear
}

function backToMenu() {
    clearInterval(cdInterval);
    clearAll();
    document.getElementById("countdown-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}


// ===== CRONÓMETRO =====

function toggleStopwatch() {
    const btn = document.getElementById("sw-start");

    if (!isRunning) {
        // iniciar
        isRunning = true;
        swStartTime = Date.now() - swElapsed;
        btn.innerText = "Stop";

        swInterval = setInterval(() => {
            swElapsed = Date.now() - swStartTime;
            updateSwDisplay();
        }, 30);

    } else {
        // detener
        clearInterval(swInterval);
        isRunning = false;
        btn.innerText = "Start";
    }
}

function updateSwDisplay() {
    let total = swElapsed;
    let h = Math.floor(total / 3600000);
    let m = Math.floor((total % 3600000) / 60000);
    let s = Math.floor((total % 60000) / 1000);
    let ms= total % 1000;

    document.getElementById("stop-display").innerText =
        `${pad(h,2)}:${pad(m,2)}:${pad(s,2)}:${pad(ms,3)}`;
}

function clearStopwatch() {
    clearInterval(swInterval);
    swElapsed = 0;
    isRunning = false;
    document.getElementById("sw-start").innerText = "Start";
    updateSwDisplay();
}

function backToMenuFromSw() {
    clearInterval(swInterval);
    clearStopwatch();
    document.getElementById("stopwatch-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}