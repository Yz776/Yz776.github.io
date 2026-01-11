// ===================================
// HACKER MODE MODULE
// Aktif saat nama "Mohammad Ahsan Al Ghoni" diklik
// ===================================

let hackerModeActive = false;
let matrixInterval = null;

// =======================
// INJECT STYLE
// =======================
const hackerStyle = document.createElement("style");
hackerStyle.innerHTML = `
body.hacker {
    background: #000;
    color: #00ff9c;
    font-family: "Courier New", monospace;
}

body.hacker a {
    color: #00ff9c;
}

body.hacker .kartu-profil,
body.hacker .karya-card {
    background: rgba(0,0,0,0.85);
    border: 1px solid #00ff9c;
    box-shadow: 0 0 20px rgba(0,255,156,0.5);
}

body.hacker .karya-link {
    border: 1px solid #00ff9c;
    background: transparent;
    text-shadow: 0 0 6px rgba(0,255,156,0.8);
}

body.hacker h1,
body.hacker h2,
body.hacker p {
    text-shadow: 0 0 10px rgba(0,255,156,0.7);
}

@keyframes glitch {
    0% { text-shadow: 2px 0 red; }
    20% { text-shadow: -2px 0 cyan; }
    40% { text-shadow: 2px 0 lime; }
    60% { text-shadow: -2px 0 magenta; }
    80% { text-shadow: 2px 0 yellow; }
    100% { text-shadow: none; }
}

body.hacker .kartu-profil h1 {
    animation: glitch 1.4s infinite;
}
`;
document.head.appendChild(hackerStyle);

// =======================
// ACCESS GRANTED
// =======================
function showAccessGranted() {
    const overlay = document.createElement("div");
    overlay.textContent = "ACCESS GRANTED";

    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        letter-spacing: 6px;
        color: #00ff9c;
        font-family: monospace;
        z-index: 9999;
        background: rgba(0,0,0,0.9);
        text-shadow: 0 0 20px #00ff9c;
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.remove();
    }, 1800);
}

// =======================
// MATRIX RAIN
// =======================
function startMatrixRain() {
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    document.body.appendChild(canvas);

    canvas.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
    `;

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アカサタナABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    matrixInterval = setInterval(() => {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff9c";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 50);
}

// =======================
// ENABLE HACKER MODE
// =======================
function enableHackerMode() {
    if (hackerModeActive) return;
    hackerModeActive = true;

    document.body.classList.add("hacker");

    const nameEl = document.querySelector(".kartu-profil h1");
    const descEl = document.querySelector(".kartu-profil p");
    const socialEl = document.querySelector(".link-sosial");
    const karyaTitle = document.querySelector(".karya h2");

    if (nameEl) nameEl.textContent = "Mohammad Ahsan Al Ghoni";
    if (descEl) descEl.textContent = "Saya adalah seorang pentester dan attacker.";
    if (socialEl) socialEl.remove();
    if (karyaTitle) karyaTitle.textContent = "💼 Karya Ahsan";

    if (navigator.vibrate) {
        navigator.vibrate([120, 60, 120]);
    }

    showAccessGranted();
    startMatrixRain();

    console.log("Hacker mode enabled");
}

// =======================
// TRIGGER VIA JUDUL KARYA
// =======================
window.addEventListener("load", () => {
    const karyaTitle = document.querySelector(".karya h2");

    if (!karyaTitle) return;

    karyaTitle.style.cursor = "pointer";

    karyaTitle.addEventListener("click", () => {
        if (typeof enableHackerMode === "function") {
            enableHackerMode();
        }
    });
});
