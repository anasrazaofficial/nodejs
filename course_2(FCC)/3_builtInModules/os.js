const { userInfo, type, release, totalmem, freemem } = require('os');
const { uptime } = require('process');

const user = userInfo()
console.log(user);

const upTime = uptime()
console.log(upTime);

const currentOS = {
    name: type(),
    release: release(),
    totalMemory: totalmem(),
    freeMemory: freemem()
}
console.log(currentOS);