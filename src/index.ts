import meow, { AnyFlags } from "meow";

const cli = (
  helpText?: string,
  options: {
    flags?: AnyFlags;
  } = {}
) => {
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
  async double(meow) {
    (await import("./commands/double")).default(meow);
  },
  inq(...args) {
    // require("./commands/inq")(...args);
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
