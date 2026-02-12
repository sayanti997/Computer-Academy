const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function submitForm() {

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let qualification = document.getElementById("qualification").value;

    let nameError = document.getElementById("nameError");
    let phoneError = document.getElementById("phoneError");
    let emailError = document.getElementById("emailError");
    let qualificationError = document.getElementById("qualificationError");

    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    qualificationError.textContent = "";

    let isValid = true;

    
    if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(name)) {
        nameError.textContent = "Name should contain only letters and single spaces.";
        isValid = false;
    } else if (name.length < 5) {
        nameError.textContent = "Name must be at least 5 characters long.";
        isValid = false;
    }

   
    if (!/^[0-9]{10}$/.test(phone)) {
        phoneError.textContent = "Phone number must be exactly 10 digits.";
        isValid = false;
    }

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    
    if (qualification === "") {
        qualificationError.textContent = "Please select your qualification.";
        isValid = false;
    }

    if (!isValid) return;

    fetch("https://computer-academy-4.onrender.com/api/enquiry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, phone, email, qualification })
    })
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
    })
    .then(data => {
        alert(data.message || "Enquiry submitted successfully!");
        closePopup();
    })
    .catch(err => {
        console.error(err);
        alert("Server error. Please try again later.");
    });
}

const track = document.getElementById("sliderTrack");
let cards = document.querySelectorAll(".trainer-card");
const cardsPerSlide = 5;
let currentIndex = 0;

/* Clone first 5 cards and add to end (for infinite effect) */
for (let i = 0; i < cardsPerSlide; i++) {
    let clone = cards[i].cloneNode(true);
    track.appendChild(clone);
}

cards = document.querySelectorAll(".trainer-card");

function slide() {
    currentIndex += cardsPerSlide;
    const cardWidth = cards[0].offsetWidth;

    track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

    /* Reset smoothly when reaching end */
    if (currentIndex >= cards.length - cardsPerSlide) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 0;
            track.style.transform = "translateX(0)";
        }, 800);

        setTimeout(() => {
            track.style.transition = "transform 0.8s ease-in-out";
        }, 900);
    }
}

setInterval(slide, 4000);
