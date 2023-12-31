export type ModelParameters = {
    mirostat?: number;
    mirostat_eta?: number;
    mirostat_tau?: number;
    num_ctx?: number;
    num_gqa?: number;
    num_gpu?: number;
    num_thread?: number;
    repeat_last_n?: number;
    repeat_penalty?: number;
    temperature?: number;
    seed?: number;
    stop?: string;
    tfs_z?: number;
    num_predict?: number;
    top_k?: number;
    top_p?: number;
};
type Message = {
    role: "user" | "system" | "assistant";
    content: string;
};
export type MessageArray = Message[];
export type ResponseData = {
    model: string;
    created_at: string;
    response?: string;
    message?: Message;
    done: boolean;
    context?: number[];
    total_duration: number;
    load_duration: number;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
};
export type Options = {
    host: `http${'s' | ''}://${string}`;
    port: number;
    model?: string;
    config?: ModelParameters;
    template?: string;
    system?: string;
    context?: number[];
};
export {};
