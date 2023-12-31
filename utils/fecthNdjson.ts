import { MessageArray, ResponseData } from "./types";

async function fetchNdjson(url: string | URL | Request, data: any, getToken: (tokenData: ResponseData) => void): Promise<string | MessageArray> {
    const responseArray: string[] | MessageArray = [];
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(
                JSON.parse(
                    JSON.stringify({
                        ...data,       
                        "stream": true,
                    })
                )
            ),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.body) {
            throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const processText = async (): Promise<void> => {
            try {
                const { done, value } = await reader.read();
                if (done) {
                    if (buffer.trim() !== '') {
                        const line: any = JSON.parse(buffer);
                        if ((line as any).error) {
                            console.error(`ERROR: ${line.error}`);
                            return;
                        }
                        getToken(line);
                        responseArray.push(line.message as any || line);
                    }
                    return;
                }

                buffer += decoder.decode(value, { stream: true });
                let lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Handle the case where lines is empty

                lines.forEach((buffer) => {
                    if (buffer.trim() !== '') {
                        const line: any = JSON.parse(buffer);
                        if ((line as any).error) {
                            console.error(`ERROR: ${line.error}`);
                            return;
                        }
                        getToken(line);
                        responseArray.push(line.message as any || line);
                    }
                });
            } catch (error) {
                console.error('Processing error:', error);
                reader.cancel();
            }
            return processText();
        };

        await processText();

        if (typeof responseArray[0] != "string") {
            const result = {
                role: "assistant",
                content: ""
            };
            responseArray.forEach( message =>{
                if(typeof message != "string")
                result.content += message.content;
            })
            return [result] as MessageArray;
            
        } else {
            return responseArray.join("");
        }

        
    } catch (error) {
        console.error('Fetch error:', error);
        return "";
    }
}

export default fetchNdjson;
