const fs = require("fs/promises")

const directoryPath  = "../library/Animators/Paths-svgs"

async function getSvgsNames(){
    let files = await fs.readdir(directoryPath);
    return files
}

module.exports = {getSvgsNames}