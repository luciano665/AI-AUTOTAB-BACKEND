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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeminiResponse = getGeminiResponse;
var openai_1 = require("openai");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var GEMINI_MODELS = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-2.0-flash-exp",
];
var MAX_RET = 3;
var INIT_DELAY_RET = 1000; // -> 1 second
var openai = new openai_1.default({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
function tryWithRetry(modelName_1, messages_1) {
    return __awaiter(this, arguments, void 0, function (modelName, messages, maxRetries) {
        var lastError, attempt, response, error_1, delay;
        if (maxRetries === void 0) { maxRetries = MAX_RET; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastError = null;
                    attempt = 0;
                    _a.label = 1;
                case 1:
                    if (!(attempt < maxRetries)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 7]);
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: modelName,
                            messages: messages,
                        })];
                case 3:
                    response = _a.sent();
                    return [2 /*return*/, response.choices[0].message.content || ""];
                case 4:
                    error_1 = _a.sent();
                    lastError = error_1;
                    if (!(attempt < maxRetries - 1)) return [3 /*break*/, 6];
                    delay = INIT_DELAY_RET * Math.pow(2, attempt);
                    return [4 /*yield*/, sleep(delay)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    console.error({ error: lastError });
                    return [3 /*break*/, 7];
                case 7:
                    attempt++;
                    return [3 /*break*/, 1];
                case 8: throw lastError;
            }
        });
    });
}
function getGeminiResponse(messages) {
    return __awaiter(this, void 0, void 0, function () {
        var lastError, _i, GEMINI_MODELS_1, modelName, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastError = null;
                    _i = 0, GEMINI_MODELS_1 = GEMINI_MODELS;
                    _a.label = 1;
                case 1:
                    if (!(_i < GEMINI_MODELS_1.length)) return [3 /*break*/, 6];
                    modelName = GEMINI_MODELS_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, tryWithRetry(modelName, messages)];
                case 3:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 4:
                    error_2 = _a.sent();
                    lastError = error_2;
                    console.log({ error: lastError });
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: throw new Error("All models and retries failed. Last error: ".concat(lastError === null || lastError === void 0 ? void 0 : lastError.message));
            }
        });
    });
}
