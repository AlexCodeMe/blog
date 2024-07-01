import { auth } from '@/auth'
import ProfileForm from '@/components/forms/profile-form'
import { redirect } from 'next/navigation'
import React from 'react'

export default function ProfilePage() {
    return <ProfileForm />
}
