export type ModelParameters = {
    mirostat?: number; // 0 = disabled, 1 = Mirostat, 2 = Mirostat 2.0
    mirostat_eta?: number; // Learning rate, influences response speed of the algorithm
    mirostat_tau?: number; // Controls balance between coherence and diversity
    num_ctx?: number; // Context window size
    num_gqa?: number; // Number of GQA groups in transformer layer
    num_gpu?: number; // Number of layers to send to GPU(s)
    num_thread?: number; // Number of threads to use during computation
    repeat_last_n?: number; // -1 = num_ctx, 0 = disabled
    repeat_penalty?: number; // Penalizes repetitions, higher value = stronger penalty
    temperature?: number; // Model's temperature, higher value = more creativity
    seed?: number; // Random number seed for generation
    stop?: string; // Stop sequences for LLM to stop generating text
    tfs_z?: number; // Tail free sampling impact, 1.0 = disabled
    num_predict?: number; // -1 = infinite generation, -2 = fill context
    top_k?: number; // Reduces probability of generating nonsense
    top_p?: number; // Works with top-k for text diversity
};

type Message = {
    role: "user" | "system" | "assistant";
    content: string;
}

export type MessageArray = Message[]

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
}

