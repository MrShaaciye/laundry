// Lesson
const person = {
  // Create an object
  name: "Shaiye", // Add a property to the object
}; // The object is now { name: 'Shaiye'

console.log(person); // { name: 'Shaiye' }
person["favoriteFood"] = "Pizza"; // Add a new property to the object
console.log(person); // { name: 'Shaiye', favoriteFood: 'Pizza' }
person.favoriteIceCream = "chocolate"; // Add a new property to the object
console.log(person); // { name: 'Shaiye', favoriteFood: 'Pizza', favoriteIceCream: 'chocolate' }
delete person.favoriteIceCream; // Remove a property from the object
console.log(person); // { name: 'Shaiye', favoriteFood: 'Pizza' }

// add function to object
person.eat = function () {
  console.log(`${this.name} eats ${this.favoriteFood}`);
};

person.eat(); // Shaiye eats Pizza

// Exercise
function GroceryItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.display = function () {
    console.log(`${this.name} x ${this.quantity}`);
  };
}

const item = new GroceryItem("Apple", 5);
item.display(); // Apple x 5
item["price"] = 2.5; // Add a new property to the object
console.log(item); // GroceryItem { name: 'Apple', quantity: 5, display: [Function], price: 2.5 }
delete item.quantity; // Remove a property from the object
console.log(item);
