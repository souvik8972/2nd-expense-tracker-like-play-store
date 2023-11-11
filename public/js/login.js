document.getElementById("loginForm").addEventListener("submit", logedIn);

async function logedIn(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://localhost:8080/user/login", {
            email: email,
            password: password
        });

        if (response.status === 200) {
            alert("Login successful");
            console.log(response.data);
            // Optionally, redirect to a new page or update the UI
            window.location.href = "./dashboard.html"; // Replace with your desired success page URL
        } else {
            console.log("Error while logging in");
            // Optionally, show an error message to the user
        }
    } catch (err) {
        console.log(err);
        // Optionally, show an error message to the user
    }
}