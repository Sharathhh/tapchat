import { Card } from '@/components/ui/card'
import React from 'react'


function ConversationFallback() {
  return (
    <Card className='hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground'>
        Select/start a converasation to get Started

    </Card>
    
  )
}

export default ConversationFallback