#!/user/bin/env node
// @ts-check
const meow = require("meow");

const cli = meow(
  `
  Usage
    $ hello-meow <input> [...<input>]

  Options
    --rainbow, -r  Include a rainbow

  Examples
    $ hello-meow unicorns --rainbow
    🌈 unicorns 🌈
`,
  {
    flags: {
      rainbow: {
        type: "boolean",
        default: false,
        alias: "r"
      }
    }
  }
);

const {
  input,
  flags: { rainbow }
} = cli;

const output = input.join(" ");
console.log(rainbow ? `🌈 ${output} 🌈` : output);
