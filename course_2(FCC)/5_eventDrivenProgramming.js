const Event = require('events')

const customEvent = new Event()

customEvent.on('response', () => {
    console.log('Data recieved');
})
customEvent.on('response', (name, id) => {
    console.log(`${name} with id ${id}`);
})
customEvent.on('response', () => {
    console.log('More functionality');
})

customEvent.emit('response', 'Anas', 22)