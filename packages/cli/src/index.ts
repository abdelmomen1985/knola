#!/usr/bin/env node
import axios from "axios";
import lodash from "lodash";
import kdocs from "./kdocs";
import { blue, error, green, sysout } from "./loggers";
import { parseArgsIntoOptions } from "./utils";

(async () => {
  const GIST_ID = "739ade69ca698082769c88010ca7927a";
  const FILE_NAME = "mmn.json";
  const GIST_URL = `https://gist.githubusercontent.com/abdelmomen1985/${GIST_ID}/raw/${FILE_NAME}`;
  const { data } = await axios.get(
    `${GIST_URL}?timestamp=${new Date().getTime()}`
  );
  green("* Gist Url => " + GIST_URL);
  const chained = lodash.chain(data.commands);
  const [command, ...restArgs] = parseArgsIntoOptions(process.argv);
  if (command === "descripe") {
    const commandData = chained.find({ command: restArgs[0] }).value();
    if (commandData && commandData.description) {
      green(commandData.description);
    }
    return;
  }
  if (command === "pipe") {
    sysout("Piped Text");
    return;
  }
  if (command === "open") {
    sysout("https://gist.github.com/abdelmomen1985");
    return;
  }
  if (command === "docs") {
    await kdocs();
    return;
  }
  // TODO : Better Naming
  if (!command) {
    error("Welcome to knola, no command was provided!");
    return;
  }
  const commandData = chained.find({ command }).value();
  if (!commandData) {
    error("Command not found ");
    return;
  }
  green(commandData);
  let actionData = undefined;
  // Find if otion is selected
  if (commandData.options) {
    // Check default empty option
    if (commandData.options[""]) {
      green(commandData.options[""]);
      actionData = commandData.options[""].action;
    }
    // else check if the second arg is an option
    else {
      if (restArgs[0] && commandData.options[restArgs[0]]) {
        blue(commandData.options[restArgs[0]].action);
        actionData = commandData.options[restArgs[0]].action;
      }
    }
  } else {
    error("Options not Provided");
    return;
  }
  if (!actionData) {
    error("There is no action data");
  }
})();
