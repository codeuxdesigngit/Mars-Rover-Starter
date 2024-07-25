class Rover {
   // Write code here!

constructor(position) {
   this.position = position;
   this.mode = 'NORMAL'; 
   this.generatorWatts = 110;
}

   recieveMessage(message) {
      let response = {};
      response.message = message.name;
      ressponse.results = [] 
      // Array to store results of commands



      //Go through each command in the message
      for (let i = 0; i < message.commands.length; i++) {
let command = message.commands [i];
let result = {};

//Check the type of command
if (command.commandType === 'STATUS_CHECK') {
   result.completed = true;
   result.roverStatus = {
      mode: this.mode,
      this.generatorWatts: this.generatorWatts,
      this.position: this.position
   };
} else if (command.commandType === 'MODE_CHANGE') {
   this.mode = command.value; //Update mode to new value
   result.completed = true;
} else if (commandd.commandType === 'MOVE') {
   IF (this.mode === 'LOW_POWER') {
    
result.completed = true;
result.missingKey = "This is confusing";
   } else {
      this.position = command.value; //Update position to new value
      result.completed = true;
   }
} else {
   result.completed = false;
}

//Add the result to the result array
response.results.push (result)
}
{
return response.results.push(result)
}
return response;
      } 

   }
}


}

module.exports = Rover;