import bcrypt from "bcryptjs";

const handleSignup = async (event) => {
    event.preventDefault();
    
    const password = event.target.password.value; // Get the password from the form
    const saltRounds = 10; // Number of salt rounds

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Prepare user data
    const userData = {
        username: event.target.username.value,
        password: hashedPassword,
    };

    // Send the data to the backend
    fetch("http://localhost:9000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Signup successful:", data);
    })
    .catch(error => {
        console.error("Error during signup:", error);
    });
};
