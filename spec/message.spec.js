const Message = require("../message.js");
const Command = require("../command.js");

describe("Message class", function () {
  // Test 1
  it("throws error if a name is NOT passed into the constructor as the first parameter", function () {
    // Check for error if noo name is given
    expect(function () {
      new Message();
    }).toThrow(new Error("Name is required."));
  });

  // Test 2
  it("constructor sets name", function () {
    // Check if name is correct when creating new message
    let message = new Message("Test Name", []);
    expect(message.name).toEqual("Test Name");
  });

  // Test 3
  it("contains a commands array passed into the constructor as the 2nd argument", function () {
    // Check if commands array is correct when creating message
    let commands = [new Command("MOVE", 1234)];
    let message = new Message("Test Message", commands);
    expect(message.commands).toEqual(commands);
  });
});
