"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const cli = (helpText, options = {}) => {
    const result = meow_1.default(helpText ||
        `
    Usage
      $ hello-meow [...INPUT]

    Options
      --verbose, -v  Verbose output
      --rainbow, -r  Include a rainbow

    Examples
      $ hello-meow -v unicorns --rainbow
      🌈 unicorns 🌈
`, {
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
    });
    if (helpText) {
        const { input: [, ...input], flags: { help }, showHelp } = result;
        if (!input.length && help) {
            showHelp();
        }
    }
    return result;
};
const subCommand = {
    async double(meow) {
        (await Promise.resolve().then(() => __importStar(require("./commands/double")))).default(meow);
    },
    async inq(meow) {
        (await Promise.resolve().then(() => __importStar(require("./commands/inq")))).default(meow);
    }
};
const base = cli();
const [command] = base.input;
if (subCommand[command]) {
    subCommand[command](cli);
}
else {
    console.log(base.input, base.flags);
}
// const output = input.join(" ");
// console.log(rainbow ? `🌈 ${output} 🌈` : output);
