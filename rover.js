class Rover {
  constructor(position) {
    this.position = position; // Initial position of rover
    this.mode = "NORMAL"; // Default mode
    this.generatorWatts = 110; // Default generatorWatts
  }

  receiveMessage(message) {
    let response = {};
    response.message = message.name; // Name of the message
    response.results = []; // Array to store results of commands

    // Go through each command in message
    for (let i = 0; i < message.commands.length; i++) {
      let command = message.commands[i];
      let result = {}; // Empty result object

      // Check type of command
      if (command.commandType === "STATUS_CHECK") {
        result.completed = true;
        result.roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };
      } else if (command.commandType === "MODE_CHANGE") {
        this.mode = command.value; // Update mode to new value
        result.completed = true;
      } else if (command.commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          result.completed = false; // Can't move in LOW_POWER mode
        } else {
          this.position = command.value; // Update position to new value
          result.completed = true;
        }
      } else {
        result.completed = false; // Unknown command type
      }

      response.results.push(result); // Add result to results array
    }

    return response; // Return response object
  }
}

module.exports = Rover;
