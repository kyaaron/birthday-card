const musicButton = document.querySelector("#index-music-btn");
const audio = new Audio("/birthday-card/assets/ConcernedApe - Stardew Valley OST - 01 Stardew Valley Overture.mp3");

musicButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
