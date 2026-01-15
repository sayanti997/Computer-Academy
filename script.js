const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

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
    nameError.textContent = "Name should contain only letters and a single space between words.";
    isValid = false;
}

    
    if(name.length < 5){
        nameError.textContent = "Name must be minimum 5 letters";
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

    alert(
        "Registration Successful!\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "Qualification: " + qualification
    );

    closePopup();
}
fetch("https://computer-academy-4.onrender.com/api/enquiry", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        phone,
        email,
        qualification
    })
})
.then(res => res.json())
.then(data => {
    alert(data.message || "Enquiry submitted successfully!");
    closePopup();
})
.catch(err => {
    console.error(err);
    alert("Server error. Please try again later.");
});
