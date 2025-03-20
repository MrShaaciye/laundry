function Programmer(name, preferredLanguage) {
  this.name = name;
  this.preferredLanguage = preferredLanguage;
  this.writeCode = function () {
    console.log(`${this.name} writes ${this.preferredLanguage} code.`);
  };
  this.drinkCoffee = function () {
    console.log(`${this.name} drinks coffee.`);
  };
}

const newProgrammer = new Programmer("Alice", "JavaScript");
console.log(newProgrammer.constructor);
