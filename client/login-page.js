const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

function loginSuccess(e) {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "seeks" && password === "thisisnice") {
        alert("You have successfully logged in.");
        window.location.href = "http://127.0.0.1:5500/client/index.html"
    } else {
        loginErrorMsg.style.opacity = .7;
        loginErrorMsg.style.border = "0px"
    }
}




loginButton.addEventListener("click", loginSuccess)
