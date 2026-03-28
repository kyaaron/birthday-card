const musicButton = document.querySelector("#index-music-btn");
const audio = new Audio("/birthday-card/assets/ConcernedApe-StardewValleyOST-01StardewValleyOverture.mp3");

musicButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
