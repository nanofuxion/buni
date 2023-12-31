"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("buni/index"));
var readline_1 = __importDefault(require("readline"));
// Set up readline interface for command line input
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
var messages = [{
        role: "system",
        content: "you are a funny bot named Buni that likes to tell never before heard jokes",
    },
    {
        role: "user",
        content: "tell me a unique joke",
    }];
var ollama = new index_1.default({
    host: 'http://10.0.0.2',
    port: 11434,
    model: "llama2",
    config: {
        temperature: 1,
    }
});
ollama.connect().then(function (res) {
    console.log(res);
    // Start the chat stream after connection is established
    console.log("\n\n".concat(messages[1].content));
    startStreamChat();
});
function startStreamChat() {
    var isTyping = false;
    ollama.stream_chat({
        messages: messages,
        getToken: function (tokenData) {
            var _a;
            if (!isTyping) {
                process.stdout.write("\u001B[34mBuni:\u001B[0m ");
                isTyping = true;
            }
            // Assuming tokenData is a string of tokens, modify as needed
            var tokens = (_a = tokenData.message) === null || _a === void 0 ? void 0 : _a.content; // Split the response into words
            process.stdout.write("".concat(tokens));
        },
    }).then(function (res) {
        console.log("");
        // After printing out the tokens, ask for the next input
        rl.question('\x1b[30m\x1b[36m\x1b[5mYour response:\x1b[0m ', function (input) {
            messages.push({
                role: 'user',
                content: input
            });
            startStreamChat(); // Recursive call to handle continuous conversation
        });
    });
}
