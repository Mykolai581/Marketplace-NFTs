//Animation

const animElements = document.querySelectorAll(".animation");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

animElements.forEach((anim) => {
  observer.observe(anim);
});

//Menu-Burger

const buttonMenu = document.querySelector(".header__menu-burger");
const menu = document.querySelector(".header__menu");
const menuLink = document.querySelectorAll(".menu__link");

buttonMenu.addEventListener("click", () => {
  buttonMenu.classList.toggle("active");
  menu.classList.toggle("active");
});

menuLink.forEach((link) => {
  link.addEventListener("click", () => {
    buttonMenu.classList.remove("active");
    menu.classList.remove("active");
  });
});

//Form validation

const footerFormEl = document.querySelector(".footer__form");
const footerInputEl = document.querySelector(".footer__input");
const footerMessage = document.querySelector(".message__footer");

document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("subscriberEmail");

  if (footerMessage) {
    footerMessage.textContent = `You already subscribed with: ${savedEmail}`;
    footerMessage.style.color = "gray";
  }
});

function handleSubscriptionForm(form, input, messageBox) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (email === "") {
      messageBox.textContent = "Please enter an email";
      messageBox.style.color = "white";
      input.style.border = "2px solid white";
      return;
    }

    if (isValidEmail(email)) {
      if (!email.endsWith(".com")) {
        messageBox.textContent = "Email must end with .com ";
        messageBox.style.color = "red";
        input.style.border = "2px solid red";
        return;
      }

      messageBox.textContent = "Email is valid";
      messageBox.style.color = "green";
      input.style.border = "2px solid green";
      localStorage.setItem("subscriberEmail", email);
      input.value = "";
    } else {
      messageBox.textContent = "Email is not valid";
      messageBox.style.color = "red";
      input.style.border = "2px solid red";
    }

    setTimeout(() => {
      messageBox.textContent = "";
      input.style.border = "";
    }, 3000);
  });
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

handleSubscriptionForm(footerFormEl, footerInputEl, footerMessage);

//Create account
const createFormEl = document.querySelector(".create__form");
const inputNameEl = document.querySelector(".name-input");
const inputEmailEl = document.querySelector(".email-input");
const inputPasswordEl = document.querySelector(".password-input");
const inputConfirmPasswordEl = document.querySelector(".confirm-input");
const messageEl = document.querySelector(".form-message");

const formCreateName = document.querySelector(".form-create__name");
const formCreateEmail = document.querySelector(".form-create__email ");
const formCreatePassword = document.querySelector(".form-create__password");
const formCreateConfirm = document.querySelector(".form-create__confirm");

function resetBorder() {
  formCreateName.style.border = "none";
  formCreateEmail.style.border = "none";
  formCreatePassword.style.border = "none";
  formCreateConfirm.style.border = "none";
}

createFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = inputNameEl.value.trim();
  const email = inputEmailEl.value.trim();
  const password = inputPasswordEl.value.trim();
  const confirmPassword = inputConfirmPasswordEl.value.trim();

  if (!name || !email || !password || !confirmPassword) {
    messageEl.textContent = "Fill in all fields";
    messageEl.style.color = "red";
    messageEl.style.marginBottom = "10px";

    formCreateName.style.border = "2px solid red";
    formCreateEmail.style.border = "2px solid red";
    formCreatePassword.style.border = "2px solid red";
    formCreateConfirm.style.border = "2px solid red";

    setTimeout(() => {
      messageEl.textContent = "";
      resetBorder();
    }, 3000);

    return;
  }

  if (name.length <= 3) {
    messageEl.textContent = "The name must have more than three letters.";
    messageEl.style.color = "red";

    formCreateName.style.border = "2px solid red";

    setTimeout(() => {
      messageEl.textContent = "";
      resetBorder();
    }, 3000);

    return;
  }

  if (!isValidEmail(email)) {
    messageEl.textContent = "Invalid email format";
    messageEl.style.color = "red";

    formCreateEmail.style.border = "2px solid red";

    setTimeout(() => {
      messageEl.textContent = "";
      resetBorder();
    }, 3000);
    return;
  }

  if (password.length < 8) {
    messageEl.textContent = "Password must contain at least 8 characters";
    messageEl.style.color = "red";
    formCreatePassword.style.border = "2px solid red";

    setTimeout(() => {
      messageEl.textContent = "";
      resetBorder();
    }, 3000);
    return;
  }

  if (password !== confirmPassword) {
    messageEl.textContent = "Password and confirmation must match";
    messageEl.style.color = "red";
    formCreateConfirm.style.border = "2px solid red";

    setTimeout(() => {
      messageEl.textContent = "";
      resetBorder();
    }, 3000);
    return;
  }

  const newUser = {
    name,
    email,
    password,
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isEmailTaken = users.some((user) => user.email === email);
  if (isEmailTaken) {
    messageEl.textContent = "This email is already registered";
    messageEl.style.color = "red";
    formCreateEmail.style.border = "2px solid red";
    return;
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  messageEl.textContent = "Account created successfully!";
  messageEl.style.color = "green";

  inputNameEl.value = "";
  inputEmailEl.value = "";
  inputPasswordEl.value = "";
  inputConfirmPasswordEl.value = "";

  setTimeout(() => {
    messageEl.textContent = "";
    resetBorder();
  }, 3000);
});
