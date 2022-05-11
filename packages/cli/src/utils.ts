import arg from "arg";

export function parseArgsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      "--help": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return args._;
}
