import { Card } from '@/components/ui/card'
import React from 'react'

type Props = React.PropsWithChildren

function ConversationContainer({children}: Props) {
  return (
    <Card className='w-full h-[cal(100svh-32px)] lg:h-full p-2 flex flex-col gap-2'>
    {children}
    </Card>
  )
}

export default ConversationContainer