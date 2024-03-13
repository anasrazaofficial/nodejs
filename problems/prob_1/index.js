import fs from "fs"
import fsp from "fs/promises"
import path from "path"

const basePath = "C:\\Users\\USER\\Documents\\git\\anasrazaofficial\\nodejs\\problems\\prob_1"

let files = await fsp.readdir(basePath)

files.forEach(file => {
    let ext = file.split('.').pop()
    if (ext !== 'js' && ext !== 'json') {
        if (!fs.existsSync(path.join(basePath, ext))) {
            fsp.mkdir(ext)
        }
        fsp.rename(path.join(basePath, file), path.join(basePath, ext, file))
    }
})