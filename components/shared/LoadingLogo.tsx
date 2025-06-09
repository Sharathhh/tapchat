import Image from 'next/image';
import React from 'react'

type Props = {
    size?: number;
}

function LoadingLogo({ size=100 }: Props) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Image src="/logoipsum-339.svg" alt='logo' width={size} height={size} className='animate-pulse duration-800' />
        
    </div>
  )
}

export default LoadingLogo