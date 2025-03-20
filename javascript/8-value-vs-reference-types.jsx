// Lesson
// Primitive types are passed by value (by copy)
let a = 10;
let b = a;
a = 20;
console.log(a); // 20
console.log(b); // 10

// Reference types are passed by reference
a = { value: 20 };
b = a;
a.value = 100;
console.log(a); // { value: 100 }
console.log(b); // { value: 100 }

// Exercise
