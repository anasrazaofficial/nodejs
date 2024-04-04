const fs = require('fs');

const getText = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

const start = async () => {
    const first = await getText('../content/first.txt')
    console.log(first);
}
start()