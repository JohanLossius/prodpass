// Sign Up validation

const form = document.querySelector("#register-form");

const firstNameInput = document.querySelector(".first-name-input");
const lastNameInput = document.querySelector(".last-name-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

const firstNameCont = document.querySelector(".first-name-container");
const lastNameCont = document.querySelector(".last-name-container");
const emailCont = document.querySelector(".email-feedback-container");
const passwordCont = document.querySelector(".password-feedback-container");

const messageCont = document.querySelector(".message-cont");
const submitButton = document.querySelector("#submit-button");

const baseUrl = "https://api.noroff.dev/api/v1";
const signUpUrlEndPoint = "/social/auth/register";
const signUpUrl = baseUrl + signUpUrlEndPoint;

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

    // Submission validation and messaging.
    
    // if (firstNameCheck(firstNameInput.value) && lastNameCheck(lastNameInput.value) && passwordCheck(passwordInput.value) && emailCheck(emailInput.value)) {

        // messageCont.innerHTML = `<span class="success-message">Your message was sent successfully. You'll hear from us within 2 working days.</span>`;
        // form.reset();
        // firstNameCont.innerHTML = `First name*`;
        // lastNameCont.innerHTML = `Last name*`;
        // emailInput.innerHTML = `Email*`;
        // passwordInput.innerHTML = `Password*`;

        // } else {
        //     messageCont.innerHTML = `<span class="error-message">There was an error.</span>`
        // }
};

function firstNameCheck(firstName) {
    const firstNameLength = firstName.trim().length;
    console.log(firstNameLength);
    if (firstNameLength >= 2) {
        return true;
    } else {
        return false;
    }
};

function lastNameCheck(lastName) {
    const lastNameLength = lastName.trim().length;
    console.log(lastNameLength);
    if (lastNameLength >= 2) {
        return true;
    } else {
        return false;
    }
};

function emailCheck(email) {
    const regEx = /\S+@\S+\.\S+/;
    const validEmail = regEx.test(email);
    console.log(validEmail);

    const studNoroffCont = email.indexOf('@stud.noroff.no');
    const noroffCont = email.indexOf('@noroff.no');

    if(validEmail === true && (noroffCont > -1 === true || studNoroffCont > -1 === true)) {
        return true;
    } else {
        return false;
    };
};

function passwordCheck(password) {
    const passwordLength = password.trim().length;
    console.log(passwordLength);
    if (passwordLength >= 8) {
        return true;
    } else {
        return false;
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

        const emailConstLower = emailConst.toLowerCase();

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
              name: `${firstNameConst}_${lastNameConst}`,
              email: `${emailConstLower}`,
              password: `${passwordConst}`,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          };
        
          console.log("RequestOptions", requestOptions);
          
        try {
            const resp = await fetch(signUpUrl, requestOptions)
            if(!resp.ok)
            throw new Error("Something went wrong");
            const json = await resp.json();
            console.log(json);
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
        }
    } else {
        messageCont.innerHTML = `<span class="error-message">There was an error.</span>`
    }
});

// form.addEventListener("submit", (data) => {
//     data.preventDefault();
  
//     if (username.value == "" || password.value == "") {
//       // throw error
//     } else {
//       // perform operation with form input
//     }
//   });

  
// const firstNameInput = document.querySelector(".first-name-input");
// const lastNameInput = document.querySelector(".last-name-input");
// const emailInput = document.querySelector(".email-input");
// const passwordInput = document.querySelector(".password-input");



// const requestOptions = {
//     method: 'POST',
//     body: JSON.stringify({
//       name: `${firstNameInput + "_" + lastNameInput}`,
//       email: `${emailInput}`,
//       password: `${passwordInput}`,
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   };
  
//   submitButton.addEventListener("click", registerUser);
  
//   function registerUser() = fetch('https://api.noroff.dev/api/v1/social/auth/register', requestOptions)
//     .then((response) => response.json())
//     .then((json) => console.log(json));

    // endpoint social register:

    // https://api.noroff.dev/api/v1/social/auth/register

    // Base URL

    // We follow a URL structure of https://api.noroff.dev/api/<version>/<endpoint>.

    // The API base URL for v1 is https://api.noroff.dev/api/v1.


    // const fetchOptions = {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       title: 'foo',
    //       body: 'bar',
    //       userId: 1,
    //     }),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     },
    //   };
      
    //   // Using the `fetchOptions` object we created aboves
    //   fetch('https://jsonplaceholder.typicode.com/posts', fetchOptions)
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));