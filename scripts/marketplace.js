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

//Search

window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".form-search__input");
  const searchButton = document.querySelector(".form-search__button");
  const searchList = document.querySelector(".search__list");

  searchInput.value = "";

  const searchNFTs = [
    {
      title: "Distant Galaxy",
      icon: "img/more/Avatar01.svg",
      name: "MoonDancer",
    },
    {
      title: "Life On Edena",
      icon: "img/more/Avatar02.svg",
      name: "NebulaKid",
    },
    {
      title: "AstroFiction",
      icon: "img/more/Avatar03.svg",
      name: "Spaceone",
    },
    {
      title: "DSGN Animals",
      icon: "img/collection/Avatar01.svg",
      name: " MrFox",
    },
    {
      title: "Magic Mushrooms",
      icon: "img/collection/Avatar02.svg",
      name: "Shroomie",
    },
    {
      title: "Disco Machines",
      icon: "img/collection/Avatar03.svg",
      name: "BeKind2Robots",
    },

    {
      title: "Cat from future",
      icon: "img/page/Avatar.svg",
      name: "Orbitian",
    },
    {
      title: "Psycho Dog",
      icon: "img/page/Avatar.svg",
      name: "Orbitian",
    },
    {
      title: "Designer Bear",
      icon: "img/page/Avatar.svg",
      name: "Orbitian",
    },
  ];

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function clearSearchList() {
    console.log("clearSearchList executed");
    searchList.innerHTML = "";
    searchList.style.backgroundColor = "";
    searchList.style.padding = "";
  }

  let isHiding = false;

  function hideSearchList() {
    if (isHiding) return;
    isHiding = true;

    const items = document.querySelectorAll(".search__item");

    if (items.length === 0) {
      clearSearchList();
      isHiding = false;
      return;
    }

    items.forEach((item) => {
      item.classList.remove("search__item--show");
      item.classList.add("search__item--hide");
    });

    setTimeout(() => {
      clearSearchList();
      isHiding = false;
    }, 400);
  }

  function searchNFT() {
    const searchInputValue = searchInput.value.trim().toLowerCase();

    if (searchInputValue === "") {
      hideSearchList();
      return;
    }

    const filteredNFT = searchNFTs.filter((nft) => {
      return (
        nft.title.toLowerCase().includes(searchInputValue) ||
        nft.name.toLowerCase().includes(searchInputValue)
      );
    });

    if (filteredNFT.length === 0) {
      searchList.innerHTML =
        "<li class='search__item-no'>No results found</li>";
      searchList.style.backgroundColor = "#2b2b2b";
      searchList.style.padding = "20px";

      return;
    } else {
      searchList.style.backgroundColor = "#3b3b3b";
      searchList.style.padding = "20px";
      searchList.style.borderRadius = "25px";
    }

    searchList.innerHTML = "";

    filteredNFT.forEach((nft, index) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const title = document.createElement("div");
      const name = document.createElement("div");
      const icon = document.createElement("img");

      item.classList.add("search__item", "search__item--hide");
      link.classList.add("search__link");
      title.classList.add("search__item-title");
      name.classList.add("search__name");

      link.href = "#";
      icon.src = nft.icon;
      icon.alt = nft.name;
      title.textContent = nft.title;
      name.textContent = nft.name;

      name.prepend(icon);
      link.appendChild(title);
      link.appendChild(name);
      item.appendChild(link);
      searchList.appendChild(item);

      setTimeout(() => {
        item.classList.remove("search__item--hide");
        item.classList.add("search__item--show");
      }, 10);
    });
  }

  const debouncedSearch = debounce(searchNFT, 300);
  searchInput.addEventListener("input", debouncedSearch);
  searchButton.addEventListener("click", searchNFT);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchNFT();
    }
  });

  document.addEventListener("click", (e) => {
    const isClickInsideInput = searchInput.contains(e.target);
    const isClickInsideList = searchList.contains(e.target);

    if (!isClickInsideInput && !isClickInsideList) {
      hideSearchList();
    }
  });
});

//Tabs

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".content");

const observerItems = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function observeVisibleItems() {
  observerItems.disconnect();

  const activeTab = document.querySelector(".content.active");
  const visibleItems = activeTab.querySelectorAll(".tabs__item");

  visibleItems.forEach((item, index) => {
    if (index >= 12) {
      item.classList.add("_hidden");
    } else {
      item.classList.remove("_hidden");
    }

    item.classList.remove("show");

    item.style.transitionDelay = `${index * 0.1}s`;
    observerItems.observe(item);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((button) => button.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");

    observeVisibleItems();
  });
});

window.addEventListener("DOMContentLoaded", () => {
  observeVisibleItems();
});
