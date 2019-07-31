const countriesURL = "http://localhost:3000/countries";
const userURL = "http://localhost:3000/users";
const tripsURL = "http://localhost:3000/trips";
let currentUser;

let activeDropdown = {};
document.getElementById("countries").addEventListener("click", function() {
  if (activeDropdown.id && activeDropdown.id !== event.target.id) {
    // activeDropdown.element.style.visibility = "hidden"
  }
  if (event.target.tagName === "li") {
    activeDropdown.button.innerHTML = event.target.innerHTML;
  }
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].classList.contains("dropdown-selection")) {
      activeDropdown.id = this.id;
      activeDropdown.element = this.children[i];
    } else if (this.children[i].classList.contains("dropdown-button")) {
      activeDropdown.button = this.children[i];
    }
  }
});

main();

function main() {
  loginPrompt();
}

function loginPrompt() {
  const form = document.createElement("form");
  const main = document.getElementById("main");

  const p = document.createElement("p");
  p.innerText = "Please login to continue!";
  p.setAttribute("id", "login");
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
  let p = document.getElementById("login");
  p.setAttribute("hidden", "hidden");
  p.style.display = "none";
  form.setAttribute("hidden", "hidden");
  let userName = user.name;
  let userPic = user.avatar;
  let h1 = document.querySelector("h1");
  const main = document.getElementById("main");
  h1.innerText = "Where to " + userName + "?";
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
    let europeDiv = document.getElementById("europe");
    europeDiv.innerText = "Europe";
    let ul = document.getElementById("europe2");
    let li = document.createElement("li");
    li.innerText = country.name;
    li.addEventListener("click", function(e) {
      e.preventDefault();
      openNav(e, country);
  });
    ul.appendChild(li);
  });

  asia.forEach(function(country) {
    let asiaDiv = document.getElementById("asia");
    asiaDiv.innerText = "Asia";
    let ul2 = document.getElementById("asia2");
    let li = document.createElement("li");
    li.innerText = country.name;
    li.addEventListener("click", function(e) {
      e.preventDefault();
      openNav(e, country);
  });
    ul2.appendChild(li);
  });

  document.getElementById("countries").addEventListener("click", function() {
    console.log("click");
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].classList.contains("hidden")) {
        this.children[1].classList.add("visible");
        this.children[1].classList.remove("hidden");
      } else if (this.children[i].classList.contains("visible")) {
        this.children[1].classList.add("hidden");
        this.children[1].classList.remove("visible");
      }
    }
  });

  document.getElementById("countries2").addEventListener("click", function() {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].classList.contains("hidden")) {
        this.children[1].classList.add("visible");
        this.children[1].classList.remove("hidden");
      } else if (this.children[i].classList.contains("visible")) {
        this.children[1].classList.add("hidden");
        this.children[1].classList.remove("visible");
      }
    }
  });
}
// -------------------open/close nav -------------------------
function openNav(e, country) {
  showCountry(country)
  document.getElementById("myNav").style.width = "100%" ;
  // page.style.width = 100%
}

function closeNav() {
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

function openTab(tabName, elmnt, color) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(tabName).style.display = "block";

  elmnt.style.backgroundColor = color;
}

document.getElementById("defaultOpen").click();
