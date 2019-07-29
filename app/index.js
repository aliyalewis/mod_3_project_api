const countriesAPI = "https://restcountries.eu/rest/v2/all";
const userURL = "http://localhost:3000/users";

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
  // fetch(userURL)
  //   .then(res => res.json())
  //   .then(json => {
  //     renderUser(username);
  //   });

  fetch(userURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: username
    })
  }).then(res => res.json())
    .then(json => {
      renderUser(json)
    })

}

function renderUser(user) {
  let form = document.querySelector("form")
  let p = document.querySelector("p")
  p.setAttribute("hidden", "hidden")
  form.setAttribute("hidden", "hidden")
  let userName = user.name
  let userPic = user.avatar
  const div = document.createElement('div')
  const main = document.getElementById('main')
  div.innerText = "Hi, " + userName
  main.appendChild(div)
}
