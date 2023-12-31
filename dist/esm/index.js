import EventEmitter from "events";
import fetchNdjson from "./utils/fecthNdjson";
class OllamaClient extends EventEmitter {
    url;
    model;
    template;
    system;
    config;
    context;
    constructor(options) {
        super();
        this.url = `${options.host}:${options.port}`;
        this.model = options.model || "llama2";
        this.template = options.template;
        this.system = options.system;
        this.config = options.config;
        this.context = options.context;
    }
    async connect() {
        console.log(this.url);
        try {
            const response = await fetch(this.url);
            return await response.text();
        }
        catch (error) {
            console.error(`Error: ${error}`);
            process.exit();
        }
    }
    setContext(context) {
        this.context = context;
    }
    async generate({ prompt, raw = false, config, system, template, context = this.context, }) {
        try {
            const response = await fetch(this.url + "/api/generate", {
                method: "POST",
                body: JSON.stringify(JSON.parse(JSON.stringify({
                    "model": this.model,
                    "stream": false,
                    "config": config || this.config,
                    "system": system || this.system,
                    "template": template || this.template,
                    context,
                    prompt,
                    raw,
                }))),
                headers: { "Content-Type": "application/json" },
            });
            const json = await response.json();
            this.context = json.context;
            return json;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async stream({ prompt, raw, config, system, template, context = this.context, getToken }) {
        try {
            const response = await fetchNdjson(this.url + "/api/generate", {
                "model": this.model,
                "stream": true,
                "options": config,
                "system": system || this.system,
                "template": template || this.template,
                context,
                prompt,
                raw
            }, getToken);
            return await response;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async chat({ messages, config, }) {
        try {
            const response = await fetch(this.url + "/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    "model": this.model,
                    "options": config,
                    "stream": false,
                    messages,
                }),
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async stream_chat({ messages, config, getToken, }) {
        try {
            const response = await fetchNdjson(this.url + "/api/chat", {
                "model": this.model,
                "stream": true,
                "options": config,
                messages,
            }, getToken);
            return await response;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
export default OllamaClient;
