import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-45940-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


let shoppingListEl = document.querySelector("#shopping-list")
const inputField = document.querySelector("#input-field")
const addBtn = document.querySelector("#add-button")

addBtn.addEventListener("click", function(){
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInputField()
    
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        shoppingListEl.setAttribute("style", "margin: 0")
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            addToList(currentItem)
    }
    }else{
        shoppingListEl.setAttribute("style", "margin: 20px auto; color:#5b8291;user-select:none")
        shoppingListEl.innerHTML = "No items here... yet."

    }
})

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}

function addToList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}