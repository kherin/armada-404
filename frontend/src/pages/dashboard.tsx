import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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

    const form = useForm<any>({
    })

    const agendaForm = useForm<any>({
    })


    function onSubmit(e: any, values: any) {
        e.preventDefault();
        console.log(values)
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
        <div className='container flex flex-col justify-center items-center h-full'>
            {!showNewMeetingForm && <Button className='bg-sdorange text-white' variant={'outline'} onClick={() => setShowMeetingForm(!showNewMeetingForm)}>New Meeting</Button>}

            {showNewMeetingForm && <>
                <Form {...form}>
                    <form className=" gap-4 flex mb-4">
                        <div className='border rounded-md w-full'>
                            <input className='w-full p-4' type='datetime-local' value={time.starttime} onChange={(e: any) => settime({ ...time, starttime: e.target.value })} placeholder='Title'></input>
                        </div>
                        <div className='border rounded-md w-full'>
                            <input className='w-full p-4' type='datetime-local' value={time.endtime} onChange={(e: any) => settime({ ...time, endtime: e.target.value })} placeholder='Title'></input>
                        </div>
                    </form>
                </Form>

                <form onSubmit={agendaForm.handleSubmit(onSubmit)} className="space-y-8 w-full">
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

                </form>

            </>}

            <div className='my-4 w-full'>
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


            <Button className='bg-sdorange hover:bg-sdorangehover hover:outline-1' onClick={() => { }}>Save</Button>



        </div>
    )
}

export default Dashboard