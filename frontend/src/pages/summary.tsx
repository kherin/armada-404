declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}
declare var webkitSpeechRecognition: any;

import { Button } from '@/components/ui/button'
import React, { useState, useRef, useEffect } from 'react'
import { Cog, MicIcon } from 'lucide-react';

const Summary = () => {
    const updatedText: string[] = [];

    const [text, setText] = useState<string[]>([]);
    const [summary, setSummary] = useState(null);
    const [action, setAction] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<null | any>(null);
    const [isLoading,setIsLoading] = useState(false);

    const [meetingstarted, setMeetingStarted] = useState(false);
    const [meetingdata, setMeetingData] = useState<any>();

    const [timer, setTimer] = useState();

    useEffect(()=>{
        const meetingstring = localStorage.getItem('meetings');
        if (meetingstring != null) {
           setMeetingData(JSON.parse(meetingstring));
        }
    },[])

    // const textalign = async (currentAgenda: any) => {
    //     try {
    //         const response = await fetch('http://localhost:3001/openai', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 messages: [{
    //                     role: 'user',
    //                     content: `this is my current agenda: ${currentAgenda}`
    //                 }]
    //             }),
    //         });

    //         console.log(response);

    //         if (!response.ok) {
    //             throw new Error(`Network response was not ok: ${response.statusText}`);
    //         }

    //         const data = await response.json();
    //         setSummary(data[0].message.content || 'No summary provided');
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    const summariseText = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://shadowed-spotted-cupboard.glitch.me/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: `this is my agenda: ${JSON.stringify(meetingdata.agendas)} . And this is my meeting text: ${text}. Please see if it is aligned with the agendas and summarize the meeting text for me`
                    }]
                }),
            });

            console.log(response);

            if (!response.ok) {
                setIsLoading(false)
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            setIsLoading(false)

            const data = await response.json();
            setSummary(data[0].message.content || 'No summary provided');
        } catch (error) {
            setIsLoading(false)

            console.error('Error:', error);
        }
    };


    const toggleSpeechRecognition = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setAction('');
            setIsListening(false);
        } else {
            const recognition = new webkitSpeechRecognition();
            recognitionRef.current = recognition;

            recognition.continuous = true;  // Enable continuous recognition
            recognition.interimResults = true;  // Enable interim results

            recognition.onstart = () => {
                setAction('Listening...');
                setIsListening(true);
            };

            recognition.onresult = (event: { results: string | any[]; }) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                updatedText.push(transcript);
                console.log('updated: ', updatedText);
                // console.log({ transcript })
                setText([...updatedText]);  // Append new transcript to existing text
                console.log('text: ', text)
            };

            recognition.onend = () => {
                if (isListening) {  // Restart recognition if still listening
                    recognition.start();
                }
            };

            recognition.start();
        }
    };


    return (
        <div className='container flex gap-4 justify-center items-center h-full mt-4'>
            <div className='w-[300px] flex flex-col overflow-auto max-h-[calc(100vh-90px)]'>
               { meetingdata && <>
                <span>StartTime: {new Date(meetingdata.starttime).toLocaleTimeString()}</span>
                <span>EndTime: {new Date(meetingdata.endtime).toLocaleTimeString()}</span>

                {meetingdata.agendas.map((agenda:any, i:number) => {
                    return (
                        <div key={i} className='flex flex-col p-4 mb-4 border rounded-md shadow-md w-full justify-between items-center gap-4'>
                            <span className='text-2xl font-bold capitalize'>{agenda.title}</span>
                            <span className='text-xl flex-grow'>{agenda.notes}</span>
                            <span className='text-xl text-sdorange'>Duration: {agenda.duration} (mins)</span>
                        </div>
                    )
                })}
                </>}
            </div>
            <div className='flex flex-col flex-grow justify-center items-center h-full'>
            <MicIcon name='summary' className='w-40 h-40 py-10' onClick={toggleSpeechRecognition} style={{ cursor: 'pointer' }} />
            <div className="space-y-8 w-full">
                <p>{action}</p>
                <div className='flex flex-col space-y-4 w-full'>
                    <div className='border rounded-md max-h-[300px] overflow-auto min-h-[100px]'>
                        {text.map((t: string, i: number) => {
                            return <p key={i}>{new Date().toLocaleDateString()}- { new Date().toLocaleTimeString()} - {t} </p>

                        })}
                        {/* <textarea className='w-full p-4 ' rows={4} value={text} placeholder='Text to Summarize' onChange={(e: any) => setText(e.target.value)}></textarea> */}

                    </div>
                </div>

                <Button className='bg-sdorange hover:bg-sdorangehover hover:outline-1' onClick={summariseText} disabled={isLoading}>{isLoading ?<Cog className='animate-spin w-6 h-6'/> :'Summarise'}</Button>

            </div>
            {summary && <div>
                {summary}
            </div>}
            </div>
           
        </div>
    )
}

export default Summary