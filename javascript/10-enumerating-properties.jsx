let numbers = [1, 2, 3, 4, 5];
for (const element of numbers) console.log(element); // 1 2 3 4 5

const dog = {
  name: "Max",
  age: 5,
  eyeColor: "blue",
};

for (const key in dog) console.log(dog[key]); // name age eyeColor

const keys = Object.keys(dog);
for (const key of keys) console.log(key); // name age eyeColor

const values = Object.values(dog);
for (const value of values) console.log(value); // Max 5 blue

const entries = Object.entries(dog);
for (const entry of entries) console.log(`Key: ${entry[0]} => Value: ${entry[1]}`); // Key: name => Value: Max Key: age => Value: 5 Key: eyeColor => Value: blue

// Exercise
function GroceryItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  this.display = function () {
    console.log(`${this.name} x ${this.quantity}`);
  };
}

const item = new GroceryItem("Apple", 5);
for (const key of Object.keys(item)) console.log(key); // name quantity display
for (const value of Object.values(item)) console.log(value); // Apple 5 [Function: display]
for (const entry of Object.entries(item)) console.log(entry); // [ 'name', 'Apple' ] [ 'quantity', 5 ] [ 'display', [Function: display] ]
