const Command = require("../command.js");

describe("Command class", function () {
  
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    // Checks for error when commandType is not provided
    expect(function () {
      new Command();
    }).toThrow(new Error("Command type required."));
  });
});
