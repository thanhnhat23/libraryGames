const e = require("cors");

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
// Kiem tra game da update chua
test.forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (href === "#") {
            alert("Game chưa được update quay lại sau.");
        }
    });
});