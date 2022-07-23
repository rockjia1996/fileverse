initLoginForm();
initRegisterForm();

function initLoginForm(){
    const registerButton = document.querySelectorAll(".login-form button")[1];
   
    const registerForm = document.querySelector(".register-form-container");
    registerForm.classList.add("display-disable");

    registerButton.onclick = (event) =>  {
        event.preventDefault();
        
        const background = document.querySelector(".index-page-layout");
        const registerForm = document.querySelector(".register-form-container");
        
        background.classList.add("blur-active");
        registerForm.classList.remove("display-disable");
        registerForm.classList.remove("display-active");



    }

}

function initRegisterForm(){
    const registerForm = document.querySelector(".register-form-container");

    const registerButton = document.querySelectorAll(".register-form-container button")[0];
    const closeButton = document.querySelectorAll(".register-form-container button")[1];

    console.log(registerButton.textContent)
    console.log(closeButton.textContent)

    registerButton.onclick = (event) => {
        event.preventDefault();

        // Make API call to backend
        // ...
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

