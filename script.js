document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js loaded successfully"); // Debugging log to check if script runs

    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) {
        console.error("Error: #themeToggle button not found in the DOM.");
        return;
    }
    
    const body = document.body;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light-theme";
    body.className = savedTheme;

    themeToggle.addEventListener("click", () => {
        let newTheme;
        if (body.classList.contains("light-theme")) {
            newTheme = "dark-theme";
        } else if (body.classList.contains("dark-theme")) {
            newTheme = "high-contrast";
        } else {
            newTheme = "light-theme";
        }
        
        body.className = newTheme;
        localStorage.setItem("theme", newTheme);
    });
});

// Check if running on localhost and set a temporary user
if (window.location.hostname === "localhost") {
    console.log("Running on localhost: Setting temporary user.");
    localStorage.setItem("loggedInUser", JSON.stringify({
        username: "testUser",
        userclass: "class1",
        rank: 10
    }));
}

function showFeedbackForm() {
    window.location.href = "feedback-pnc.html"; // Redirect to the feedback page
}

function showFeedbackFormHome() {
    window.location.href = "feedback-home.html"; // Redirect to the feedback page
}


function saveFeedbackForm(event) {
    event.preventDefault(); // Prevent default form submission

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.username) {
        document.getElementById("feedback-message").textContent = "Error: User not found. Please log in first.";
        return;
    }

    const username = user.username;
    const userclass = user.userclass;
    const rank = user.rank;
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;

    const feedbackData = {
        username: username,
        userclass: userclass,
        rank: rank,
        rating: rating,
        comments: comments
    };

<!-- update with googlescript https://docs.google.com/spreadsheets/d/1QD3fCLn1MLvouvPcRdGED-THGdsu3XOcdt6PqYQZnmM/edit?gid=0#gid=0 -->
    fetch("https://script.google.com/macros/s/AKfycbxlZGf4j-UdqBP-n0edpFXP5L0XPK0Z-ywGgWR8G1C9dNg7yAVayFrkBpKaZoJiiKSc/exec", {  
        mode: "no-cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData)
    })
    .then(() => {
        document.getElementById("feedback-message").textContent = "We appreciate your feedback! If you have further comments, please drop us an email at fivethirtyteam@gmail.com.";
        document.getElementById("feedback-form").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("feedback-message").textContent = "Error submitting feedback. Please try again later.";
    });
}

// Attach event listener to the feedback form
document.getElementById("feedback-form").addEventListener("submit", saveFeedbackForm);
