// Cut the csv file in nth csv files
// The file must have a header at first row.
// The header will be repeated in sub-files

const fs = require('fs');
const readline = require('readline');
const os = require('os');

const DEFAULT_FILE_NUMBER = 10;
const OUTPUT_PATH = './CuttedFiles/';
const fileNumber = +process.argv[3] || DEFAULT_FILE_NUMBER;
const filePath = process.argv[2]

if (!filePath) return console.log("You must provide a file in first argument");
if (!fs.existsSync(filePath)) return console.log("File does not exist");

createFolderIfNeeded(OUTPUT_PATH).then(() => {
    divideFile(filePath, fileNumber);
});

/**
 * Count the lines of the file and return a primise that resolve with the line count
 * @param {string} filePath the path of the file
 * @return {Promise} a promise that resolve with the line count
 */
function countFileLines(filePath) {
    return new Promise((resolve, reject) => {
        let cpt = 0;
        const lineReader = createLineReader(filePath);
        lineReader.on('line', () => {
            cpt++;
        });
        lineReader.on('close', () => {
            resolve(cpt);
        });
    });
}

/**
 * Get the header of the file
 * @param {string} filePath
 * @return {Promise} a promise that resolve with the header of the file
 */
function getFileHeader(filePath) {
    return new Promise((resolve, reject) => {
        const lineReader = createLineReader(filePath);
        lineReader.on('line', line => {
            resolve(line);
        });
    });
}

/**
 * Create a line Reader
 * @param {string} filePath the path of the file
 * @return {Object} line reader interface
 */
function createLineReader(filePath) {
    return readline.createInterface({
        input: fs.createReadStream(filePath)
    });
}

/**
 * Create folder at outputPath location if it does not already exist
 * @return {Promise} a promise that resolve when the folder is created or checked as already created
 */
function createFolderIfNeeded(outputPath) {
    return new Promise((resolve, reject) => {
        fs.exists(outputPath, pathExists => {
            if (!pathExists) {
                fs.mkdir(OUTPUT_PATH, { recursive: true }, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            }
            resolve();
        });
    });
}

/**
 * Divide the file in nth sub files
 * @param {string} filePath the file to divide
 * @param {number} fileNumber the number of sub-files to create
 */
async function divideFile(filePath, fileNumber) {
    const lineCount = await countFileLines(filePath);
    const numberOfLinePerFile = Math.ceil((lineCount - 1) / fileNumber);
    const header = await getFileHeader(filePath);
    const lineReader = createLineReader(filePath);

    let isHeader = true;
    let lineCounter = 1;
    let fileCount = 1;

    let fileWritter = fs.createWriteStream(`${OUTPUT_PATH}resultFile${fileCount}.csv`);
    fileWritter.write(header + os.EOL);

    lineReader.on('line', line => {
        if (isHeader) return isHeader = false;
        if (lineCounter > numberOfLinePerFile) {
            fileWritter = fs.createWriteStream(`${OUTPUT_PATH}resultFile${++fileCount}.csv`);
            fileWritter.write(header + os.EOL);
            fileWritter.write(line + os.EOL);
            lineCounter = 1;
        } else {
            fileWritter.write(line + os.EOL);
            lineCounter++;
        }
    });

    lineReader.on('close', err => {
        if (err) throw err;
        console.log('File divided successfully');
    });
}
