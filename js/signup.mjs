import { baseUrl } from "./constants/api.mjs";
import { passwordCheck, emailCheck, firstNameCheck, lastNameCheck } from "./validation/validation.mjs";

const form = document.querySelector("#register-form");

const firstNameInput = document.querySelector(".first-name-input");
const lastNameInput = document.querySelector(".last-name-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const avatarInput = document.querySelector(".avatar-input");

const firstNameCont = document.querySelector(".first-name-container");
const lastNameCont = document.querySelector(".last-name-container");
const emailCont = document.querySelector(".email-feedback-container");
const passwordCont = document.querySelector(".password-feedback-container");
const avatarCont = document.querySelector(".avatar-feedback-container");

const messageCont = document.querySelector(".message-cont");
const submitButton = document.querySelector("#submit-button");

const signUpUrl = `${baseUrl}/social/auth/register`;

// Sign Up validation

// First name validation

firstNameInput.addEventListener("change", firstNameInputValidation);

function firstNameInputValidation() {
    if (firstNameCheck(firstNameInput.value) === false) {
        firstNameCont.innerHTML = `<span class="error-message">*Please fill in your first name of at least 2 characters*</span>`;
    } else {
        firstNameCont.innerHTML = `<span class="success-message">*First name looks good*</span>`;
    }
}

// Last name validation

lastNameInput.addEventListener("change", lastNameInputValidation);

function lastNameInputValidation() {
    if (lastNameCheck(lastNameInput.value) === false) {
        lastNameCont.innerHTML = `<span class="error-message">*Please fill in your last name of at least 2 characters*</span>`;
    } else {
        lastNameCont.innerHTML = `<span class="success-message">*Last name looks good*</span>`;
    }
}


// Email validation

emailInput.addEventListener("change", emailInputValidation);

function emailInputValidation() {
    if (emailCheck(emailInput.value) === false) {
        emailCont.innerHTML = `<span class="error-message">*Your email must be a valid email from either the "@stud.noroff.no" or "@noroff.no" domain*</span>`;
    } else {
        emailCont.innerHTML = `<span class="success-message">*Email looks good*</span>`;
    }
}

// Password validation

passwordInput.addEventListener("change", passwordInputValidation);

function passwordInputValidation() {
    if (passwordCheck(passwordInput.value) === false) {
        passwordCont.innerHTML = `<span class="error-message">*Your password must be at least 8 characters*</span>`;
    } else {
        passwordCont.innerHTML = `<span class="success-message">*Password looks good*</span>`;
    }
}

// Form submit management

form.addEventListener("submit", signUp);

function signUp() {
    event.preventDefault();
    console.log(event);

    // Manage the first name instructions
    if (firstNameCheck(firstNameInput.value) === false) {
        firstNameCont.innerHTML = `<span class="error-message">*Please fill in your first name of at least 2 characters*</span>`;
    } else {
        firstNameCont.innerHTML = `<span class="success-message">*First name looks good*</span>`;
    }

    // Manage the last name instructions
    if (lastNameCheck(lastNameInput.value) === false) {
        lastNameCont.innerHTML = `<span class="error-message">*Please fill in your last name of at least 2 characters*</span>`;
    } else {
        lastNameCont.innerHTML = `<span class="success-message">*Last name looks good*</span>`;
    }

    // Manage the email instructions
    if (emailCheck(emailInput.value) === false) {
        emailCont.innerHTML = `<span class="error-message">*Please fill in a valid email that is either of a "@stud.noroff.no"- or "@noroff.no"-domain*</span>`;
    } else {
        emailCont.innerHTML = `<span class="success-message">*Email looks good*</span>`;
    }

    // Manage the password instructions
    if (passwordCheck(passwordInput.value) === false) {
        passwordCont.innerHTML = `<span class="error-message">*Please fill in your password of at least 8 characters*</span>`;
    } else {
        passwordCont.innerHTML = `<span class="success-message">*Password looks good*</span>`;
    }    
};

/* Register Code */

form.addEventListener("submit", async (data) => {
    data.preventDefault();
  
    if (firstNameCheck(firstNameInput.value) && lastNameCheck(lastNameInput.value) && passwordCheck(passwordInput.value) && emailCheck(emailInput.value)) {
        const firstNameConst = firstNameInput.value;
        const lastNameConst = lastNameInput.value;
        const emailConst = emailInput.value;
        const passwordConst = passwordInput.value;
        const avatarConst = avatarInput.value;

        const emailConstLower = emailConst.toLowerCase();

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
              name: `${firstNameConst}_${lastNameConst}`,
              email: `${emailConstLower}`,
              password: `${passwordConst}`,
              avatar: `${avatarConst}`
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          };
        
          console.log("RequestOptions", requestOptions);

        try {
            const resp = await fetch(signUpUrl, requestOptions)
            if(!resp.ok) {
            const json = await resp.json();
            console.log("error json: ", json);
            throw new Error(json.errors[0].message);
            }
            if(resp.ok) {
                messageCont.innerHTML = `<div class="register-success-cont">
                                            <h3 class="success-message">Your profile was successfully registered, and you can now log in to Product Passion.</h3>
                                            <div>Your username: ${firstNameConst}_${lastNameConst}</div>
                                            <div>Your email: ${emailConstLower}</div>
                                            <a href="login.html" class="login-page-button" title="Login page">Log In</a>
                                        </div>`;
                form.reset();
                firstNameCont.innerHTML = ``;
                lastNameCont.innerHTML = ``;
                emailCont.innerHTML = ``;
                passwordCont.innerHTML = ``;
            }
        }
        catch(error) {
            console.log(error);
            messageCont.innerHTML = `<span class="error-message">${error}</span>`
        }
    } else {
        messageCont.innerHTML = `<span class="error-message">There was an error.</span>`
    }
});