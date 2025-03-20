// Object Literal
// An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces ({}).
const groceryItem = {
  name: "Apples",
  quantity: 4,

  /**
   * Displays the item in the console.
   */
  displayItem: function () {
    console.log(`Name: ${this.name}, Quantity: ${this.quantity}`);
  },
};

groceryItem.displayItem();

// let programmer = {
//   name: "Abdukadir Hassan Shaiye",
//   preferredLanguage: "JavaScript",

//   writeCode() {
//     console.log(`${this.name} writes ${this.preferredLanguage} code.`);
//   },

//   drinkCoffee() {
//     console.log(`${this.name} drinks coffee.`);
//   },
// };

// programmer.writeCode();
// programmer.drinkCoffee();
