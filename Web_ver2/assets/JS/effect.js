// Add effect menu header
const OFlist = document.querySelectorAll('.list');
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