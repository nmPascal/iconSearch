const path = require("path");
const fs = require("fs");
const ICONS_RELATIVE_PATH =
  "C:\\Users\\PascalHector\\Documents\\Dev\\Me\\iconSearch\\client\\public\\images\\icons";
const directoryPath = path.join(__dirname, "../client/public/images/icons");

//* Convert DIRS and FILES to JSON

/**
 *
 * @param {*} dirPath
 * @param {*} filesArray
 * @returns array of all files in directoryPath
 */
const getAllFiles = (dirPath, filesArray = []) => {
  fs.readdirSync(dirPath).forEach((file) => {
    if (
      file === ".DS_Store" ||
      file === "META" ||
      file === "PNG" ||
      file === "preview.png"
    )
      return;

    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      filesArray = getAllFiles(path.join(dirPath, file), filesArray);
    } else {
      filesArray.push(path.join(dirPath, "/", file));
    }
  });

  return filesArray;
};

const allFiles = getAllFiles(directoryPath);

const reg = /[# -]/;

/**
 * * Handling dirs, files and creating tags for search
 */
const filesData = allFiles.map((file) => {
  const ip = path.normalize(ICONS_RELATIVE_PATH);
  const p = path.normalize(file);
  const po = path.relative(ip, p);
  const posixPath = "/" + po.split(path.sep).join("/");

  const _path = path.parse(posixPath);

  const filePath = _path;
  const iconName = _path.name;
  const iconCategory = _path.dir.split("/").pop();
  const theTags = filePath.name
    .split(reg)
    .map((tag) => tag.toLowerCase())
    .filter((tag) => isNaN(parseInt(tag)));

  iconCategory !== "icons" && theTags.push(iconCategory.toLowerCase());

  return {
    title: iconName,
    filePath: filePath.dir + "/" + filePath.base,
    tags: theTags,
  };
});

/**
 * * Convert filesData to JSON with terminal command => 'node index.js | Out-File -Encoding "UTF8" ../client/icons.json'
 */
console.log(JSON.stringify(filesData, null, 2));
