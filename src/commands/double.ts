export default meow => {
  const {
    input: [, ...input],
    flags
  } = meow(
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
};
