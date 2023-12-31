/// <reference types="node" />
import EventEmitter from "events";
import { MessageArray, ModelParameters, Options, ResponseData } from "buni/utils/types";
declare class OllamaClient extends EventEmitter {
    url: string;
    model: string;
    template?: string;
    system?: string;
    config?: ModelParameters;
    context?: number[];
    constructor(options: Options);
    connect(): Promise<string>;
    setContext(context: number[]): void;
    generate({ prompt, raw, config, system, template, context, }: {
        prompt?: string;
        raw?: boolean;
        config?: ModelParameters;
        template?: string;
        system?: string;
        context?: number[];
    }): Promise<ResponseData>;
    stream({ prompt, raw, config, system, template, context, getToken }: {
        prompt?: string;
        raw?: boolean;
        config?: ModelParameters;
        template?: string;
        system?: string;
        context?: number[];
        getToken: (tokenData: ResponseData) => void;
    }): Promise<string | MessageArray>;
    chat({ messages, config, }: {
        messages: MessageArray;
        config?: ModelParameters;
    }): Promise<ResponseData>;
    stream_chat({ messages, config, getToken, }: {
        messages: MessageArray;
        config?: ModelParameters;
        getToken: (tokenData: ResponseData) => void;
    }): Promise<string | MessageArray>;
}
export default OllamaClient;
