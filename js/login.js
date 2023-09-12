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

const baseUrl = "https://api.noroff.dev/api/v1";
const loginUrlEndPoint = "/social/auth/login";
const loginUrl = baseUrl + loginUrlEndPoint;

/* Log In Code */

form.addEventListener("submit", async (data) => {
  data.preventDefault();

  localStorage. clear();

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
      console.log(resp);

      const json = await resp.json();

      console.log("Login API reponse: ", json);

      const token = json.accessToken;
      console.log("AccessToken const: ", token);
      localStorage.setItem("accessToken", token);

      if (resp.ok) {
        const profileOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const username = json.name;

        localStorage.setItem("username", username);

        console.log("Username: ", username)

        console.log("profileOptions: ", profileOptions);

        messageCont.innerHTML = `You are now successfully logged in. If the feed doesn't load automatically, click here: <a href="feed.html" title="Feed">Feed</a>`;

        // window.location.href = "feed.html";

      } else {
        messageCont.innerHTML = `<span class="error-message">Something went wrong. Please make sure your email and password are filled out correctly.</span>`;
      }
    }
    catch (error) {
      console.log(error);
    }
  }
});

