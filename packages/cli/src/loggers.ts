import chalk from "chalk";
const log = console.error;

export function sysout(what: string) {
  process.stdout.write(what);
}

export function blue(what: unknown) {
  log(chalk.blue(JSON.stringify(what, null, 4)));
}
export function red(what: unknown) {
  log(chalk.red(JSON.stringify(what, null, 4)));
}

export function green(what: unknown) {
  log(chalk.green(JSON.stringify(what, null, 4)));
}

export function error(what: unknown) {
  red("Error:");
  red(what);
}
