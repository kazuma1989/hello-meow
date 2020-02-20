const inquirer = require("inquirer");

const REPOS = ["a", "b", "c"];

module.exports = async meow => {
  const {
    input: [, ...input],
    flags
  } = meow(
    `
    Usage
      $ hello-meow inq

    Examples
      $ hello-meow inq
      ? Repository
        1) a
        2) b
        3) c
        Answer: _
`
  );

  const { repo } = await inquirer.prompt([
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
};
