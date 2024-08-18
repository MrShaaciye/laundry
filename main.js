// Logical AND (&&) and Logical OR (||)
/* const getName = name => `Hello ${name}`;
let a = false;
let b = false;
console.log(a && b); */

// Template literals
/* let name1 = "John";
let name2 = "Doe";
console.log(name1, name2); */

// Ternary operator
/* const showRecipeOne = true;
const getRecipeOneName = recipeName => recipeName;
const getRecipeTwoName = recipeName => recipeName;
showRecipeOne ? console.log(getRecipeOneName("Pizza")) : console.log(getRecipeTwoName("Coke")); */

// Destructuring Object
/* const id = 1;
const type = "Apple Watch";
const price = 500;
const tax = 0.1;
const product = { id, type, price: 500, description: "a good product", tax, total: price + price * tax };
console.log(`No: ${product.id}, type is ${product.type}, price is ${product.price}, Description is ${product.description}, tax is $${product.tax} and total is $${product.total}.`); */

// Destructuring Array
/* const array = [1, 2, 3, 4];
const [first, second, third, forth] = array;
console.log(first, second, third, forth); */

// Default Parameters
/* const multiplyOfTwoNumbers = (num1 = 0, num2 = 0) => (console.log(num1, num2), num1 * num2);
console.log(`Total: $${multiplyOfTwoNumbers(20, 30)}`); */

// Spread Operator
/* const spreadArr1 = [1, 2, 3, 4];
const spreadArr2 = [5, 6, 7, 8];
const spreadArr3 = [0.11, ...spreadArr1, 0.55, ...spreadArr2, 0.99, ...spreadArr1];
console.log(spreadArr3); */

// REST Operators
/* const getInfo = (name, age, ...hobbies) => `Name: ${name}, Age: ${age}, Hobbies: ${hobbies}`;
console.log(getInfo("John", 30, "Reading", "Coding", "Swimming")); */

// Map
/* const people = [
    { name: "John", age: 30, occupation: "developer" },
    { name: "Jane", age: 25, occupation: "designer" },
    { name: "Bob", age: 35, occupation: "teacher" },
    { name: "Alice", age: 22, occupation: "developer" },
    { name: "Eve", age: 28, occupation: "designer" },
];
const info = people.map((person, index) => `No: ${index} Name: ${person.name} Age: ${person.age} Occupation: ${person.occupation}`);
console.log(info); */

// Find
/* const sameAge = people.find(person => person.occupation === "designer");
console.log(sameAge); */

// Filter
/* const developers = people.filter((person, index) => person.occupation === "developer" && index >= 0);
console.log(developers); */

// Some
/* const some = people.some(person => person.age >= 30);
console.log(some); */

// Every
/* const every = people.every(person => person.age >= 22);
console.log(every); */

// Includes
/* const includeArr = ["John", "Doe", "Bob"];
console.log(includeArr.includes("Doe")); */

// IndexOf
/* const indexOfArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(indexOfArr.indexOf(7)); */

// FindIndex
/* console.log(people.findIndex(person => person.occupation === "teacher")); */
