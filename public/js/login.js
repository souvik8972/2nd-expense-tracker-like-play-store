document.getElementById("loginForm").addEventListener("submit", logedIn);
const success=document.getElementById("success")

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

            success.classList.add("showlogin")
            setTimeout(()=>{
                window.location.href = "/user/dashboard";
                success.classList.remove("showlogin");
            },2000)
            
             // Replace with your desired success page URL
        } else {
            console.log("Error while logging in");
            // Optionally, show an error message to the user
        }
    } catch (err) {
        console.log(err);
        // Optionally, show an error message to the user
    }
}