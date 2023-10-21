import { Button } from '@/components/ui/button'
import React, { useState } from 'react'


type agendatype = {
    title: string;
    notes: string;
    duration: number;
}


const Dashboard = () => {
    const [time, settime] = useState<{ starttime: string, endtime: string }>({
        starttime: new Date().toISOString(),
        endtime: new Date().toISOString(),
    })
    const [agendas, setAgendas] = useState<agendatype[]>([]);
    const [currentAgenda, setCurrentAgenda] = useState<agendatype>({
        title: "",
        notes: "",
        duration: 0
    })

    function onSubmit() {
        const updatedMeetings = {
            starttime: time.starttime,
            endtime: time.endtime,
            agendas: agendas
        }

        localStorage.setItem('meetings', JSON.stringify(updatedMeetings))

    }

    function addagenda() {
        agendas.push(currentAgenda);
        setCurrentAgenda({
            title: "",
            notes: "",
            duration: 0
        })
    }

    const [showNewMeetingForm, setShowMeetingForm] = useState(false)
    return (
        <div className='container mt-4 flex flex-col justify-center items-center h-full'>
            {!showNewMeetingForm && <Button className='bg-sdorange text-white' variant={'outline'} onClick={() => setShowMeetingForm(!showNewMeetingForm)}>New Meeting</Button>}

            {showNewMeetingForm && <>
                <div className=" gap-4 flex mb-4">
                    <div className='border rounded-md w-full'>
                        <input className='w-full p-4' type='datetime-local' value={time.starttime} onChange={(e: any) => settime({ ...time, starttime: e.target.value })} placeholder='Title'></input>
                    </div>
                    <div className='border rounded-md w-full'>
                        <input className='w-full p-4' type='datetime-local' value={time.endtime} onChange={(e: any) => settime({ ...time, endtime: e.target.value })} placeholder='Title'></input>
                    </div>
                </div>

                <div className="space-y-8 w-full">
                    <div className='flex flex-col space-y-4 w-full'>
                        <div className='border rounded-md w-full'>
                            <input className='w-full p-4' value={currentAgenda.title} onChange={(e: any) => setCurrentAgenda({ ...currentAgenda, title: e.target.value })} placeholder='Title'></input>
                        </div>
                        <div className='border rounded-md'>
                            <textarea className='w-full p-4 ' rows={4} value={currentAgenda.notes} placeholder='Notes' onChange={(e: any) => setCurrentAgenda({ ...currentAgenda, notes: e.target.value })}></textarea>
                        </div>
                        <div className='border rounded-md w-full'>
                            <input className='w-full p-4' value={currentAgenda.duration} placeholder='Duration' onChange={(e: any) => setCurrentAgenda({ ...currentAgenda, duration: e.target.value })}></input>
                        </div>

                    </div>

                    <Button className='bg-sdorange hover:bg-sdorangehover hover:outline-1' onClick={addagenda}>Add Agenda</Button>

                </div>

            </>}

            <div className='my-4 w-full space-y-4'>
                {agendas.map((agenda) => {
                    return (
                        <div className='flex p-4 border rounded-md shadow-md w-full justify-between items-center gap-4'>
                            <span className='text-2xl font-bold capitalize'>{agenda.title}</span>
                            <span className='text-xl flex-grow'>{agenda.notes}</span>
                            <span className='text-xl text-sdorange'> {agenda.duration}</span>
                        </div>
                    )
                })}
            </div>


            {showNewMeetingForm && <Button className='bg-sdorange hover:bg-sdorangehover hover:outline-1' onClick={onSubmit}>Save</Button>}

        </div>
    )
}

export default Dashboard