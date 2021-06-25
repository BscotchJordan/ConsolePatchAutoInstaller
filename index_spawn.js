const path = require("path");
const childProcess = require("child_process");
const semver = require("semver");
const fs = require("fs");

//list all of the files in the folder
const rootDir =
  "C:/Users/Jordan/Dropbox (Bscotch)/GamePipe/crashlands-2/develop";
console.log(rootDir);

const files = fs.readdirSync(rootDir);
//sort all of the files by version #
semver.sort(files);

let biggestFileSizeSofar = 0;
for (const file of files) {
  const file_stat = fs.statSync(file);
}

//return the last file in the sorted list
NewPatch = files.pop();

//concatenate the path
const stitchedUpFilePath = path.join(
  rootDir,
  //"crashlands-2/",
  //"develop/",
  NewPatch + "/",
  "switch/",
  "default/",
  NewPatch + ".nsp"
);

const PathToPatch = path.resolve(stitchedUpFilePath);
const executablePath = PathToPatch.replace(/\\/g, "/");
console.log("Does the target nsp file exist:", fs.existsSync(executablePath));

const runOnTargetDir =
  "C:/Nintendo/NintendoSDK/NintendoSDK/Tools/CommandLineTools/RunOnTarget.exe";
console.log("Does runOnTarget.exe exist:", fs.existsSync(runOnTargetDir));
const DevMenuCommandDir =
  "C:/Nintendo/NintendoSDK/NintendoSDK/TargetTools/NX-NXFP2-a64/DevMenuCommand/Release/DevMenuCommand.nsp";
console.log("Does devmenucommand.nsp exist:", fs.existsSync(DevMenuCommandDir));

console.log("------------------------");
const process = childProcess.spawn(path.resolve(runOnTargetDir), [
  path.resolve(DevMenuCommandDir),
  "--",
  "application",
  "install",
  path.resolve(executablePath),
  "--force",
]);

//console.log(executablePath);
//const process = childProcess.exec(executablePath);

process.stdout.on("data", (data) => {
  console.log(data.toString());
});

process.stdout.on("error", (error) => {
  console.log("stdout: " + error);
});

process.on("error", (error) => {
  console.log(error.toString());
});

process.on("exit", (code) => {
  console.log(code.toString());
});
