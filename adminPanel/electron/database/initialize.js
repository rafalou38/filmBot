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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbLoad = void 0;
const mongoose_1 = require("mongoose");
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(mongoose_1.connect);
        return new Promise((resolve, reject) => {
            if (!process.env.MONGO_URI)
                return reject(new Error("Missing MONGO_URI in dotenv"));
            (0, mongoose_1.connect)(process.env.MONGO_URI, (err) => {
                console.log(err);
                if (err) {
                    console.log("failed to connect to mongoDB ❌");
                    reject(err);
                }
                else {
                    console.log("successfully connected to mongoDB ✅");
                    resolve(err);
                }
            });
        });
    });
}
exports.dbLoad = initDB();
