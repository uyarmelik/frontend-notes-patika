fetchData();

function fetchData() {
  const arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (arrayData) {
    writeData(arrayData);
  } else {
    const arrayData = [
      ["3 Litre Su İç", ""],
      ["Ödevleri Yap", ""],
      ["En Az 3 Saat Kodlama Yap", ""],
      ["Yemek Yap", ""],
      ["50 Sayfa Kitap Oku", ""],
    ];
    const arrayDataJSON = JSON.stringify(arrayData);
    localStorage.setItem("arrayData", arrayDataJSON);
    writeData(arrayData);
  }
}

function newElement() {
  const taskDOM = document.getElementById("task");
  const taskValue = taskDOM.value;
  taskDOM.value = "";
  if (taskValue === "") {
    $("#addAlert").toast("hide");
    $("#emptyAlert").toast("show");
  } else {
    $("#emptyAlert").toast("hide");
    $("#addAlert").toast("show");
    addItem(taskValue);

    const arrayData = JSON.parse(localStorage.getItem("arrayData"));
    arrayData.push([taskValue, ""]);
    const arrayDataJSON = JSON.stringify(arrayData);
    localStorage.setItem("arrayData", arrayDataJSON);
  }
}

function checkItem(icon) {
  var liElement = icon.closest("li");
  if (liElement) {
    let checkedItem = liElement.textContent.trim();
    const arrayData = JSON.parse(localStorage.getItem("arrayData"));

    for (var i = 0; i < arrayData.length; i++) {
      var temp = arrayData[i];

      if (temp[0] === checkedItem) {
        if (temp[1] === "") {
          temp[1] = "isChecked";
          const arrayDataJSON = JSON.stringify(arrayData);
          localStorage.setItem("arrayData", arrayDataJSON);
          icon.style.opacity = 0.5;
          liElement.style.backgroundColor = "#b9e49e";
          var textElement = liElement.querySelector("div");
          textElement.style.textDecoration = "line-through";
          textElement.style.opacity = 0.5;
        } else if (temp[1] === "isChecked") {
          temp[1] = "";
          const arrayDataJSON = JSON.stringify(arrayData);
          localStorage.setItem("arrayData", arrayDataJSON);
          icon.style.opacity = "";
          liElement.style.backgroundColor = "";
          var textElement = liElement.querySelector("div");
          textElement.style.textDecoration = "";
          textElement.style.opacity = "";
        }
      }
    }
  }
}

function deleteItem(icon) {
  var liElement = icon.closest("li");
  if (liElement) {
    liElement.remove();

    let deletedItem = liElement.textContent.trim();
    const arrayData = JSON.parse(localStorage.getItem("arrayData"));

    for (var i = 0; i < arrayData.length; i++) {
      var temp = arrayData[i];

      if (temp[0] === deletedItem) {
        arrayData.splice(i, 1);
      }
    }

    const arrayDataJSON = JSON.stringify(arrayData);
    localStorage.setItem("arrayData", arrayDataJSON);
  }
}

function addItem(stringData) {
  let newItem = document.createElement("li");
  newItem.className = "flex-container";

  let divText = document.createElement("div");
  divText.textContent = stringData;

  let divIcons = document.createElement("div");
  divIcons.innerHTML = `
      <i class="fa-sharp fa-regular fa-check" onclick="checkItem(this)"></i>
      <i class="fa-sharp fa-regular fa-xmark" onclick="deleteItem(this)"></i>
      `;

  newItem.appendChild(divText);
  newItem.appendChild(divIcons);

  let list = document.getElementById("list");
  list.appendChild(newItem);
}

function checkedItem(stringData) {
  let newItem = document.createElement("li");
  newItem.className = "flex-container";
  newItem.style.backgroundColor = "#b9e49e";

  let divText = document.createElement("div");
  divText.textContent = stringData;
  divText.style.textDecoration = "line-through";
  divText.style.opacity = 0.5;

  let divIcons = document.createElement("div");
  divIcons.innerHTML = `
      <i class="fa-sharp fa-regular fa-check" onclick="checkItem(this)" style="opacity: 0.5;"></i>
      <i class="fa-sharp fa-regular fa-xmark" onclick="deleteItem(this)"></i>
      `;

  newItem.appendChild(divText);
  newItem.appendChild(divIcons);

  let list = document.getElementById("list");
  list.appendChild(newItem);
}

function writeData(arrayData) {
  arrayData.forEach(function (data) {
    if (data[1] === "") {
      addItem(data[0]);
    } else {
      checkedItem(data[0]);
    }
  });
}
