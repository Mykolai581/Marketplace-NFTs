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

//Tabs

const tabsItems = document.querySelector(".tabs__items");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".content");

const btnToDay = document.querySelector(".btn-today");
const btnWeek = document.querySelector(".btn-week");
const btnMonth = document.querySelector(".btn-month");
const btnTime = document.querySelector(".btn-time");

const contentToday = document.querySelector(".content-today");
const contentWeek = document.querySelector(".content-week");
const contentMonth = document.querySelector(".content-month");
const contentTime = document.querySelector(".content-time");

const topCreators = [
  {
    number: "1",
    url: "img/top-creators/Avatar01.svg",
    name: "Marcus Saris",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: true,
    allTime: true,
  },
  {
    number: "2",
    url: "img/top-creators/Avatar02.svg",
    name: "Ruben Carder",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: true,
  },
  {
    number: "3",
    url: "img/top-creators/Avatar03.svg",
    name: "Alfredo Septimus",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: true,
  },

  {
    number: "4",
    url: "img/top-creators/Avatar04.svg",
    name: "Davis Franci",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: false,
  },
  {
    number: "5",
    url: "img/top-creators/Avatar05.svg",
    name: "Livia Rosser",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: true,
  },

  {
    number: "6",
    url: "img/top-creators/Avatar06.svg",
    name: "Kianna Donin",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: false,
  },
  {
    number: "7",
    url: "img/top-creators/Avatar07.svg",
    name: "Phillip Lipshutz",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: false,
  },
  {
    number: "8",
    url: "img/top-creators/Avatar08.svg",
    name: "Maria Rosser",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: false,
  },
  {
    number: "9",
    url: "img/top-creators/Avatar09.svg",
    name: "Kianna Stanton",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: true,
    allTime: false,
  },
  {
    number: "10",
    url: "img/top-creators/Avatar10.svg",
    name: "Angel Lubin",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: false,
  },
  {
    number: "11",
    url: "img/top-creators/Avatar11.svg",
    name: "Allison Torff",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: true,
    allTime: false,
  },
  {
    number: "12",
    url: "img/top-creators/Avatar12.svg",
    name: "Davis Workman",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: true,
    allTime: false,
  },

  {
    number: "13",
    url: "img/top-creators/Avatar13.svg",
    name: "Lindsey Lipshutz",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: false,
  },
  {
    number: "14",
    url: "img/top-creators/Avatar14.svg",
    name: "Randy Carder",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: true,
    allTime: true,
  },
  {
    number: "15",
    url: "img/top-creators/Avatar15.svg",
    name: "Lydia Culhane",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: false,
  },
  {
    number: "16",
    url: "img/top-creators/Avatar16.svg",
    name: "Rayna Bator",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: true,
  },
  {
    number: "17",
    url: "img/top-creators/Avatar17.svg",
    name: "Jocelyn Westervelt",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: false,
  },
  {
    number: "18",
    url: "img/top-creators/Avatar01.svg",
    name: "Marilyn Torff",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: false,
    month: true,
    allTime: true,
  },
  {
    number: "19",
    url: "img/top-creators/Avatar19.svg",
    name: "Skylar Levin",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: true,
  },
  {
    number: "20",
    url: "img/top-creators/Avatar03.svg",
    name: "Terry Dorwart",
    change: "-1.41%",
    sold: "662",
    volume: "12.4 ETH",
    today: true,
    week: true,
    month: false,
    allTime: true,
  },
];

function renderCreators(list, container) {
  container.innerHTML = "";

  list.forEach((creator) => {
    const itemCreators = document.createElement("a");
    const itemInfo = document.createElement("div");
    const itemNumber = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemName = document.createElement("div");
    const itemContent = document.createElement("div");
    const itemChange = document.createElement("div");
    const itemSold = document.createElement("div");
    const itemVolume = document.createElement("div");

    itemCreators.classList.add("tabs__item-link", "item-tabs");
    itemInfo.classList.add("item-tabs__info");
    itemNumber.classList.add("item-tabs__number");
    itemImg.classList.add("item-tabs__avatar");
    itemName.classList.add("item-tabs__name");
    itemContent.classList.add("item-tabs__content");
    itemChange.classList.add("item-tabs__change");
    itemSold.classList.add("item-tabs__solid");
    itemVolume.classList.add("item-tabs__volume");

    itemCreators.href = "#";

    itemNumber.textContent = creator.number;
    itemImg.src = creator.url;
    itemName.textContent = creator.name;
    itemChange.textContent = creator.change;
    itemSold.textContent = creator.sold;
    itemVolume.textContent = creator.volume;

    itemInfo.appendChild(itemNumber);
    itemInfo.appendChild(itemImg);
    itemInfo.appendChild(itemName);
    itemContent.appendChild(itemChange);
    itemContent.appendChild(itemSold);
    itemContent.appendChild(itemVolume);
    itemCreators.appendChild(itemInfo);
    itemCreators.appendChild(itemContent);

    container.appendChild(itemCreators);
  });
}

function activateTab(id) {
  tabButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.dataset.tab === id) {
      button.classList.add("active");
    }
  });

  tabContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === id) {
      content.classList.add("active");
    }
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((button) => button.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

btnToDay.addEventListener("click", () => {
  renderCreators(
    topCreators.filter((c) => c.today),
    contentToday
  );
  activateTab("tab1");
});

btnWeek.addEventListener("click", () => {
  renderCreators(
    topCreators.filter((c) => c.week),
    contentWeek
  );
  activateTab("tab2");
});

btnMonth.addEventListener("click", () => {
  renderCreators(
    topCreators.filter((c) => c.month),
    contentMonth
  );
  activateTab("tab3");
});

btnTime.addEventListener("click", () => {
  renderCreators(
    topCreators.filter((c) => c.allTime),
    contentTime
  );
  activateTab("tab4");
});

function updateButtonText() {
  if (window.innerWidth < 655) {
    btnToDay.textContent = "1d";
    btnWeek.textContent = "7d";
    btnMonth.textContent = "30d";
  } else {
    btnToDay.textContent = "Today";
    btnWeek.textContent = "This Week";
    btnMonth.textContent = "This Month";
  }
}

window.addEventListener("resize", updateButtonText);
window.addEventListener("DOMContentLoaded", () => {
  renderCreators(
    topCreators.filter((c) => c.today),
    contentToday
  );
  activateTab("tab1");

  updateButtonText();
});
