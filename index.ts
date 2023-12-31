import EventEmitter from "events";
import fetchNdjson from "./utils/fecthNdjson";
import { MessageArray, ModelParameters, Options, ResponseData } from "buni/utils/types";

class OllamaClient extends EventEmitter {
    url: string;
    model: string;
    template?: string;
    system?: string;
    config?: ModelParameters;
    context?: number[];
    constructor(options: Options) {
        super();
        this.url = `${options.host}:${options.port}`
        this.model = options.model || "llama2";
        this.template = options.template;
        this.system = options.system
        this.config = options.config;
        this.context = options.context;
    }

    async connect() {
        console.log(this.url);
        try {
            const response = await fetch(this.url);

            return await response.text();

        } catch (error) {
            console.error(`Error: ${error}`);
            process.exit();
        }
    }

    setContext(context: number[]) {
        this.context = context;
    }

    async generate(
        {
            prompt,
            raw = false,
            config,
            system,
            template,
            context = this.context,
        }: {
            prompt?: string;
            raw?: boolean;
            config?: ModelParameters;
            template?: string;
            system?: string;
            context?: number[];
        }
    ) {
        try {
            const response = await fetch(this.url + "/api/generate", {
                method: "POST",
                body: JSON.stringify(
                    JSON.parse(
                        JSON.stringify({
                            "model": this.model,
                            "stream": false,
                            "config": config || this.config,
                            "system": system || this.system,
                            "template": template || this.template,
                            context,
                            prompt,
                            raw,
                        })
                    )
                ),
                headers: { "Content-Type": "application/json" },
            });
            const json = await response.json() as ResponseData;
            this.context = (json as any).context;
            return json;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }


    async stream(
        {
            prompt,
            raw,
            config,
            system,
            template,
            context = this.context,
            getToken
        }: {
            prompt?: string;
            raw?: boolean;
            config?: ModelParameters;
            template?: string;
            system?: string;
            context?: number[];
            getToken: (tokenData: ResponseData) => void;
        }
    ) {
        try {
            const response = await fetchNdjson(
                this.url + "/api/generate",
                {
                    "model": this.model,
                    "stream": true,
                    "options": config,
                    "system": system || this.system,
                    "template": template || this.template,
                    context,
                    prompt,
                    raw
                },
                getToken
            );
            return await response;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async chat(
        {
            messages,
            config,
        }: {
            messages: MessageArray;
            config?: ModelParameters;
        }
    ) {
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
            return await response.json() as ResponseData;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async stream_chat(
        {
            messages,
            config,
            getToken,
        }: {
            messages: MessageArray;
            config?: ModelParameters;
            getToken: (tokenData: ResponseData) => void;
        }
    ) {
        try {

            const response = await fetchNdjson(
                this.url + "/api/chat",
                {
                    "model": this.model,
                    "stream": true,
                    "options": config,
                    messages,
                },
                getToken
            );
            return await response;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}



export default OllamaClient;