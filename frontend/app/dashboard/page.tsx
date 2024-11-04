import { DashboardComponent } from '@/components/dashboard-comp/dashboard'
import { ExpandableSidebar } from '@/components/tool-comp/common-comp/expandable-sidebar'
import React from 'react'

const Dashboard = async () => {
  return (
    <div className='h-[100vh] bg-violet-200 flex'>
        <ExpandableSidebar />
        <DashboardComponent/>
    </div>
  )
}

export default Dashboard
