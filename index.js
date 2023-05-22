// Selectors
const listInput = document.querySelector(".list-input");
const listButton = document.querySelector(".list-button");
const shoppingList = document.querySelector(".shopping-list");
const filterOption = document.querySelector(".filter-list");

// Event Listeners
listButton.addEventListener("click", addItem);
shoppingList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterList);

// Functions
function addItem(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Shopping list div
  const listDiv = document.createElement("div");
  listDiv.classList.add("list");
  // Create li
  const newItem = document.createElement("li");
  newItem.innerText = listInput.value;
  newItem.classList.add("shopping-item");
  listDiv.appendChild(newItem);
  // Add list to local storage
  /* saveLocalList(listInput.value); */
  // Check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-button");
  listDiv.appendChild(completedButton);
  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  trashButton.classList.add("trash-button");
  listDiv.appendChild(trashButton);
  // Append to list
  shoppingList.appendChild(listDiv);
  // Clear input value
  listInput.value = "";
}

function deleteItem(e) {
  const item = e.target;
  // Delete item
  if (item.classList[0] === "trash-button") {
    const list = item.parentElement;
    // Animation
    list.classList.add("fall");
    list.addEventListener("transitionend", function () {
      list.remove();
    });
  }

  // Checkmark item
  if (item.classList[0] === "complete-button") {
    const list = item.parentElement;
    list.classList.toggle("completed");
  }
}

function filterList(e) {
  const lists = shoppingList.childNodes;
  lists.forEach(function (list) {
    switch (e.target.value) {
      case "all":
        list.style.display = "flex";
        break;
      case "completed":
        if (list.classList.contains("completed")) {
          list.style.display = "flex";
        } else {
          list.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!list.classList.contains("completed")) {
          list.style.display = "flex";
        } else {
          list.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalList(list) {
  // Check - Already have?
  let lists;
  if (localStorage.getItem("lists") === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
  }
  lists.push(list);
  localStorage.setItem("lists", JSON.stringify(lists));
}
