### Revised README for Buni (Ollama Client Library)

# Buni

## Ollama Client Library (Buni)

Buni is a TypeScript-based client API for Ollama, designed to be simple yet flexible. It is intended for use with the Bun JavaScript runtime. Buni should work in Node.js environments, although this has not been extensively tested.
Why did I name it buni? idk just liked the name.

## Installation

```bash
bun add github:nanofuxion/buni
```

## Usage

### Creating an Instance

Instantiate `OllamaClient` with an `Options` object to connect to the Ollama server:

```ts
const client = new OllamaClient({
    host: 'ollama_host',
    port: ollama_port,
    model: 'model_name', // Ollama model name
    // Optional parameters
    template: 'template_name', // Template for Ollama responses
    system: 'system_name', // System name for additional Ollama configurations
    config: modelParameters, // Configuration parameters for Ollama model
    context: contextArray // Context array for Ollama interactions
});
```

### Class Properties

- `url`: URL of the Ollama server (constructed from host and port).
- `model`: Name of the Ollama model.
- `template` (optional): Template name for Ollama responses.
- `system` (optional): System name for additional Ollama configurations.
- `config` (optional): Configuration parameters for the Ollama model.
- `context` (optional): Context array for Ollama interactions.

### Methods

#### `async connect()`

Establish a connection to the Ollama server. Returns a text response.

#### `setContext(context: number[])`

Update the context for the Ollama interactions.

---

#### `async generate(options)`

Generate an Ollama response based on provided options, which include `prompt`, `raw`, `config`, `system`, `template`, and `context`.

#### `async stream(options)`

Stream data from the Ollama server. Options include `prompt`, `raw`, `config`, `system`, `template`, `context`, and a `getToken` function. This method returns the full response upon stream completion.

---

#### `async chat(options)`

Initiate a non-streaming chat session with Ollama. Options include `messages` and `config`.

#### `async stream_chat(options)`

Initiate a streaming chat session with Ollama. Options include `messages`, `config`, and `getToken`. This method returns the message object upon stream completion.

## Examples

### Connecting to the Server

```ts
await client.connect();
```

### Generating an Ollama Response

```ts
const response = await client.generate({
    prompt: "Your prompt here",
    raw: false,
    config: yourConfig,
    system: 'yourSystem',
    template: 'yourTemplate',
    context: yourContext
});

const streamResponse = await client.stream({
    prompt: "Your prompt here",
    raw: true,
    config: yourConfig,
    system: 'yourSystem',
    template: 'yourTemplate',
    context: yourContext,
    getToken: yourTokenFunction
});
```

### Engaging in an Ollama Chat

```ts
const chatResponse = await client.chat({
    messages: yourMessagesArray,
    config: yourConfig
});

const streamedChatResponse = await client.stream_chat({
    messages: yourMessagesArray,
    config: yourConfig,
    getToken: yourTokenFunction
});
```

## Contribution

Contributions to the Buni Ollama Client Library are welcome. Please ensure that your code aligns with the existing style and includes proper tests and documentation then submit a pull request.

---

Note: This README is based on the `index.ts` file of the Ollama Client Library and may need adjustments to match the actual implementation and use cases of your project. (Readme Partially generated using ChatGPT).