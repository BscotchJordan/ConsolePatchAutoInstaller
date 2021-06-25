const path = require("path");
const childProcess = require("child_process");
const semver = require("semver");
const fs = require("fs");

//list all of the files in the folder
//const rootDir = "C:/Users/Jordan/Dropbox (Bscotch)/GamePipe/crashlands/develop";
//console.log(rootDir);

const GameRootDir = "C:/Users/Jordan/Dropbox (Bscotch)/GamePipe";
const games = fs.readdirSync(GameRootDir);
//console.log(games);

let LastModifiedTimestamp = 0;
let rootDir = "";
let LastModifiedTime = 0;
let LastModifiedGame = '';
let B_Release = false;
for (const folder of games) {
  //console.log("the folder is: " + folder)
  if (folder == 'levelhead' || folder == 'crashlands') {
    const fullGamePath = path.join(GameRootDir, folder);
    const folder_stat = fs.statSync(fullGamePath);
    if (folder_stat.mtimeMs > LastModifiedTime) {
      LastModifiedTime = folder_stat.mtimeMs;
      LastModifiedGame = folder;
    const FullGamePath = path.join(GameRootDir, LastModifiedGame);
    //console.log(FullGamePath)
    const branches = fs.readdirSync(FullGamePath);
    //console.log(branches)
    for (const branch of branches) {
      if (branch == 'release') {
        B_Release = true;
        const GamePlusBranch = path.join(FullGamePath, branch)
        const Branch_Stat = fs.statSync(GamePlusBranch);
        if (Branch_Stat.mtimeMs > LastModifiedTimestamp) {
          LastModifiedTimestamp = Branch_Stat.mtimeMs;
          rootDir = GamePlusBranch;
        }
      } else {
          B_Release = false;
          //console.log(branch)
          const GamePlusBranch = path.join(FullGamePath, branch)
          const Branch_Stat = fs.statSync(GamePlusBranch);
          if (Branch_Stat.mtimeMs > LastModifiedTimestamp) {
            LastModifiedTimestamp = Branch_Stat.mtimeMs;
            rootDir = GamePlusBranch;
          }
        }
      }
    }
  }
}

console.log(B_Release);
// set root directory for the rest of the code to fire. Could prob

//["1.0.2-rc.0","1.0.2-rc.1", "1.0.2-rc.10"]
// function semVerSort(array_of_release_version_in_branch_folder){
//   rc_number = "1";
//   return rc_number;
// }

// const full_rc_path = path.join(root, version, "-rc.", rc_number);

console.log('This is the path that has been updated most recently: ' + rootDir)


const files = fs.readdirSync(rootDir);
//sort all of the files by version #
semver.sort(files);

console.log(files)

//return the last file in the sorted list
const NewPatch = files.pop();

if (B_Release == true) {
  const releasePath = path.join(rootDir,NewPatch);
  const releaseCandidates = fs.readdirSync(releasePath);
  let latestRC = "0.0.0";
  for (const RC of releaseCandidates) {
    
    // const file_stat = fs.statSync(fullFilePath);
    if (semver.gt(RC,latestRC)) {
      latestRC = RC;
    }
  }
  console.log('This is the latest release candidate: ' + latestRC);
  const fullRCPath = path.join(releasePath, latestRC);
  console.log(fullRCPath);
  const stitchedUpFilePath = path.join(
    fullRCPath,
    "/xboxone/",
    "default/",
    latestRC + ".xboxone-pkg"
  );
  const patch_files = fs.readdirSync(stitchedUpFilePath);
  let biggestFileSizeSofar = 0;
  let biggestFileName = "";
  for (const file of patch_files) {
    const fullFilePath = path.join(stitchedUpFilePath, file);
    const file_stat = fs.statSync(fullFilePath);
    if (file_stat.size > biggestFileSizeSofar) {
      biggestFileSizeSofar = file_stat.size;
      biggestFileName = fullFilePath;
    }
  }
  console.log("This is the biggest file: " + biggestFileName);

  const PathToPatch = path.resolve(biggestFileName);
  const PathToPatchSafe = PathToPatch.replace(/\\/g, "/");
  console.log("Does the patch file exist:", fs.existsSync(PathToPatchSafe));

  const executablePath =
    "C:/Program Files (x86)/Microsoft Durango XDK/bin/xbapp.exe";
  console.log("Does runOnTarget.exe exist:", fs.existsSync(executablePath));

  const executablePathSafe = executablePath.replace(/\\/g, "/");

  const installationCmd = "\"" + executablePathSafe + "\"" + " install ";

  const combinedCmd = installationCmd + "\"" + thToPatchSafe + "\"";
  console.log(combinedCmd);
  console.log("------------------------");

  const process = childProcess.exec(combinedCmd);

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
} else {
  //concatenate the path
  const stitchedUpFilePath = path.join(
    rootDir,
    NewPatch + "/",
    "xboxone/",
    "default/",
    NewPatch + ".xboxone-pkg"
  );
  const patch_files = fs.readdirSync(stitchedUpFilePath);
  let biggestFileSizeSofar = 0;
  let biggestFileName = "";
  for (const file of patch_files) {
    const fullFilePath = path.join(stitchedUpFilePath, file);
    const file_stat = fs.statSync(fullFilePath);
    if (file_stat.size > biggestFileSizeSofar) {
      biggestFileSizeSofar = file_stat.size;
      biggestFileName = fullFilePath;
    }
  }
  console.log("This is the biggest file: " + biggestFileName);
  const PathToPatchSafe = PathToPatch.replace(/\\/g, "/");
  console.log("Does the patch file exist:", fs.existsSync(PathToPatchSafe));

  const executablePath =
    "C:/Program Files (x86)/Microsoft Durango XDK/bin/xbapp.exe";
  console.log("Does runOnTarget.exe exist:", fs.existsSync(executablePath));

  const executablePathSafe = executablePath.replace(/\\/g, "/");

  const installationCmd = "\"" + executablePathSafe + "\"" + " install ";

  const combinedCmd = installationCmd + "\"" + thToPatchSafe + "\"";
  console.log(combinedCmd);
  console.log("------------------------");

  const process = childProcess.exec(combinedCmd);

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
}

//const patch_files = fs.readdirSync(stitchedUpFilePath);

// const BiggestFile = patch_files.shift();
// console.log(BiggestFile);

// let biggestFileSizeSofar = 0;
// let biggestFileName = "";
// for (const file of patch_files) {
//   const fullFilePath = path.join(stitchedUpFilePath, file);
//   const file_stat = fs.statSync(fullFilePath);
//   if (file_stat.size > biggestFileSizeSofar) {
//     biggestFileSizeSofar = file_stat.size;
//     biggestFileName = fullFilePath;
//   }
// }
// console.log("This is the biggest file: " + biggestFileName);

const PathToPatch = path.resolve(biggestFileName);
const PathToPatchSafe = PathToPatch.replace(/\\/g, "/");
console.log("Does the patch file exist:", fs.existsSync(PathToPatchSafe));

const executablePath =
  "C:/Program Files (x86)/Microsoft Durango XDK/bin/xbapp.exe";
console.log("Does runOnTarget.exe exist:", fs.existsSync(executablePath));

const executablePathSafe = executablePath.replace(/\\/g, "/");

const installationCmd = "\"" + executablePathSafe + "\"" + " install ";

const combinedCmd = installationCmd + "\"" + thToPatchSafe + "\"";
console.log(combinedCmd);
console.log("------------------------");

const process = childProcess.exec(combinedCmd);

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
