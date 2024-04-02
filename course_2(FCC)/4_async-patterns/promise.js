const fs = require('fs');
const { resolve } = require('path');

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

getText('../3_builtInModules/content/first.txt').then(res => console.log(res)).catch(err => console.log(err))