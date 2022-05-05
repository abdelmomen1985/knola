"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.green = exports.red = exports.blue = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.error;
function blue(what) {
    log(chalk_1.default.blue(JSON.stringify(what, null, 4)));
}
exports.blue = blue;
function red(what) {
    log(chalk_1.default.red(JSON.stringify(what, null, 4)));
}
exports.red = red;
function green(what) {
    log(chalk_1.default.green(JSON.stringify(what, null, 4)));
}
exports.green = green;
function error(what) {
    red("Error:");
    red(what);
}
exports.error = error;
//# sourceMappingURL=log_chalk.js.map