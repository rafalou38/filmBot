"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lean = void 0;
function lean(doc) {
    const id = doc.id;
    return Object.assign({ id }, doc.toObject({ getters: true, virtuals: true }));
}
exports.lean = lean;
