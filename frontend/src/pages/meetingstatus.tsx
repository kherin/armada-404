import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const MeetingStatus = () => {
    const [meetingstarted, setMeetingStarted] = useState(false);

    const [timer, setTimer] = useState();

    const startMeeting = () => {
        const meetingstring = localStorage.getItem('meeting');
        let meeting = {};
        if (meetingstring != null) {
            meeting = JSON.parse(meetingstring);
        }



    }

    return (
        <div className='container mt-4 flex flex-col justify-center items-center h-full'>

            {!meetingstarted && <Button className='bg-sdorange text-white' variant={'outline'} onClick={() => { }}>New Meeting</Button>}
            {meetingstarted && <>
                <div className='w-full flex h-full'>
                    <div className='w-1/2 min-2-[300px]'></div>
                    <div className='w-1/2 min-2-[300px]'></div>
                </div>

            </>}
        </div>
    )
}

export default MeetingStatus