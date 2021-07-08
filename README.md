# ConsolePatchAutoInstaller
Scripts for automatically installing console patches.

## Required Stuff
You need VScode installed and access to the gamepipe to run this script.

## Instructions
In the index files, `GameRootDir` must be changed to the path of the base GamePipe folder.

To do this you'll need to open the `index_spawn_xbox.js` or `index_spawn_switch.js` in VScode, depending on which console you're trying to configure.

In either script there's a variable called `GameRootDir` that must be set the path of the GamePipe folder, on your machine, in a string format.
- Navigate to the GamePipe in windows explorer, hold shift and right-click on the folder, then select 'Copy as path'.

- Paste the path into the value for `GameRootDir`, the path must be wrapped in quotes!

In VScode you'll need to install nodemon to get the script to trigger automatically.

- In the terminal, type: `npm install nodemon` and press enter.

Wait for the install to complete.\
Now you'll need the path to the GamePipe folder again.

- The terminal command to enter is: `nodemon --watch <Path to GamePipe>`

The script should fire immediately and again every time a folder in the GamePipe is modified, as long as VScode is still running.
