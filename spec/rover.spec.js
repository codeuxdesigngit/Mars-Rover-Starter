const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

describe("Rover class", function () {
  // Test 1
  it("constructor sets position and default values for mode and generatorWatts", function () {
    // Check if position, mode, and generatorWatts are correct
    let rover = new Rover(12345);
    expect(rover.position).toEqual(12345);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  // Test 2
  it("response returned by receiveMessage contains the name of the message", function () {
    // Checks if response has message name
    let commands = [new Command("MOVE", 1234)];
    let message = new Message("Test Message", commands);
    let rover = new Rover(12345);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test Message");
  });

  // Test 3
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    // Check if all results are there for each command
    let commands = [new Command("MOVE", 1234), new Command("STATUS_CHECK")];
    let message = new Message("Test Message", commands);
    let rover = new Rover(12345);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  // Test 4
  it("responds correctly to the status check command", function () {
    // Check if rover responds right to STATUS_CHECK
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Test Message", commands);
    let rover = new Rover(12345);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(12345);
  });

  // Test 5
  it("responds correctly to the mode change command", function () {
    // Check if rover changes mode with MODE_CHANGE command
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Test Message", commands);
    let rover = new Rover(12345);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.mode).toEqual("LOW_POWER");
  });

  // Test 6
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    // Check if rover don’t move when in LOW_POWER mode
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 5678),
    ];
    let message = new Message("Test Message", commands);
    let rover = new Rover(12345);
    rover.receiveMessage(message);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBeFalsy();
    expect(rover.position).toEqual(12345);
  });

  // Test 7
  it("responds with the position for the move command", function () {
    // Check if rover updates position with MOVE command
    let commands = [new Command("MOVE", 5678)];
    let message = new Message("Test Message", commands);
    let rover = new Rover(12345);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(rover.position).toEqual(5678);
  });
});
