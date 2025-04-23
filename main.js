const card = document.querySelector(".card");
const userInput = document.querySelector("#username");
const tableRows = document.querySelectorAll("tr");
const imgElmnt = document.querySelector(".githubImage");

const msgDiv = document.createElement("div");
msgDiv.style.textAlign = "center";
msgDiv.style.padding = "1rem";
msgDiv.style.color = "red";
msgDiv.style.backgroundColor = "#333";


function fetchData(username, callback) {
  const requestUrl = `https://api.github.com/users/${username}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", requestUrl);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (card.contains(msgDiv)) {
        card.removeChild(msgDiv);
      }
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        console.log(data)
        const userData = [
          data.name || data.login,
          data.public_repos,
          data.followers,
          data.avatar_url
        ];
        callback(userData); // Pass data to updateTable
      } else if (this.status === 404) {
        msgDiv.innerHTML = "<strong>User not found!</strong>";
        card.appendChild(msgDiv);
      } else {
        console.log()
        msgDiv.innerHTML =
          `<strong>Something went wrong. Please try again.</strong> <br> Status Code : ${this.status}`;
        card.appendChild(msgDiv);
      }
    }
  };
  xhr.send();
}

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const username = e.target.value;
    fetchData(username, updateTable);
  }
});

function updateTable(userData) {
  tableRows.forEach((row, index) => {
    row.cells[1].innerText = userData[index];
  });
  imgElmnt.hidden = false;
  imgElmnt.setAttribute('src',userData[3]);
}
