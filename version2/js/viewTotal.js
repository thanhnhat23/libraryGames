import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, update, onValue, get, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
// Thong so cau hinh Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDC2HfDkadLfHKos6prmlRlwfAVd1eTVBQ",
    authDomain: "librarygames-da3a1.firebaseapp.com",
    databaseURL: "https://librarygames-da3a1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "librarygames-da3a1",
    storageBucket: "librarygames-da3a1.firebasestorage.app",
    messagingSenderId: "1078421714372",
    appId: "1:1078421714372:web:bc6f84bb10ecfa47dda091",
    measurementId: "G-E776GSR4EG"
};
// Khoi tao Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const card = document.querySelectorAll('.card');
// Ham cap nhat view tu Firebase
function updateViewCounts() {
    card.forEach(card => {
        const id = card.getAttribute('data-id');
        const viewCountRef = ref(database, 'viewCounts/' + id);
        // Xem su thay doi view total
        onValue(viewCountRef, (snapshot) => {
            const count = snapshot.exists() ? snapshot.val() : 0;
            card.querySelector('.view-count').textContent = count;
        });
    });
}
// Cap nhat view total
updateViewCounts();
// Tang view total khi click vao card
card.forEach(card => {
    card.addEventListener('click', function() {
        const id = card.getAttribute('data-id');
        const viewCountRef = ref(database, 'viewCounts/' + id);
        // Lay so luong view tu Firebase
        get(viewCountRef).then((snapshot) => {
            let currentCount = snapshot.exists() ? snapshot.val() : 0;
            currentCount++; // Tang so luong view
            // Cap nhat view total trong Firebase
            set(viewCountRef, currentCount) // Su dung set de cap nhat du lieu
                .then(() => {
                    console.log("View count updated successfully.");
                })
                .catch((error) => {
                    console.error("Error updating view count:", error);
                });
        }).catch((error) => {
            console.error("Error getting view count:", error);
        });
    });
});