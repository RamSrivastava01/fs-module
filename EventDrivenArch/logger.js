const fs = require("fs");
const os = require("os");

const EventEmitter = require("events");
const { log } = require("console");
class Logger extends EventEmitter {
    log(message) {
        this.emit("message", { message });
    }
}

let logger = new Logger();
let logFile = "./eventLog.txt";

const logToFile = function (event) {
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`;
    fs.appendFileSync(logFile, logMessage);
};

logger.on("message", logToFile);
setInterval(() => {
    const memoryUsage = (os.freemem / os.totalmem) * 100;
    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`);
}, 3000);

logger.log("Application started");
logger.log("Application event occured");
