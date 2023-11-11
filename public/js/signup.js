document.getElementById("signupform").addEventListener("submit", signup);

async function signup(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Make the axios POST request with a relative URL
        const response = await axios.post("http://localhost:8080/user/signup", {
            username: username,
            email: email,
            password: password
        });

        // Check the status code directly
        if (response.status === 201) {
            // Handle the successful response
            console.log("User created successfully");
            // Optionally, redirect to a new page or update the UI
            window.location.href = "./login.html"; // Replace with your desired success page URL
        } else {
            // Handle unsuccessful response
            console.log("Error creating user");
            // Optionally, show an error message to the user
        }
    } catch (error) {
        // Handle errors
        console.log(error);
        // Optionally, show an error message to the user
    }
}
