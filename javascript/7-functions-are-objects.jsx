function GroceryItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.display = function () {
    console.log(`${this.quantity} ${this.name}`);
  };
} // This is a constructor function.

const item = new GroceryItem("apple", 5);
item.display(); // 5 apple

function calculatePrice(groceryItem, price) {
  return groceryItem.quantity * price;
}

const performCalculation = calculatePrice;

console.log(performCalculation(item, 0.25)); // 1.25
console.log(performCalculation.length); // 2
console.log(performCalculation.name); // calculatePrice

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
// newProgrammer.writeCode(); // Alice writes JavaScript code.
// newProgrammer.drinkCoffee(); // Alice drinks coffee.

// function add(num1, num2) {
//   return num1 + num2;
// }

// const n = add;
// console.log(n(2, 2)); // 4
// console.log(n.length); // 2
// console.log(n.name); // add

// const ProgrammerFunction = new Function(
//   "name",
//   `
//   this.name = name;
//   this.writeCode = function () {
//     console.log('Code in JavaScript');
//   };
// `
// );

// const programmer = new ProgrammerFunction("Alice");
// programmer.writeCode(); // Code in JavaScript
// console.log(programmer.name); // Alice
// console.log(programmer instanceof ProgrammerFunction); // true
