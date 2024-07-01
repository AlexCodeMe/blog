import { logout } from '@/actions/logout'
import React, { ReactNode } from 'react'

export default function LogoutButton({ children }: { children: ReactNode }) {
    const onClick = () => {
        logout()
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
