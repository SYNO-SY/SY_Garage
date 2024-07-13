const fs = require("fs");
const path = require("path");

const imgPath = "imgs";
const destPath = "build/imgs";

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

const srcDir = path.resolve(__dirname, imgPath);
const destDir = path.resolve(__dirname, destPath);

copyFolderSync(srcDir, destDir);
console.log(
  "SY_Dev:\x1b[32mImage folder copied to build folder successfully\x1b[0m",
);
