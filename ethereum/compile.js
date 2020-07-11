const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
// Delete everything in the build folder
fs.removeSync(buildPath);

// Read "Campaign.sol" from the contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8')

// Compile the "Campaign.sol" file
const output = solc.compile(source, 1).contracts;

// Check if the directory exist, if not, create it for us
fs.ensureDirSync(buildPath); 

// Write output to the 'build' directory
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(":", "") + '.json'),
        output[contract]
    );
}