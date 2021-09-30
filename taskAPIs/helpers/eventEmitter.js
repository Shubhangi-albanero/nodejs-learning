const EventEmitter = require("events");
const event = new EventEmitter();
const logger = require("./logger.js");

module.exports = {
  init: () => {
    logger.info("Event has been initialized");

    return event;
  },
  getEvent: (eventname) => {
    event.on(eventname, (data) => {
      logger.info(`${eventname} has been registered with data = ${data}`);
    });
  },
};