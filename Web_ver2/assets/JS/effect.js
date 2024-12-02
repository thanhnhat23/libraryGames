// Khai bao
const test = document.querySelectorAll("a");
const OFlist = document.querySelectorAll('.list');
// Add effect menu header
OFlist.forEach(list => {
    list.addEventListener('click', function() {
        OFlist.forEach(list =>
            list.classList.remove('active')
        );
        this.classList.add('active'); 
    });
});
// Play music
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
function disableSound() {
    var audio = document.getElementById("music");
    if (audio) {
        audio.muted = false;
        audio.pause();
    }
}
// Play video
function convertToEmbed(url) {
    const videoID = url.split("v=")[1]?.split("&")[0]; // Lấy video ID từ URL
    return videoID ? `https://www.youtube.com/embed/${videoID}` : "";
}
function playVideo() {
    const input = document.getElementById("input");
    const iframe = document.getElementById("output");
    const url = convertToEmbed(input.value.trim()); // Chuyển URL sang embed
    if (url) {
        iframe.src = `${url}?autoplay=1&loop=1`;
        input.value = "";
    }
}
document.getElementById("input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        playVideo();
        disableSound();
        document.querySelector(".choose-music").classList.remove("active");
        document.querySelector(".overlay").computedStyleMap.display = 'none';
        document.querySelector(".all").classList.remove("blur");
    }
});
// Thay musics
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
    }
})
document.getElementById("icon").addEventListener("click", function(){
    document.querySelector(".choose-music").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
})
// ON/OFF music
document.getElementById("changeMusics").addEventListener("click", function(){
    document.querySelector(".choose-music").classList.add("active");
    document.querySelector(".overlay").classList.add("active");
})
// Kiem tra game da update chua
test.forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (href === "#") {
            alert("Game chưa được update quay lại sau.");
        }
    });
});