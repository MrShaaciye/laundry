const { compareAsc, format } = require(`date-fns`);
const { v4: uuidv4 } = require(`uuid`);

console.log(format(new Date(), `dd-MM-yyyy HH:mm:ss`));
console.log(uuidv4());
const dates = [new Date(`2020-01-01`), new Date(`2021-01-02`), new Date(`2022-01-03`), new Date(`2023-01-04`)];

console.log(dates.sort(compareAsc, `dd-MM-yyyy HH:mm:ss`));
