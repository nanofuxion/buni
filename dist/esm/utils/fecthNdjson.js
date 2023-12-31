async function fetchNdjson(url, data, getToken) {
    const responseArray = [];
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(JSON.parse(JSON.stringify({
                ...data,
                "stream": true,
            }))),
            headers: { "Content-Type": "application/json" },
        });
        if (!response.body) {
            throw new Error("No response body");
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        const processText = async () => {
            try {
                const { done, value } = await reader.read();
                if (done) {
                    if (buffer.trim() !== '') {
                        const line = JSON.parse(buffer);
                        if (line.error) {
                            console.error(`ERROR: ${line.error}`);
                            return;
                        }
                        getToken(line);
                        responseArray.push(line.message || line);
                    }
                    return;
                }
                buffer += decoder.decode(value, { stream: true });
                let lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Handle the case where lines is empty
                lines.forEach((buffer) => {
                    if (buffer.trim() !== '') {
                        const line = JSON.parse(buffer);
                        if (line.error) {
                            console.error(`ERROR: ${line.error}`);
                            return;
                        }
                        getToken(line);
                        responseArray.push(line.message || line);
                    }
                });
            }
            catch (error) {
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
            responseArray.forEach(message => {
                if (typeof message != "string")
                    result.content += message.content;
            });
            return [result];
        }
        else {
            return responseArray.join("");
        }
    }
    catch (error) {
        console.error('Fetch error:', error);
        return "";
    }
}
export default fetchNdjson;
