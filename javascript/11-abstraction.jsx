function Programmer(name, preferredLanguage) {
  this.name = name;
  this.preferredLanguage = preferredLanguage;

  // Public method
  this.wireCode = function () {
    console.log(`${this.name} writes ${this.preferredLanguage} code.`);
  };

  // Private method
  const drinkCoffee = function () {
    console.log(`${this.name} drinks coffee.`);
  }.bind(this); // Bind the private method to the current context

  // Public method that calls the private method
  this.startDay = function () {
    drinkCoffee(); // Call the private method with the correct context
  };
}

const programmer = new Programmer("Alice", "JavaScript");
programmer.wireCode(); // Alice writes JavaScript code.
programmer.startDay(); // Alice drinks coffee while coding.

// Exercise
function GroceryItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.display = function () {
    console.log(`${this.name} x ${this.quantity}`);
  };
}

function GroceryList() {
  const items = []; // Private array to store items

  const calculateTotalQuantity = function () {
    return items.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0);
  };

  this.addItem = function (name, quantity) {
    const item = new GroceryItem(name, quantity); // Create a new GroceryItem
    items.push(item); // Add item to the private array
  };

  this.displayItems = function () {
    console.log("Grocery List:");
    items.forEach((groceryItem) => groceryItem.display()); // Display each item using its public method
  };

  this.getTotalQuantity = function () {
    return "Total Quantity: $" + calculateTotalQuantity();
  }; // Public method to get total quantity
}

const groceryList = new GroceryList();
groceryList.addItem("Apples", 5);
groceryList.addItem("Bananas", 3);
groceryList.addItem("Oranges", 2);
groceryList.displayItems(); // Display the grocery list items
console.log(groceryList.getTotalQuantity()); // Get the total quantity of items
// Output:
// Grocery List:
// Apples x 5
// Bananas x 3
// Oranges x 2
// Total Quantity: 10
