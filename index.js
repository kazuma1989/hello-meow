// @ts-check
const meow = require("meow");

const cli = (helpText, options = {}) => {
  const result = meow(
    helpText ||
      `
    Usage
      $ hello-meow [...INPUT]

    Options
      --verbose, -v  Verbose output
      --rainbow, -r  Include a rainbow

    Examples
      $ hello-meow -v unicorns --rainbow
      🌈 unicorns 🌈
`,
    {
      ...options,
      flags: {
        verbose: {
          type: "boolean",
          default: false,
          alias: "v"
        },
        rainbow: {
          type: "boolean",
          default: false,
          alias: "r"
        },
        ...options.flags
      }
    }
  );

  if (helpText) {
    const {
      input: [, ...input],
      flags: { help },
      showHelp
    } = result;
    if (!input.length && help) {
      showHelp();
    }
  }

  return result;
};

const subCommand = {
  double(parent) {
    const {
      input: [, ...input],
      flags
    } = parent(
      `
      Usage
        $ hello-meow double [...INPUT]

      Options
        --rainbow, -r  Include a doubled rainbow

      Examples
        $ hello-meow double unicorns --rainbow
        🌈🌈 unicorns 🌈🌈
`,
      {
        flags: {
          // Override a flag
          rainbow: {
            type: "string",
            default: "",
            alias: "r"
          }
        }
      }
    );

    console.log("sub", input, flags);
    // const output = input.join(" ");
    // console.log(rainbow ? `🌈 ${output} 🌈` : output);
  }
};

const base = cli();

const [command] = base.input;
if (subCommand[command]) {
  subCommand[command](cli);
} else {
  console.log(base.input, base.flags);
}

// const output = input.join(" ");
// console.log(rainbow ? `🌈 ${output} 🌈` : output);
