window.addEventListener("load", () => {
    var vd = document.getElementById("video");
    if (vd.muted) {
        vd.muted = false;
        vd.play();
    }
})