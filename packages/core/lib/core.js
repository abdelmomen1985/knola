"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUser = void 0;
function logUser(user) {
    // Log User
    console.log("User:");
    console.log(`${user.id} -> ${user.name} (${user.age ? user.age : 'age unknown'})`);
}
exports.logUser = logUser;
//# sourceMappingURL=core.js.map