//Tang,Ha volume
var audio = document.getElementById("music");
function havolume() {
    if (audio.volume > 0.0) {
        audio.volume -= 0.1;
    }
}
function tangvolume() {
    if (audio.volume < 1.0) {
        audio.volume += 0.1;
    }
}

//Phat nhac va lay du lieu mp3
function enableSound() {
    var audio = document.getElementById("music");
    if (audio.muted) {
        audio.muted = false;
        audio.play()
    } 
    else {
        audio.muted = true;
        audio.play()
    }
}
window.addEventListener("load",() =>{
    const preLoader = document.querySelector(".loader");
    preLoader.classList.add("unactive");
})
document.querySelector(".ms").addEventListener("click", function(){
    document.querySelector(".choose-music").classList.add("active");
    document.querySelector(".overlay").computedStyleMap.display = 'block';
    document.querySelector(".all").classList.add("blur");
})
document.getElementById("changeMusic").addEventListener("click", function(){
    const fileInput = document.getElementById("musicFile");
    const audioPlayer = document.getElementById("music");
    const file = fileInput.files[0];
    if(file) {
        const source = audioPlayer.querySelector("source");
        const fileURL = URL.createObjectURL(file);
        source.src = fileURL;
        audioPlayer.load();
        audioPlayer.play();
        document.querySelector(".choose-music").classList.remove("active");
        document.querySelector(".overlay").computedStyleMap.display = 'none';
        document.querySelector(".all").classList.remove("blur");
    }
    else {
        document.querySelector(".choose-music").classList.remove("active");
        document.querySelector(".overlay").computedStyleMap.display = 'none';
        document.querySelector(".all").classList.remove("blur");
    }
})
