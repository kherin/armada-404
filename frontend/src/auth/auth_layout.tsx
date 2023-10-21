import { Outlet } from '@tanstack/react-router'

const AuthLayout = () => {
    return (
        <div className='min-w-screen w-screen h-screen flex items-center justify-center bg-auth bg-no-repeat bg-cover'>
            <Outlet />
        </div>
    )
}

export default AuthLayout