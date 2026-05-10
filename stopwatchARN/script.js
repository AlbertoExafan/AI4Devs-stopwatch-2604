
let digits = ["0","0","0","0","0","0","0","0","0"]; // 9 posiciones (HHMMSSmmm)

function showCountdown() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("countdown-screen").classList.remove("hidden");
    updateDisplay();
}

function showStopwatch() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("stopwatch-screen").classList.remove("hidden");
}

function goBack() {
    document.getElementById("stopwatch-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

// Añadir número
function pressNum(n) {
    digits.shift();       // borra primera posición
    digits.push(n+"");    // inserta nuevo al final
    updateDisplay();
}

// Actualiza visual
function updateDisplay() {
    // Horas
    let h = digits[0] + digits[1];
    // Minutos
    let m = digits[2] + digits[3];
    // Segundos
    let s = digits[4] + digits[5];
    // Milisegundos (3 dígitos)
    let ms = digits[6] + digits[7] + digits[8];

    let text = `${h}:${m}:${s}:${ms}`;
    document.getElementById("display").innerText = text;
}

// Clear (poner a 0)
function clearAll() {
    digits = ["0","0","0","0","0","0","0","0","0"];
    updateDisplay();
}

// Set -> iniciar cuenta atrás
function setCountdown() {
    let hours = parseInt(digits[0]+digits[1]);
    let mins  = parseInt(digits[2]+digits[3]);
    let secs  = parseInt(digits[4]+digits[5]);
    let millis= parseInt(digits[6]+digits[7]+digits[8]);

    let totalMs = ((hours*3600 + mins*60 + secs) * 1000) + millis;

    if(totalMs > 0) {
        startCountdown(totalMs);
    }
}

let interval;
function startCountdown(ms) {
    clearInterval(interval);

    let end = Date.now() + ms;

    interval = setInterval(() => {
        let remaining = end - Date.now();
        if(remaining <= 0) {
            clearInterval(interval);
            alert("¡Tiempo terminado!");
            clearAll();
            return;
        }
        let h = Math.floor(remaining / 3600000);
        let m = Math.floor((remaining % 3600000) / 60000);
        let s = Math.floor((remaining % 60000) / 1000);
        let mil = remaining % 1000;

        document.getElementById("display").innerText = 
            `${pad(h,2)}:${pad(m,2)}:${pad(s,2)}:${pad(mil,3)}`;
    }, 30);
}

function pad(num, len) {
    return num.toString().padStart(len, "0");
}