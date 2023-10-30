 let inputBox = document.querySelector("#inputBox");
    let list = document.querySelector("#list");

    function loadFromLocalStorage() {
      const storedValues = localStorage.getItem('list');
      if (storedValues !== null) {
        const listArray = JSON.parse(storedValues);
        listArray.forEach(itemText => {
          createListItem(itemText);
        });
      }
    }

    function createListItem(text) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${text}
        <span>
          <i class="fa-solid fa-pen-to-square edit"></i>
          <i class="fa-solid fa-square-check check"></i>
          <i class="fa-solid fa-delete-left delete"></i>
        </span>
      `;
      list.appendChild(li);

      const editIcon = li.querySelector(".edit");
      editIcon.addEventListener("click", function () {
        const newText = prompt("Edit your task:", text);
        if (newText !== null && newText.trim() !== "") {
          li.firstChild.textContent = newText;
          updateLocalStorage();
        }
      });

      const checkIcon = li.querySelector(".check");
      checkIcon.addEventListener("click", function () {
        li.classList.toggle("checked");
        updateLocalStorage();
      });

      const deleteIcon = li.querySelector(".delete");
      deleteIcon.addEventListener("click", function () {
        li.remove();
        updateLocalStorage();
      });
    }

    function updateLocalStorage() {
      const items = Array.from(list.children).map(li => li.firstChild.textContent);
      localStorage.setItem('list', JSON.stringify(items));
    }

    inputBox.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        addItem();
        inputBox.value = "";
      }
    });

    function addItem() {
      let inputBoxValue = inputBox.value;
      createListItem(inputBoxValue);
      updateLocalStorage();
    }

    // Call the function to load from local storage when the page loads
    loadFromLocalStorage();