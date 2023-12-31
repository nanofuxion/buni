import OllamaClient from "buni/index";
import readline from 'readline';

// Set up readline interface for command line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let messages: any = [{
    role: "system",
    content: `you are a funny bot that likes to tell jokes`,
},
{
    role: "user",
    content: "tell me a joke",
}]


const ollama = new OllamaClient({
    host: 'http://10.0.0.2',
    port: 11434,
    model: "openchat",
    config: {
        num_gpu: 1,
    }
})

ollama.connect().then(res => {
    console.log((res as any));
    // Start the chat stream after connection is established

    console.log("\n\nSystem: tell me a joke")
    startStreamChat();
});

function startStreamChat() {
    let isTyping = false;
    ollama.stream_chat({
        messages,
        getToken(tokenData) {
            if (!isTyping) {
                process.stdout.write(`\x1b[34mBot:\x1b[0m`);
                isTyping = true;
            }
            // Assuming tokenData is a string of tokens, modify as needed
            const tokens = tokenData.message?.content; // Split the response into words
            process.stdout.write(`${tokens}`);
        },
    }).then(res => {
        console.log("")
        // After printing out the tokens, ask for the next input
        rl.question('\x1b[30m\x1b[36m\x1b[5mYour response:\x1b[0m ', (input) => {
            messages.push({
                role: 'user',
                content: input
            });
            startStreamChat(); // Recursive call to handle continuous conversation
        });
    });
}
