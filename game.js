const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: "blue",
    speed: 5,
};

const fallingObject = {
    x: Math.random() * (canvas.width - 50),
    y: 0,
    width: 50,
    height: 50,
    color: "red",
    speed: 2,
};

function draw() {
    // Bersihkan layar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar pemain
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Gambar objek jatuh
    ctx.fillStyle = fallingObject.color;
    ctx.fillRect(fallingObject.x, fallingObject.y, fallingObject.width, fallingObject.height);
}

function update() {
    // Perbarui posisi objek jatuh
    fallingObject.y += fallingObject.speed;

    // Cek tabrakan
    if (
        player.x < fallingObject.x + fallingObject.width &&
        player.x + player.width > fallingObject.x &&
        player.y < fallingObject.y + fallingObject.height &&
        player.y + player.height > fallingObject.y
    ) {
        alert("Game Over!");
        resetGame();
    }

    // Reset posisi objek jika jatuh ke bawah layar
    if (fallingObject.y > canvas.height) {
        fallingObject.x = Math.random() * (canvas.width - 50);
        fallingObject.y = 0;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player.x = canvas.width / 2 - 25;
    fallingObject.x = Math.random() * (canvas.width - 50);
    fallingObject.y = 0;
}

document.addEventListener("keydown", function (event) {
    // Gerak pemain ke kiri
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }

    // Gerak pemain ke kanan
    if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
});

gameLoop();
