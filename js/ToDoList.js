// Function to load items from localStorage when the page loads
window.onload = function () {
    loadItems();
};

function loadItems() {
    const list = document.getElementById("list_item");
    const items = JSON.parse(localStorage.getItem("todoItems")) || [];

    items.forEach(function (text) {
        createListItem(text);
    });
}

function saveItems() {
    const listItems = document.querySelectorAll("#list_item li");
    const items = Array.from(listItems).map(li => li.textContent);
    localStorage.setItem("todoItems", JSON.stringify(items));
}

function createListItem(text) {
    const list_item = document.getElementById("list_item");
    const make_li = document.createElement("li");
    make_li.appendChild(document.createTextNode(text));
    
    make_li.onclick = function () {
        this.parentNode.removeChild(this);
        saveItems(); // update storage when item is removed
    };

    list_item.appendChild(make_li);
}

function addItem() {
    const item = document.getElementById("box");
    const text = item.value.trim();

    if (text !== "") {
        createListItem(text);
        saveItems(); // update storage when item is added
        item.value = "";
    } else {
        alert("Invalid input");
    }
}

document.addEventListener('keydown', (event) => {
    console.log(`Key pressed down: ${event.key}`);
    if (event.key === 'Enter') {
        addItem();
    }
});