#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const open_1 = __importDefault(require("open"));
const kdocs_1 = __importDefault(require("./kdocs"));
const loggers_1 = require("./loggers");
const utils_1 = require("./utils");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const GIST_ID = "739ade69ca698082769c88010ca7927a";
    const FILE_NAME = "mmn.json";
    const GIST_URL = `https://gist.githubusercontent.com/abdelmomen1985/${GIST_ID}/raw/${FILE_NAME}`;
    const { data } = yield axios_1.default.get(`${GIST_URL}?timestamp=${new Date().getTime()}`);
    (0, loggers_1.green)("* Gist Url => " + GIST_URL);
    const chained = lodash_1.default.chain(data.commands);
    const [command, ...restArgs] = (0, utils_1.parseArgsIntoOptions)(process.argv);
    if (command === "desc") {
        const commandData = chained.find({ command: restArgs[0] }).value();
        if (commandData && commandData.description) {
            (0, loggers_1.green)(commandData.description);
        }
        return;
    }
    if (command === "open") {
        (0, loggers_1.sysout)("https://gist.github.com/abdelmomen1985");
        return;
    }
    else if (command === "docs") {
        yield (0, kdocs_1.default)();
        return;
    }
    else if (command === "help") {
        return;
    }
    // TODO : Better Naming
    if (!command) {
        (0, loggers_1.error)("Welcome to knola, no command was provided!");
        return;
    }
    const commandData = chained.find({ command }).value();
    if (!commandData) {
        (0, loggers_1.error)("Command not found!");
        return;
    }
    (0, loggers_1.green)(commandData);
    let actionData = undefined;
    // Find if otion is selected
    if (commandData.options) {
        // Check default empty option
        if (commandData.options[""]) {
            (0, loggers_1.green)(commandData.options[""]);
            actionData = commandData.options[""].action;
        }
        // else check if the second arg is an option
        else {
            if (restArgs[0] && commandData.options[restArgs[0]]) {
                (0, loggers_1.blue)(commandData.options[restArgs[0]].action);
                actionData = commandData.options[restArgs[0]].action;
            }
        }
    }
    else {
        (0, loggers_1.error)("Options not Provided");
        return;
    }
    if (!actionData) {
        (0, loggers_1.error)("There is no action data");
    }
    const argsIndex = actionData[2];
    let payload = `${actionData[1]}${restArgs[argsIndex] ? restArgs[argsIndex] : ""}`;
    if (actionData[0] === "open") {
        (0, open_1.default)(payload);
        (0, loggers_1.blue)(`${payload} opened`);
    }
}))();
//# sourceMappingURL=index.js.map