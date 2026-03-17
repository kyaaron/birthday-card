document.addEventListener('DOMContentLoaded', () => {
    // Loading audio in saloon upon page load
    const saloonAudio = new Audio("../assets/ConcernedApe - Stardew Valley OST - 17 The Stardrop Saloon.mp3");
        window.addEventListener("load", () => {
            saloonAudio.loop = true;
            saloonAudio.play();
        })

    const lindsay = document.querySelector('#lindsay-sprite');
    const container = document.querySelector('#tavern-body');
    const keys = {};
    const speed = 4;

    let posX = container.offsetWidth / 2 - lindsay.offsetWidth / 2;
    let posY = container.offsetHeight - lindsay.offsetHeight;

    // Apply the initial position using left/top (JS takes over from the CSS bottom/left)
    lindsay.style.left = posX + 'px';
    lindsay.style.top  = posY + 'px';
    lindsay.style.bottom = 'unset'; // hand off from CSS to JS

    // --- Key tracking ---
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
            e.preventDefault(); // stops the page from scrolling
        }
    });
    window.addEventListener('keyup', (e) => { keys[e.key] = false; });

    // --- Game loop ---
    function gameLoop() {
        if (keys['ArrowUp'])    posY -= speed;
        if (keys['ArrowDown'])  posY += speed;
        if (keys['ArrowLeft'])  posX -= speed;
        if (keys['ArrowRight']) posX += speed;

        // Boundary clamping — keeps character inside the container
        const maxX = container.offsetWidth  - lindsay.offsetWidth;
        const maxY = container.offsetHeight - lindsay.offsetHeight;

        posX = Math.max(0, Math.min(posX, maxX));
        posY = Math.max(0, Math.min(posY, maxY));

        lindsay.style.left = posX + 'px';
        lindsay.style.top  = posY + 'px';

        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);

    // Dialog box
    let people = [];         // will be populated from your JSON
    let dialogOpen = false;

    const dialogBox      = document.getElementById('dialog-box');
    const dialogName     = document.getElementById('dialog-name');
    const dialogText     = document.getElementById('dialog-text');
    const dialogPortrait = document.getElementById('dialog-portrait');

    // Load your JSON file
    fetch('../conversations.JSON')
        .then(res => res.json())
        .then(data => {
            people = data.people;
            initHotspots();
        });

    function initHotspots() {
        document.querySelectorAll('.hotspot').forEach(hotspot => {
            hotspot.addEventListener('click', () => {
                const personName = hotspot.dataset.person; // matches "name" in JSON
                const person = people.find(p => p.name === personName);
                if (person) openDialog(person);
            });
        });
    }

    function openDialog(person) {
        dialogName.textContent     = person.name;
        dialogText.textContent     = person.conversation;
        dialogPortrait.src         = person.img;
        dialogPortrait.alt         = person.name;

        dialogBox.classList.add('visible');
        dialogOpen = true;
    }

    function closeDialog() {
        dialogBox.classList.remove('visible');
        dialogOpen = false;
    }

    // Close on Space or Enter
    window.addEventListener('keydown', (e) => {
        if (dialogOpen && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            closeDialog();
        }
    });
});