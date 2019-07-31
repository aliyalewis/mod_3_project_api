const countriesURL = "http://localhost:3000/countries";
const userURL = "http://localhost:3000/users";
const tripsURL = "http://localhost:3000/trips";
let currentUser;

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
  currentUser = user;
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
  // let toggleButton = document.createElement("button");
  // toggleButton.innerText = "Toggle";
  // main.appendChild(toggleButton);
  // toggleButton.addEventListener("click", function(e) {
  //   toggleDisplay(e.target);
  // });
  // toggleButton.addEventListener("mouseover", function(e) {
  //   toggleDisplay2(e.target);
  // });

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

    let showButton = document.createElement("button");
    showButton.innerText = country.name;
    showButton.addEventListener("click", function(e) {
      e.preventDefault();
      openNav(e, country);
  });
  main.appendChild(showButton)

    });
    // asiaSelect.addEventListener("onselect", function(e) {
      // openNav(e, country);
  // });

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
  showCountry(country);
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  let page = document.querySelector(".overlay-content");
  let addButton = document.querySelector(".add");
  addButton.parentNode.removeChild(addButton);
  document.getElementById("myNav").style.width = "0%";

}
// -------------------------------------------------------

function showCountry(country) {
  let page = document.querySelector(".overlay-content");
  page.id = "page" + country.id
  const h2 = document.getElementById("name");
  h2.innerText = country.name;
  const description = document.getElementById("description");
  description.innerText = country.description;
  let addButton = document.createElement("button");
  addButton.className = "add"
  addButton.id = "add" + country.id;
  addButton.innerText = "Add To My Bucket List!";
    addButton.addEventListener("click", function _listener(e) {
     addCountry(e, country)
     addButton.innerText = "Trip Added!"
     addButton.removeEventListener("click", _listener)

    });
  page.appendChild(addButton);
}

function addCountry(e, country) {
  console.log(e, `added ${country.id}`)
  // fetch(tripsURL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     'Accept': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     name: country.name,
  //     status: "BL",
  //     user_id: currentUser.id,
  //     country_id: country.id,
  //   })
  // }).then(resp => resp.json())
  // .then(data => console.log(data))
}
