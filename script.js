// =======================
// AUDIO + VIBRATION
// =======================
const glassSound = document.getElementById("glassSound");

function playGlassEffect() {
    // sound
    if (glassSound) {
        glassSound.currentTime = 0;
        glassSound.volume = 0.7;
        glassSound.play().catch(() => {});
    }

    // vibration (HP only)
    if (navigator.vibrate) {
        navigator.vibrate([60, 40, 80]);
    }

    // glass particles
    spawnGlassParticles();
}

// =======================
// CANVAS GLASS PARTICLES
// =======================
const canvas = document.getElementById("glassCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function spawnGlassParticles() {
    particles = [];
    canvas.style.display = "block";

    for (let i = 0; i < 40; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 3,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * -8,
            size: Math.random() * 6 + 3,
            life: 60
        });
    }

    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life--;

        ctx.fillStyle = "rgba(180,220,255,0.8)";
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
    } else {
        canvas.style.display = "none";
    }
}

// =======================
// TRIGGER SOUND ON LINKS
// =======================
document.querySelectorAll(
    ".link-sosial a, .karya-link"
).forEach(el => {
    el.addEventListener("click", () => {
        playGlassEffect();
    });
});

// =======================
// IFRAME TOGGLE + LAZY LOAD
// =======================
let activeLink = null;

document.querySelectorAll(".karya-link").forEach(link => {

    const container = link.nextElementSibling;
    const originalText = link.innerHTML;

    link.addEventListener("click", () => {

        // CLOSE ACTIVE
        if (activeLink === link) {
            const iframe = container.querySelector("iframe");

            if (iframe) {
                anime({
                    targets: iframe,
                    opacity: [1, 0],
                    scale: [1, 0.95],
                    duration: 400,
                    easing: "easeInExpo",
                    complete: () => container.innerHTML = ""
                });
            }

            link.innerHTML = originalText;
            activeLink = null;
            return;
        }

        // RESET OTHERS
        document.querySelectorAll(".iframe-container").forEach(c => c.innerHTML = "");
        document.querySelectorAll(".karya-link").forEach(l => {
            l.innerHTML = l.dataset.original || l.innerHTML;
        });

        link.dataset.original = originalText;
        link.innerHTML = "❌ Tutup";
        activeLink = link;

        // LAZY LOAD IFRAME
        const iframe = document.createElement("iframe");
        iframe.src = link.dataset.url;
        iframe.loading = "lazy";
        iframe.style.opacity = "0";
        iframe.style.transform = "scale(0.95)";
        container.appendChild(iframe);

        iframe.onload = () => {
            anime({
                targets: iframe,
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 600,
                easing: "easeOutExpo"
            });
        };

        container.scrollIntoView({ behavior: "smooth" });
    });
});

// =======================
// LANDING PAGE ANIMATION
// =======================
window.addEventListener("load", () => {

    anime.timeline({
        easing: "easeOutExpo"
    })

    .add({
        targets: ".kartu-profil",
        opacity: [0, 1],
        translateY: [50, 0]
    })

    .add({
        targets: ".kartu-profil img",
        scale: [0.6, 1],
        rotate: [-15, 0],
        duration: 900,
        easing: "easeOutElastic(1, .6)"
    }, "-=400")

    .add({
        targets: ".link-sosial a",
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(200),
        easing: "easeOutBack"
    })

    .add({
        targets: ".anim-1",
        translateX: [150, 0],
        opacity: [0, 1]
    })

    .add({
        targets: ".anim-2",
        translateX: [-150, 0],
        opacity: [0, 1]
    }, "+=200")

    .add({
        targets: ".anim-3",
        translateY: [150, 0],
        opacity: [0, 1]
    }, "+=200");
});
