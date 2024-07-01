'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
    mode?: "modal" | "redirect"
}

export default function LoginButton({
    children,
    mode
}: Props) {
    const router = useRouter()

    const onClick = () => {
        router.push("/auth/login")
    }

    return mode !== 'modal' ? (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    ) : (
        <p>modal</p>
        //TODO : Implement modal
    )
}