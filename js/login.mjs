import { baseUrl } from "./constants/api.mjs";

// Login validation

const form = document.querySelector(".login-form");

const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

const firstNameCont = document.querySelector(".first-name-container");
const lastNameCont = document.querySelector(".last-name-container");
const emailCont = document.querySelector(".email-feedback-container");
const passwordCont = document.querySelector(".password-feedback-container");

const messageCont = document.querySelector(".message-cont");
const submitButton = document.querySelector("#submit-button");

const loginUrlEndPoint = "/social/auth/login";
const loginUrl = `${baseUrl}/social/auth/login`;

/* Log In Code */

form.addEventListener("submit", async (data) => {
  data.preventDefault();

  localStorage.clear();

  if (!passwordInput.value || !emailInput.value) {
    messageCont.innerHTML = `<span class="error-message">Please fill in your email and password to log in.</span>`;
  }
  
  if (passwordInput.value && emailInput.value) {

    const emailConst = emailInput.value;
    const passwordConst = passwordInput.value;

    const emailConstLower = emailConst.toLowerCase();
       
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: `${emailConstLower}`,
        password: `${passwordConst}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
        
    console.log("RequestOptions: ", requestOptions);
        
    try {
      const resp = await fetch(loginUrl, requestOptions);
      const json = await resp.json();

      if (!resp.ok) {
				throw new Error(json.errors[0].message);
			}

      const token = json.accessToken;
      const profilePictureUrl = json.avatar;
      const username = json.name;
      localStorage.setItem("username", username);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("profilePictureUrl", profilePictureUrl);

      if (resp.ok) {
        const profileOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        messageCont.innerHTML = `You are now successfully logged in. If the feed doesn't load automatically, click here: <a href="feed.html" title="Feed">Feed</a>`;
        window.location.href = "feed.html";

      }
    } catch (error) {
      console.log(error);
      messageCont.innerHTML = `<span class="error-message">${error}</span>`;
    }
  }
});

