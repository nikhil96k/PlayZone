


document.addEventListener("DOMContentLoaded", function () {
    const fill = document.querySelector(".progress-bar-fill");
    const icon = document.getElementById("progressIcon");
    const container = document.querySelector(".progress-container");
    let progress = 0;

    // Get the target game from localStorage
    const targetGame = localStorage.getItem('targetGame');

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            // Redirect to the selected game
            window.location.href = targetGame;
        } else {
            progress += 1; // Adjust speed
            fill.style.width = progress + "%";

            // Move icon along the bar
            const containerWidth = container.clientWidth;
            icon.style.left = (containerWidth * progress / 100) + "px";
        }
    }, 50); // 50ms per step = ~5 seconds total
});
