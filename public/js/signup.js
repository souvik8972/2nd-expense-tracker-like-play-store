document.getElementById("signupform").addEventListener("submit", signup);
const show=document.getElementById("success")
const error=document.getElementById("error")

async function signup(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    try {
        // Make the axios POST request with a relative URL
        const response = await axios.post("http://localhost:8080/user/signup", {
            username: username.value,
            email: email.value,
            password: password.value
        });
        

        // Check the status code directly
        if (response.status === 201) {
            // Handle the successful response
            console.log("User created successfully");
            // Optionally, redirect to a new page or update the UI
            username.value = "";
            email.value = "";
            password.value = "";
            

            show.classList.add("showSuccess");
           
            setTimeout(()=>{
                window.location.href = "/user/login";
                show.classList.remove("showSuccess");
            },2000)

            // window.location.href = "http://localhost:8080/user/login";
        } else {
            if(response.status===400){
                console.log("email error: " + response.status)
                error.classList.add(".errorpop");
    
            }
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
