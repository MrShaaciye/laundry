// Constructor functions
// Constructor functions are functions that create objects. They are used to create multiple instances of an object. The object created by a constructor function can have properties and methods.

function GroceryItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.display = function () {
    console.log(`${this.quantity} x ${this.name}`);
  };
}

const newItem = new GroceryItem("Apples", 5);
newItem.display();

// const Programmer = function (name, preferredLanguage) {
//   this.name = name;
//   this.preferredLanguage = preferredLanguage;
//   this.writeCode = function () {
//     console.log(`${this.name} writes ${this.preferredLanguage} code.`);
//   };
//   this.drinkCoffee = function () {
//     console.log(`${this.name} drinks coffee.`);
//   };
// };

// const newProgrammer = new Programmer("Alice", "JavaScript");
// newProgrammer.writeCode();
// newProgrammer.drinkCoffee();
