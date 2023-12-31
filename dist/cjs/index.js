"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __importDefault(require("events"));
var fecthNdjson_1 = __importDefault(require("./utils/fecthNdjson"));
var OllamaClient = /** @class */ (function (_super) {
    __extends(OllamaClient, _super);
    function OllamaClient(options) {
        var _this = _super.call(this) || this;
        _this.url = "".concat(options.host, ":").concat(options.port);
        _this.model = options.model || "llama2";
        _this.template = options.template;
        _this.system = options.system;
        _this.config = options.config;
        _this.context = options.context;
        return _this;
    }
    OllamaClient.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.url);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.url)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error: ".concat(error_1));
                        process.exit();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OllamaClient.prototype.setContext = function (context) {
        this.context = context;
    };
    OllamaClient.prototype.generate = function (_a) {
        var prompt = _a.prompt, _b = _a.raw, raw = _b === void 0 ? false : _b, config = _a.config, system = _a.system, template = _a.template, _c = _a.context, context = _c === void 0 ? this.context : _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, json, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.url + "/api/generate", {
                                method: "POST",
                                body: JSON.stringify(JSON.parse(JSON.stringify({
                                    "model": this.model,
                                    "stream": false,
                                    "config": config || this.config,
                                    "system": system || this.system,
                                    "template": template || this.template,
                                    context: context,
                                    prompt: prompt,
                                    raw: raw,
                                }))),
                                headers: { "Content-Type": "application/json" },
                            })];
                    case 1:
                        response = _d.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _d.sent();
                        this.context = json.context;
                        return [2 /*return*/, json];
                    case 3:
                        error_2 = _d.sent();
                        throw new Error("".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OllamaClient.prototype.stream = function (_a) {
        var prompt = _a.prompt, raw = _a.raw, config = _a.config, system = _a.system, template = _a.template, _b = _a.context, context = _b === void 0 ? this.context : _b, getToken = _a.getToken;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, fecthNdjson_1.default)(this.url + "/api/generate", {
                                "model": this.model,
                                "stream": true,
                                "options": config,
                                "system": system || this.system,
                                "template": template || this.template,
                                context: context,
                                prompt: prompt,
                                raw: raw
                            }, getToken)];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3:
                        error_3 = _c.sent();
                        throw new Error("".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OllamaClient.prototype.chat = function (_a) {
        var messages = _a.messages, config = _a.config;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.url + "/api/chat", {
                                method: "POST",
                                body: JSON.stringify({
                                    "model": this.model,
                                    "options": config,
                                    "stream": false,
                                    messages: messages,
                                }),
                                headers: { "Content-Type": "application/json" },
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        error_4 = _b.sent();
                        throw new Error("".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OllamaClient.prototype.stream_chat = function (_a) {
        var messages = _a.messages, config = _a.config, getToken = _a.getToken;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, fecthNdjson_1.default)(this.url + "/api/chat", {
                                "model": this.model,
                                "stream": true,
                                "options": config,
                                messages: messages,
                            }, getToken)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        error_5 = _b.sent();
                        throw new Error("".concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OllamaClient;
}(events_1.default));
exports.default = OllamaClient;
