const { compareAsc, format } = require(`date-fns`);
const { v4: uuidv4 } = require(`uuid`);

console.log(format(new Date(), `dd-MM-yyyy HH:mm:ss`));
console.log(uuidv4());
const dates = [new Date(`2021-11-15`), new Date(`2022-05-20`), new Date(`2023-08-25`), new Date(`2024-07-11`)];

console.log(dates.sort(compareAsc, `dd-MM-yyyy HH:mm:ss`));
