import { auth } from '@/auth'
import ProfileForm from '@/components/forms/profile-form'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function SettingsPage() {
    const session = await auth()

    return session?.user?.name ? (
        <ProfileForm name={session?.user?.name} />
    ) : null
}
