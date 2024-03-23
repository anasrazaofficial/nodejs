const fs = require('fs')

console.log('Start');

fs.readFile('./content/first.txt', 'utf8', (err, res) => {
    if (err) {
        console.error(err);
        return
    }
    const first = res
    fs.readFile('./content/second.txt', 'utf8', (error, result) => {
        if (error) {
            console.error(error);
            return
        }
        const second = result
        fs.writeFile('./content/result-async.txt', `Here is the result for async: ${first}, ${second}`, (err, result) => {
            if (err) {
                console.log(err);
                return
            }
            console.log('Executed');
        })
    })
})

console.log('End');