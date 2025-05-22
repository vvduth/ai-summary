import UpgradeRequired from '@/components/common/UpgradeRequired'
import { getSubciptionStatus } from '@/lib/user'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const LoggedInLayout =async  ({children}: {
    children: React.ReactNode
}) => {
    const user = await currentUser()
    if (!user) {
        redirect('/sign-in')
    }

    const hasActiveSubscription = await getSubciptionStatus(user)

    if (!hasActiveSubscription) {
        return (
            <UpgradeRequired/>
        )
    }
  return (
    <div>{children}</div>
  )
}

export default LoggedInLayout