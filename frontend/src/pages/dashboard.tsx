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

const formSchema = z.object({
    starttime: z.date(),
    endtime: z.date(),
    agenda: z.array(z.object({
        title: z.string(),
        duration: z.number(),
        notes: z.string(),
    }))
})

const Dashboard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    const [showNewMeetingForm, setShowMeetingForm] = useState(false)
    return (
        <div className='container flex flex-col justify-center items-center h-full'>
            <Button className='bg-sdorange text-white' variant={'outline'} >New Meeting</Button>

            {showNewMeetingForm && <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[50%]">
                    <FormField
                        control={form.control}
                        name="starttime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    {/* <Input type='date' placeholder="worx" {...field} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endtime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    {/* <Input type='password' placeholder="******" {...field} /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <Button className='bg-sdorange hover:bg-sdorangehover hover:outline-1 ' type="submit">Login</Button>
                </form>
            </Form>}


        </div>
    )
}

export default Dashboard