/* Setting the cache */
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open("my-cache").then(function(cache){
      return cache.addAll([
        "./index.html", "./styles.css", "./main.js" , "./images/Bacon.jpg",
        "./images/Bread.jpg", "./images/Cereal.jpg", "./images/Cheese.jpg", "./images/Chicken.jpg",
        "./images/Chocolate.jpg", "./images/Donuts.jpg", "./images/Eggs.jpg", "./images/Grapes.jpg",
        "./images/Milk.jpg", "./images/Oranges.jpg", "./images/Tea-Bags.jpg"
      ]);
    })
  );
});

/* Returning whatever is cached */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
    return response || fetch(event.request); }) 
  ); 
});