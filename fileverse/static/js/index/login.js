initLoginForm();
initRegisterForm();

function initLoginForm() {
    const loginButton = document.querySelectorAll(".login-form button")[0];
    const registerButton = document.querySelectorAll(".login-form button")[1];

    const registerForm = document.querySelector(".register-form-container");
    registerForm.classList.add("display-disable");



    loginButton.onclick = (event) => {
        event.preventDefault();
        const loginForm = document.querySelector(".login-form");

        fetch("/auth/login", {
            method: "POST",
            body: new FormData(loginForm),
        })
        .then(res => {
            console.log(res)
            if (res.status !== 200)
                window.location.href = "/";
            if (res.status === 200)
                window.location.href = res.url;
        })
        .catch(err => console.log(err));

    }

    registerButton.onclick = (event) => {
        event.preventDefault();

        const background = document.querySelector(".index-page-layout");
        const registerForm = document.querySelector(".register-form-container");

        background.classList.add("blur-active");
        registerForm.classList.remove("display-disable");
        registerForm.classList.add("display-active");
    }

}

function initRegisterForm() {
    
    const registerButton = document.querySelectorAll(".register-form-container button")[0];
    const closeButton = document.querySelectorAll(".register-form-container button")[1];
    
    registerButton.onclick = (event) => {
        event.preventDefault();
        const registerForm = document.querySelector(".register-form-container form");

        // Make API call to backend
        // ...
        
        
        fetch("/auth/register", {
            method: "POST",
            body: new FormData(registerForm)
        })
        .then(res => {
            document.querySelector(".register-form-container").classList.add("display-disable");

            const background = document.querySelector(".index-page-layout");
            background.classList.remove("blur-active");

            window.location.href = "/";
        })
        .catch(err => console.log(err));
        
        console.log(event.target.parentElement)

    };

    closeButton.onclick = (event) => {
        event.preventDefault();

        const background = event.target.parentElement.parentElement.previousElementSibling;
        const registerContainer = event.target.parentElement.parentElement;
        const registerForm = event.target.parentElement;
        registerForm.reset();

        registerContainer.classList.remove("display-active");
        registerContainer.classList.add("display-disable");

        background.classList.remove("blur-active");
    };
}

