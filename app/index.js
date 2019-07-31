const countriesURL = "http://localhost:3000/countries";
const userURL = "http://localhost:3000/users";

// let northMenu = document.getElementById("North-America")
// northMenu.setAttribute("hidden", "hidden")
//
// let southMenu = document.getElementById("South-America")
// southMenu.setAttribute("hidden", "hidden")
//
// let oceaniaMenu = document.getElementById("Oceania")
// oceaniaMenu.setAttribute("hidden", "hidden")
//
// let africaMenu = document.getElementById("Africa")
// // africaMenu.setAttribute("hidden", "")
//
// let asiaMenu = document.getElementById("Asia")
// asiaMenu.style.display === ('none')
//
// let europeMenu = document.getElementById("Europe")
// europeMenu.style.display === ('none')

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
  const main = document.getElementById("main");
  let toggleButton = document.createElement("button");
  toggleButton.innerText = "Toggle";
  main.appendChild(toggleButton);
  toggleButton.addEventListener("click", function(e) {
    toggleDisplay(e.target);
  });
  toggleButton.addEventListener("mouseover", function(e) {
    toggleDisplay2(e.target);
  });

  let asiaSelect = document.createElement("select");
  asiaSelect.setAttribute("id", "Asia");

  let europeSelect = document.createElement("select");
  europeSelect.setAttribute("id", "Europe");

  main.appendChild(asiaSelect);
  main.appendChild(europeSelect);

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

  asia.forEach(function(country) {
    let option = document.createElement("option");
    option.setAttribute("id", "opt" + country.id);
    option.setAttribute("value", country.name)
    option.innerText = country.name;
    asiaSelect.appendChild(option);

    });
    asiaSelect.addEventListener("onselect", function(e) {
      console.log("clicked")
      openNav(e, country);

    console.log(option);
  });

  europe.forEach(function(country) {
    let option = document.createElement("option");
    option.innerText = country.name;
    europeSelect.appendChild(option);
    console.log(option);
  });

  norAmer.forEach(function(country) {
    let option = document.createElement("option");
    option.innerText = country.name;
    northMenu.appendChild(option);
    console.log(option);
  });

  soAmer.forEach(function(country) {
    let option = document.createElement("option");
    option.innerText = country.name;
    southMenu.appendChild(option);
    console.log(option);
  });

  oceania.forEach(function(country) {
    let option = document.createElement("option");
    option.innerText = country.name;
    oceaniaMenu.appendChild(option);
    console.log(option);
  });

  africa.forEach(function(country) {
    let option = document.createElement("option");
    option.innerText = country.name;
    africaMenu.appendChild(option);
    console.log(option);
  });
}

function toggleDisplay(target) {
  let dropdown = document.getElementById("Asia");
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

function toggleDisplay2(target) {
  let dropdown = document.getElementById("Europe");
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

// -------------------open/close nav -------------------------
function openNav(e, country) {
  document.getElementById("myNav").style.width = 100 % showCountry(country);
  // page.style.width = 100%
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
// -------------------------------------------------------

function showCountry(country) {
  const page = document.querySelector(".overlay-content");
  const name = document.createElement("name");
  name.innerText = country.name;
  page.appendChild(name);
}
