const countriesURL = "http://localhost:3000/countries";
const userURL = "http://localhost:3000/users";
let tripsURL = "http://localhost:3000/trips";
let currentUser;
let allCountries;
let myTrips = [];
let currentReviews = [];


main();

function main() {
  loginPrompt();
};


// --------------------------Logging In -------------------------------
function loginPrompt() {

  const form = document.createElement("form");
  form.setAttribute('id', 'loginForm')
  const main = document.getElementById("h1");


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
};

function fetchUser(e) {
  let form = document.getElementById("loginForm");
  let p = document.getElementById("login");
  p.parentNode.removeChild(p)
  form.parentNode.removeChild(form)
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

}
// ------------------------------------------------------------


// -----------------------View Resources Page -----------------------
function displayResources() {
  let div = document.getElementById("resources");
  div.style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("bucketlist").style.display = "none";
  document.getElementById("travellog").style.display = "none";
  console.log("linked Resources")
}
// ------------------------------------------------------------


// -----------------------View BUCKET LIST Page -----------------------
function displayBL(list) {
  let filteredList = list.filter(ele => ((ele.user_id === currentUser.id) && (ele.status === "BL")))
  let div = document.getElementById("bucketlist");
  div.style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("travellog").style.display = "none";
  document.getElementById("resources").style.display = "none";
  let ul = document.getElementById("blist")
  ul.innerHTML = "";
  filteredList.forEach(function(trip) {
      let li = document.createElement("li");
      let p = document.createElement("p");
      let country = getCountry(trip)
      p.innerText=trip.name
      p.onclick = function(e) {
        e.preventDefault();
        openNav(country[0])
      };
      let switchButton = document.createElement('button');
        switchButton.innerText = "Send to Travel Log";
        switchButton.addEventListener('click', function switchIt(e) {
          switchTrip(trip);
          li.innerHTML = "<p>Congrats! This trip is now in your Travel Log!</p>"
          setTimeout(removeLi(li), 3000);
          switchButton.removeEventListener('click', switchIt)
        });
      let removeButton = document.createElement('button');
        removeButton.innerText = "Remove From List";
        removeButton.addEventListener('click', function remove(e) {
          removeTrip(trip);
          li.innerHTML = "<p>This trip has been removed!</p>"
          setTimeout(removeLi(li), 3000);
          removeButton.removeEventListener('click', remove)
          // removeButton.parentNode.removeChild(removeButton);
        });
      li.appendChild(p);
      li.appendChild(switchButton);
      li.appendChild(removeButton);
      ul.appendChild(li);
  })
}
// ------------------------------------------------------------

// -----------------------View TRAVEL LOG Page -----------------------
function displayTL(list) {

  // myTrips = [];
  // let newList = list.filter(ele => ele.user_id === currentUser.id && ele.status === "TL")
  let filteredList = list.filter(ele => ((ele.user_id === currentUser.id) && (ele.status === "TL")))
  let div = document.getElementById("travellog")
  div.style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("bucketlist").style.display = "none";
  document.getElementById("resources").style.display = "none";
  let ul = document.getElementById("tlist")
  ul.innerHTML = "";
   filteredList.forEach(function(trip) {
    if(trip.user_id === currentUser.id && trip.status === "TL") {
    let li = document.createElement("li");
    let p = document.createElement('p');
    // li.innerText = trip.name;
    let country = getCountry(trip)
    p.innerText = trip.name
    p.onclick = function(e) {
      e.preventDefault();
      openNav(country[0])
    };
    let switchButton = document.createElement('button');
      switchButton.innerText = "Return to Bucket List";
      switchButton.addEventListener('click', function switchItAgain(e) {
        switchTrip(trip);
        li.innerHTML = "<p>Trip returned to Bucket List.</p>"
        setTimeout(removeLi(li), 3000);
        switchButton.removeEventListener('click', switchItAgain)
      });
    let removeButton = document.createElement('button');
      removeButton.innerText = "Remove From List";
      removeButton.addEventListener('click', function remove(e) {
        removeTrip(trip);
        li.innerHTML = "<p>This trip has been removed!</p>"
        setTimeout(removeLi(li), 3000);
        removeButton.removeEventListener('click', remove)
      });
      let revButton = document.createElement('button')
      revButton.innerText = "Leave Review"
      revButton.addEventListener('click', function(e){
        e.preventDefault();
        let form = document.querySelector('#form2')
        form.style.visibility = "visible"
        console.log(form)
        form.addEventListener("submit", function leaveReview(e) {
          e.preventDefault();
          let review = e.target[0].value
          form.style.visibility = "hidden";
          updateTrip(trip, review)
          showCountry(country)
          form.removeEventListener("submit", leaveReview)
        })
      })
    li.appendChild(p);
    li.appendChild(switchButton);
    li.appendChild(removeButton);
    li.appendChild(revButton);
    ul.appendChild(li);
    }
  })
}
// ------------------------------------------------------------
 function fetchTrips(status) {
   fetch(tripsURL).then(resp => resp.json()).then(data => callDisplay(status, data))
 }

 function callDisplay(status, data) {
   if(status === "TL") {
     displayTL(data)
   } else {
     displayBL(data)
   }
 }


 function getCountry(trip) {
   return allCountries.filter(country => (country.id === trip.country_id))
 }

function getReviews(country) {
  console.log(country)
  fetch(countriesURL + "/" + country.id + "/rev").then(resp => resp.json())
  .then(data => currentReviews.push(data))
  return currentReviews
}

// function setReviews(data) {
//   ;
// }
// ----------------------Switch BL Item to Travel Log -----------

function switchTrip(trip) {
  let newStatus;
  let url = tripsURL + "/" + trip.id
  if(trip.status === "BL") {newStatus = "TL"}
  else if(trip.status === "TL") {newStatus = "BL"}
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      status: newStatus
    })
  }).then(resp => resp.json()).then(data => console.log(data))
}

// -------------------------------------------------------------


// ----------------------Remove Trip -----------------------

function removeLi(li) {
  li.parentNode.removeChild(li)
}

function removeTrip(trip) {
  console.log("REmove")
  fetch((tripsURL + "/" + trip.id), {
    method: 'DELETE'
    })
    // .then(resp => resp.json()).then(data => console.log(data))
  };

// ---------------------------------------------------------


// ---------------------Leave Like & Comments ------------

function updateTrip(trip, newReview) {
  console.log(trip)
  let newLikes = trip.likes += 1
  fetch(tripsURL + "/" +  trip.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes,
      review: newReview
    })
  })
}

// --------------------------------------------------------------

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

