// ANIMASI PROFIL SAAT LOAD
window.addEventListener("load", () => {
    anime({
        targets: ".kartu-profil",
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: "easeOutExpo"
    });
});

let activeLink = null;

document.querySelectorAll(".karya-link").forEach(link => {
    const originalText = link.innerHTML;

    link.addEventListener("click", () => {
        const container = link.nextElementSibling;

        // JIKA KLIK LINK YANG SAMA → TUTUP
        if (activeLink === link) {
            container.innerHTML = "";
            link.innerHTML = originalText;
            link.classList.remove("active");
            activeLink = null;
            return;
        }

        // RESET SEMUA
        document.querySelectorAll(".iframe-container").forEach(c => c.innerHTML = "");
        document.querySelectorAll(".karya-link").forEach(l => {
            l.classList.remove("active");
            l.innerHTML = l.dataset.original || l.innerHTML;
        });

        // SIMPAN TEXT ASLI
        link.dataset.original = originalText;

        // SET AKTIF
        link.classList.add("active");
        link.innerHTML = "❌ Tutup";
        activeLink = link;

        // TAMPILKAN LOADER
        const loader = document.createElement("div");
        loader.className = "loader";
        container.appendChild(loader);

        // BUAT IFRAME
        const iframe = document.createElement("iframe");
        iframe.src = link.dataset.url;
        iframe.style.display = "none";

        iframe.onload = () => {
            loader.remove();
            iframe.style.display = "block";

            anime({
                targets: iframe,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: "easeOutExpo"
            });
        };

        container.appendChild(iframe);

        // SCROLL HALUS
        container.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
