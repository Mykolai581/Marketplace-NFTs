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
