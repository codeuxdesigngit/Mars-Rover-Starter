const Command = require("../command.js");

describe("Command class", function () {
  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () {
      new Command();
    }).toThrow(new Error("Command type required."));
  });

  it("constructor sets command type", function () {
    const command = new Command("MOVE", 12000);
    expect(command.commandType).toBe("MOVE");
  });

  it("constructor sets a value passed in as the 2nd argument", function () {
    const command = new Command("MOVE", 12000);
    expect(command.value).toBe(12000);
  });
});
