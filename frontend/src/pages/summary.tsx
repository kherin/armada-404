import { Button } from '@/components/ui/button'
import React, { useState } from 'react'


const Summary = () => {

    const [text, setText] = useState("");
    const [summary, setSummary] = useState(null);

    const summariseText = async () => {
        try {
            const response = await fetch('http://localhost:3001/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: `summarize this text for me: ${text}`
                    }]
                }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            setSummary(data[0].message.content || 'No summary provided');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container flex flex-col justify-center items-center h-full overflow-y-scroll'>

            <div className="space-y-8 w-full">
                <div className='flex flex-col space-y-4 w-full'>
                    <div className='border rounded-md'>
                        <textarea className='w-full p-4 ' rows={4} value={text} placeholder='Text to Summarize' onChange={(e: any) => setText(e.target.value)}></textarea>
                    </div>
                </div>

                <Button className='bg-sdorange hover:bg-sdorangehover hover:outline-1' onClick={summariseText}>Summarise</Button>

            </div>
            {summary && <div>
                {summary}
            </div>}
        </div>
    )
}

export default Summary