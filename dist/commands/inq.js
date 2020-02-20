"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const REPOS = ["a", "b", "c"];
async function default_1(meow) {
    const { input: [, ...input], flags } = meow(`
    Usage
      $ hello-meow inq

    Examples
      $ hello-meow inq
      ? Repository
        1) a
        2) b
        3) c
        Answer: _
`);
    const { repo } = await inquirer_1.default.prompt([
        {
            name: "repo",
            type: "rawlist",
            message: "Repository",
            choices: REPOS
        }
    ]);
    console.log("sub", input, flags, { repo });
    // const output = input.join(" ");
    // console.log(rainbow ? `🌈 ${output} 🌈` : output);
}
exports.default = default_1;
