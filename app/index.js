const countriesURL = "http://localhost:3000/countries";
const userURL = "http://localhost:3000/users";

let activeDropdown = {};
document.getElementById("countries").addEventListener("click", function() {
  if (activeDropdown.id && activeDropdown.id !== event.target.id) {
    activeDropdown.element.style.visibility = "hidden";
  }
  if (event.target.tagName === "li") {
    activeDropdown.button.innerHTML = event.target.innerHTML;
  }
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].classList.contains("dropdown-selection")) {
      activeDropdown.id = this.id;
      activeDropdown.element = this.children[i];
      this.children[i].style.visibility = "visible";
    } else if (this.children[i].classList.contains("dropdown-button")) {
      activeDropdown.button = this.children[i];
    }
  }
});

window.onclick = function(event) {
  if (!event.target.classList.contains("dropdown-button")) {
    activeDropdown.element.style.visibility = "hidden";
  }
};

main();

function main() {
  loginPrompt();
}

function loginPrompt() {
  const form = document.createElement("form");
  const main = document.getElementById("main");

  const p = document.createElement("p");
  p.innerText = "Please login to continue!";
  main.appendChild(p);
  main.appendChild(form);

  const input = document.createElement("input");
  form.appendChild(input);
  input.setAttribute("class", "input-text");
  input.setAttribute("value", "");

  const login = document.createElement("input");
  login.setAttribute("type", "submit");
  login.setAttribute("value", "Login");
  login.setAttribute("class", "submit");
  form.appendChild(login);

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    fetchUser(e);
  });
}

function fetchUser(e) {
  let username = e.target[0].value;

  fetch(userURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: username
    })
  })
    .then(res => res.json())
    .then(json => {
      renderUser(json);
    });
}

function renderUser(user) {
  let form = document.querySelector("form");
  let p = document.querySelector("p");
  p.setAttribute("hidden", "hidden");
  form.setAttribute("hidden", "hidden");
  let userName = user.name;
  let userPic = user.avatar;
  let h1 = document.querySelector("h1");
  const main = document.getElementById("main");
  h1.innerText = "Hi, " + userName;
  fetchCountries();
}

function fetchCountries() {
  fetch(countriesURL)
    .then(res => res.json())
    .then(json => {
      showCountries(json);
    });
}

function showCountries(countries) {
  let asia = [];
  let europe = [];
  let norAmer = [];
  let soAmer = [];
  let oceania = [];
  let africa = [];

  countries.forEach(function(country) {
    switch (country.location) {
      case "Asia":
        asia.push(country);
        break;
      case "Europe":
        europe.push(country);
        break;
      case "North America":
        norAmer.push(country);
        break;
      case "South America":
        soAmer.push(country);
        break;
      case "Oceania":
        oceania.push(country);
        break;
      case "Africa":
        africa.push(country);
        break;
    }
  });

  europe.forEach(function(country) {
    let europeDiv = document.querySelector(".dropdown-button");
    europeDiv.innerText = "Europe";
    let ul = document.querySelector(".dropdown-selection");
    let li = document.createElement("li");
    li.innerText = country.name;
    ul.appendChild(li);
  });

  asia.forEach(function(country) {
    let asiaDiv = document.getElementById("asia");

    console.log(asiaDiv, "Asia");
    asiaDiv.innerText = "Asia";
    let ul2 = document.getElementById("asia2");
    let li = document.createElement("li");
    li.innerText = country.name;
    ul2.appendChild(li);
  });

  document.getElementById("countries2").addEventListener("click", function() {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].classList.contains("dropdown-selection")) {
        this.children[i].style.visibility = "visible";
      }
    }
  });

  document.getElementById("countries").addEventListener("click", function() {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].classList.contains("dropdown-selection")) {
        this.children[i].style.visibility = "visible";
      }
    }
  });
}
// // -------------------open/close nav -------------------------
// function openNav(e, country) {
//   document.getElementById("myNav").style.width = 100 % showCountry(country);
//   // page.style.width = 100%
// }
//
// function closeNav() {
//   document.getElementById("myNav").style.width = "0%";
// }
// // -------------------------------------------------------
//
// function showCountry(country) {
//   const page = document.querySelector(".overlay-content");
//   const name = document.createElement("name");
//   name.innerText = country.name;
//   page.appendChild(name);
// }
