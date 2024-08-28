const fs = require("fs");

fs.existsSync("./folder") ? fs.rm("./folder", { recursive: true }, err => (err ? console.log(err) : console.log("Directory deleted successfully!"))) : fs.mkdir("./folder", { recursive: true }, err => (err ? console.log(err) : console.log("Directory created successfully!")));

/* const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" }); // CreateReadStream is used to read data from a file
const ws = fs.createWriteStream("./files/new-lorem.txt"); // CreateWriteStream is used to write data into a file
// rs.on("data", chunk => ws.write(chunk)); // Write data into a file
rs.pipe(ws); // Pipe is used to pipe data from one stream to another */

/* const fsPromises = require("fs").promises;
const path = require("path");

const fileOperation = async () => {
    try {
        await fsPromises.writeFile(path.join(__dirname, "files", "reply.txt"), ""); // Create and Write a new file
        await fsPromises.appendFile(path.join(__dirname, "files", "reply.txt"), "Hi, I'm Mr Shaiye.\nI was born and bred in Mogadishu"); // Add data into an existing file
        await fsPromises.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "textFile.txt")); // Rename an existing file
        const data = await fsPromises.readFile(path.join(__dirname, "files", "textFile.txt"), "utf8"); // Read data from an existing file
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, "files", "textFile.txt")); // Delete an existing file
    } catch (err) {
        console.log(err);
    }
};
fileOperation(); */

/* const fs = require("fs");
const path = require("path");

// Create and Write a new file
fs.writeFile(path.join(__dirname, "files", "reply.txt"), "Hi, I'm Mr Shaiye\n", err => {
    err ? console.log(err.message) : console.log(`Write complete successfully!`);

    // Add data into an existing file
    fs.appendFile(path.join(__dirname, "files", "reply.txt"), "I was born and bred in Mogadishu", err => {
        err ? console.log(err.message) : console.log(`Append complete successfully!`);

        // Rename an existing file
        fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "textFile.txt"), err => {
            err ? console.log(err.message) : console.log(`Rename complete successfully!`);

            // Read data from an existing file
            fs.readFile(path.join(__dirname, "files", "textFile.txt"), "utf8", (err, data) => {
                data ? console.log(data) : console.log(err.message);
            });
        });
    });
}); */

process.on("uncaughtException", err => (console.log(`There was an uncaught error: ${err}`), process.exit(1)));
