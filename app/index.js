const countriesURL = "http://localhost:3000/countries";
const userURL = "http://localhost:3000/users";
const tripsURL = "http://localhost:3000/trips";
let currentUser;

main();

function main() {
  loginPrompt();
}


// --------------------------Logging In -------------------------------
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

  }).then(res => res.json()).then(json => renderUser(json));
}

function renderUser(user) {
  currentUser = user;
  let header = document.querySelector(".header_div")
  header.style.visibility = "visible";
  let dropdowns = document.getElementsByClassName("dropdown")
    for (let item of dropdowns) {
      item.style.visibility = "visible";
    }

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
// -----------------------------------------------------------



// ----------------------Fetch and Display Countries -----------------
function fetchCountries() {
  let activeDropdown = {};
  document.getElementById("countries").addEventListener("click", function() {
    if (activeDropdown.id && activeDropdown.id !== event.target.id) {
      activeDropdown.element.style.visibility = "hidden"
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
  fetch(countriesURL)
    .then(res => res.json())
    .then(json => {
      showCountries(json);
    });
} // end of fetchCountries


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

// ========Event Listeners for Dropdowns (Using hover in CSS instead)================
  // document.getElementById("countries").addEventListener("mouseover", function openDropDown(e) {
  //   e.preventDefault();
  //   for (let i = 0; i < this.children.length; i++) {
  //     if (this.children[i].classList.contains("hidden")) {
  //       this.children[1].classList.add("visible");
  //       this.children[1].classList.remove("hidden");
  //     } else if (this.children[i].classList.contains("visible")) {
  //       this.children[1].classList.add("hidden");
  //       this.children[1].classList.remove("visible");
  //     }
  //   }
  // })
  // document.getElementById("countries2").addEventListener("mouseover", function openDropDown(e) {
  //   e.preventDefault();
  //   for (let i = 0; i < this.children.length; i++) {
  //     if (this.children[i].classList.contains("hidden")) {
  //       this.children[1].classList.add("visible");
  //       this.children[1].classList.remove("hidden");
  //     } else if (this.children[i].classList.contains("visible")) {
  //       this.children[1].classList.add("hidden");
  //       this.children[1].classList.remove("visible");
  //     }
  //   }
  // })
  // ================================
};  // end of showCountries function
// -------------------------------------------------------




// ---------------Toggle functions ---------------------------
// function toggleDisplay(target) {
//   let dropdown = document.getElementById("Asia");
//   if (dropdown.style.display === "none") {
//     dropdown.style.display = "block";
//   } else {
//     dropdown.style.display = "none";
//   }
// }
//
// function toggleDisplay2(target) {
//   let dropdown = document.getElementById("Europe");
//   if (dropdown.style.display === "none") {
//     dropdown.style.display = "block";
//   } else {
//     dropdown.style.display = "none";
//   }
// }
// -------------------------------------------------------



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



// ------------------Country Show Page --------------------------

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



// ----------------------Add Trip to Bucket List ------------------------

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
// -------------------------------------------------------------


// -----------------------View User Page -----------------------
function displayUser() {
  console.log("linkeduser")
}

// ------------------------------------------------------------

// -----------------------View BUCKET LIST Page -----------------------
function displayBL() {
  console.log("linked BL")
}

// ------------------------------------------------------------

// -----------------------View TRAVEL LOG Page -----------------------
function displayTL() {
  console.log("linked TL")
}

// ------------------------------------------------------------



// ----------------------Switch BL Item to Travel Log -----------


// -------------------------------------------------------------



// ---------------------Leave Like & Comments ------------


// --------------------------------------------------------------

