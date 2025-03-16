// Factory Functions
// Factory functions are functions that return objects. They are useful when we need to create multiple instances of an object. The object returned by a factory function can have properties and methods.
const createGroceryItem = (name, quantity) => {
  return {
    name,
    quantity,
    display: function () {
      console.log(`${this.quantity} x ${this.name}`);
    },
  };
};

const newItem1 = createGroceryItem("Bananas", 5);
newItem1.display();

const newItem2 = createGroceryItem("Mangoes", 3);
newItem2.display();

// const createProgrammer = (name, preferredLanguage) => {
//   return {
//     name,
//     preferredLanguage,
//     writeCode: function () {
//       console.log(`${this.name} writes ${this.preferredLanguage} code.`);
//     },
//     drinkCoffee: function () {
//       console.log(`${this.name} drinks coffee`);
//     },
//   };
// };

// const programmer = createProgrammer("Alice", "JavaScript");
// programmer.writeCode();
// programmer.drinkCoffee();
