const path = require("path");
const childProcess = require("child_process");
const semver = require('semver');
const fs = require('fs');

//list all of the files in the folder
const rootDir = "C:/Users/Jordan/Dropbox (Bscotch)/GamePipe/crashlands-2/develop";
//const rootDir = "C:/Users/Jordan/Dropbox (Bscotch)/GamePipe/crashlands/release";
// const rootDir = "C:/Users/Jordan/Dropbox (Bscotch)/GamePipe/levelhead/develop";
console.log(rootDir);
const files = fs.readdirSync(rootDir);
//sort all of the files by version #
semver.sort(files);

//return the last file in the sorted list
NewPatch = files.pop();

//concatenate the path 
const stitchedUpFilePath = path.join(
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

const runOnTargetDir = "\"C:/Nintendo/NintendoSDK/NintendoSDK/Tools/CommandLineTools/RunOnTarget.exe\"";
console.log("Does runOnTarget.exe exist:", fs.existsSync(runOnTargetDir));
const DevMenuCommandDir = "\"C:/Nintendo/NintendoSDK/NintendoSDK/TargetTools/NX-NXFP2-a64/DevMenuCommand/Release/DevMenuCommand.nsp\"";
console.log("Does devmenucommand.nsp exist:", fs.existsSync(DevMenuCommandDir));

const BrokenSlashes = runOnTargetDir + " " + DevMenuCommandDir
const installationCmd = BrokenSlashes.replace(/\\/g, "/");

const combinedCmd = installationCmd + " -- application install " + "\"" +  executablePath + "\" --force"
console.log(combinedCmd);
console.log("------------------------")
const process = childProcess.exec(combinedCmd);

//console.log(executablePath);
//const process = childProcess.exec(executablePath);

process.stdout.on("data", (data) => {
  console.log(data);
});

process.stdout.on("error", (error) => {
  console.log('stdout: ' + error);
});

process.on("error", (error) => {
  console.log(error);
});

process.on("exit", (code) => {
  console.log(code);
});