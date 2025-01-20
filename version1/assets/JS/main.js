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

//Thong bao chua hoan thanh
document.querySelectorAll(".un").forEach( item => {
    item.addEventListener("click", () => {alert("Dev chưa làm xong thông cảm");
    })
})

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
//Qua Page
var currentPage = 1;
var totalPage = 6;
function changeDiv(pageNum) {
    if (pageNum < 1 || pageNum > totalPage) 
        return;
    var divs = document.getElementsByClassName("card-page");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById('page' + pageNum).style.display = "flex";
    currentPage = pageNum;
    updatePage();
}
function prevPage() {
    if (currentPage > 1) {
        changeDiv(currentPage - 1);
    }
}
function nextPage() {
    if (currentPage < totalPage) {
        changeDiv(currentPage + 1);
    }
}

function updatePage() {
    var links = document.querySelectorAll('.page a');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    document.querySelector('.page a:nth-child(' + (currentPage + 1) + ')').classList.add('active');
}