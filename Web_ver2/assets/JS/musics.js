const music = document.getElementById('background-music');
document.body.addEventListener('mouseenter', () => {
    music.play().catch(err => console.error('Không thể phát nhạc:', err));
    music.volume = 0.2;
});