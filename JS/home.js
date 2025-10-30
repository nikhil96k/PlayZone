const playBtns = document.querySelectorAll('.play-btn');

playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const gameUrl = btn.dataset.url;
        localStorage.setItem('targetGame', "../" + gameUrl); // store clicked game with adjusted path
        window.location.href = 'HTML/loadingscreen.html'; // go to loading screen
    });
});



document.addEventListener('DOMContentLoaded', () => {

    // ---------- RESET DASHBOARD DATA ONLY ON FRESH LOAD ----------
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        localStorage.setItem('gameStats', JSON.stringify({}));
    }

    // ---------- DASHBOARD UPDATE ----------
    const profileDrawer = document.getElementById('profileDrawer');

    profileDrawer.addEventListener('show.bs.offcanvas', () => {
        const stats = JSON.parse(localStorage.getItem('gameStats')) || {};
        const container = document.getElementById('dashboardStats');
        container.innerHTML = '';

        if (Object.keys(stats).length === 0) {
            container.innerHTML = '<p>No games played yet.</p>';
            return;
        }

        for (const [game, data] of Object.entries(stats)) {
            // Calculate total time including ongoing session
            let totalSeconds = data.totalTime;
            if (data.lastStart) {
                totalSeconds += Math.floor((Date.now() - data.lastStart) / 1000);
            }

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            const gameItem = document.createElement('div');
            gameItem.style.marginBottom = '10px';
            gameItem.innerHTML = `
    <strong>${game}</strong>
    <div class="plays-count">Plays: ${data.plays}</div>
    <div class="time-played">Time Played: ${minutes}m ${seconds}s</div>`;
            container.appendChild(gameItem);
        }
    });

    // ---------- SAVE TIME ON PAGE LEAVE ----------
    window.addEventListener('beforeunload', () => {
        const stats = JSON.parse(localStorage.getItem('gameStats')) || {};
        for (const [game, data] of Object.entries(stats)) {
            if (data.lastStart) {
                const playedTime = Math.floor((Date.now() - data.lastStart) / 1000);
                stats[game].totalTime += playedTime;
                stats[game].lastStart = 0;
            }
        }
        localStorage.setItem('gameStats', JSON.stringify(stats));
    });

});








// dark made lightmode
const btn = document.getElementById('darkLightBtn');
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});







// search


document.getElementById("gameSearchForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const searchQuery = document.getElementById("gameSearchInput").value.toLowerCase();
    const gamesSection = document.getElementById("games");
    const row = gamesSection.querySelector(".row");
    const gameCards = Array.from(row.querySelectorAll(".col-md-4"));

    // Find the first card that matches the search
    const matchedCardIndex = gameCards.findIndex(card => {
        const gameTitle = card.querySelector(".card-title").innerText.toLowerCase();
        return gameTitle.includes(searchQuery);
    });

    if (matchedCardIndex > 0) {
        // Move the matched card to the top
        const matchedCard = gameCards[matchedCardIndex];
        row.insertBefore(matchedCard, row.firstChild);
    }

    // Scroll to games section
    gamesSection.scrollIntoView({ behavior: "smooth" });
});



