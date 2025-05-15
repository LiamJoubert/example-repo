
let cartList = document.getElementById("cart-list");
let cartItems = [];


/* Checks for a cookie, if found greets the user with their username. 
If not found, prompts the user to enter a username. */
if (document.cookie){
  username = document.cookie.split("=")[1];
  alert(`Welcome back ${username}`);
}
else {
  let username = prompt("What is your username?");
  document.cookie = `username=${username}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;
  console.log(document.cookie);
}


/* Code from https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
as per mentor meeting with Chad Probert*/
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register("./sw.js").then(
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    },
  );
} else {
  console.error("Service workers are not supported.");
}


/*Checks for local storage in the cart, and displays it if there
is anything stored. */
if (localStorage.getItem("cartItems")){
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  updateCartDisplay(cartItems);
}

/*Checks if the sessionStorage contains a previous font choice. If so,
it changes the font to the selected choice. */
if (sessionStorage.getItem("textFont")){
  let fontText = sessionStorage.getItem("textFont");
  document.body.style.setProperty('font-family', fontText);
}


/*Object constructor for items */
function Item(itemName, price){
  this.itemName = itemName;
  this.quantity = 0;
  this.price = price;
}



/*Function clears {the CartList, then redisplays the list with the new contents. 
Also displays the empty cart button if there is an item in the list*/
function updateCartDisplay(array){
  totalPrice(cartItems);
  if (cartItems.length > 0){
    document.getElementById("empty-cart-button").style.display = "block";
  }
  cartList.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let listItem = document.createElement("li");
    listItem.textContent = array[i].quantity + " x " + array[i].itemName;
    cartList.appendChild(listItem);
  }
  }
/*Totals the price of all the items selected so far. */
function totalPrice(array){
  let priceTotal = 0;
  for (let i = 0; i < array.length; i++) {
    priceTotal = priceTotal + (array[i].quantity*array[i].price); 
  }
  document.getElementById("total").textContent = "Total in cart: R" + priceTotal.toFixed(2);
}



/*Function adds the event listener to the specified button and
tell it which item to add to the cartItems list, plus the price 
that is added to the cartPrices array, then the total is displayed
at the bottom of the cart list */
function addItemToCart(button, item, price){
  document
  .getElementById(button)
  .addEventListener("click", function(){
    itemObject = cartItems.find(c => 
      c.itemName === item
    );
     if (!itemObject){
        newItem = new Item(item, price);
        newItem.quantity++;
        cartItems.push(newItem);
      }
      else{
        itemObject.quantity++;
      }
    updateCartDisplay(cartItems);
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  })
}
/*Sets the functionality of the empty cart button, to clear the cartItems list,
then updates the localStorage of cartItems as empty too. */
document
  .getElementById("empty-cart-button")
  .addEventListener("click", function(){
    cartItems.splice(0);
    updateCartDisplay(cartList);
    totalPrice(cartList);
    document.getElementById("empty-cart-button").style.display = "none";
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  })

/*adds event listeners to all the buttons as per the addItemToCart
function. The buttons will then add each separate item, and there price
to different arrays so we can keep track of what was selected and 
the total price */
addItemToCart("button-bacon", "Bacon", 29.99);
addItemToCart("button-milk", "Milk", 21.99);
addItemToCart("button-oranges", "Oranges", 34.99);
addItemToCart("button-tea-bags", "Tea-Bags", 54.99);
addItemToCart("button-bread", "Bread", 19.99);
addItemToCart("button-cereal", "Cereal", 44.99);
addItemToCart("button-cheese", "Cheese", 182.99);
addItemToCart("button-chicken", "Whole Chicken", 64.99);
addItemToCart("button-chocolate", "Chocolate", 25.99);
addItemToCart("button-donuts", "Donuts", 9.99);
addItemToCart("button-eggs", "Eggs", 27.99);
addItemToCart("button-grapes", "Grapes", 34.99);


/* Adds event listeners to the dropdown menu for font selection, then 
stores the selection in session storage and changes the text of the 
body to the selected fontFamily. */
const fontArial = document.getElementById("font-arial");
const fontVerdana = document.getElementById("font-verdana");
const fontCourierNew = document.getElementById("font-courier-new");

fontArial.addEventListener("click", function(){
  sessionStorage.setItem("textFont", "Arial, Helvetica, sans-serif")
  document.body.style.setProperty('font-family', "Arial, Helvetica, sans-serif");
})

fontVerdana.addEventListener("click", function(){
  sessionStorage.setItem("textFont", "Verdana, Geneva, Tahoma, sans-serif")
  document.body.style.setProperty('font-family', "Verdana, Geneva, Tahoma, sans-serif");
})

fontCourierNew.addEventListener("click", function(){
  sessionStorage.setItem("textFont", "'Courier New', Courier, monospace")
  document.body.style.setProperty('font-family', "'Courier New', Courier, monospace");
})


