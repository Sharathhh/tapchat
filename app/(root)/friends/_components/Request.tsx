import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks/useMutation';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { error } from 'console';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { Check, User, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    id: Id<"requests">;
    imageUrl: string,
    username: string,
    email: string
}

const Request = ({id,username, imageUrl, email}: Props) => 
    {

     const {mutate: denyRequest, pending: denyPending}= useMutationState(api.request.deny)


     const {mutate: acceptRequest, pending: acceptPending}= useMutationState(api.request.accept)


    
  return <Card className='w-full p-2 flex flex-row items-center justify-between gap-2'>
    <div className='flex items-center gap-4 truncate'> 
        <Avatar>
            <AvatarImage src={imageUrl} className='w-10 h-10 rounded-3xl'/>
            <AvatarFallback>
            <User/>
            </AvatarFallback>

        </Avatar>
        <div className="flex flex-col truncate">
            <h4 className="truncate">
                {username}
            </h4>
            <p className="text-xstext-muted-foreground truncate">
                {email}
            </p>
        </div>
        <div className="flex items-center gap-2">
        <Button size='icon' className='bg-blue-500 hover:bg-blue-600 text-white ' disabled={denyPending || acceptPending} 
        onClick={() => { acceptRequest({id}).then(()=>{
            toast.success("Friend request accepted")
        }).catch((error)=>{
            toast.error(error instanceof ConvexError? error.data: "Unexpected error occured")
        })
        }}>
        <Check />
        </Button>
        <Button size='icon' variant={'destructive'} className='bg-red-500 hover:bg-red-600' disabled={denyPending}
            onClick={()=>{denyRequest({id}).then(()=>{
                toast.success("Friend request denied")
            }).catch((error)=>{
                toast.error(error instanceof ConvexError? error.data: "Unexpected error occured")
            })
            }}>
                <X className='h-4 w-4'/>     

        </Button>
        </div>

    </div>
  </Card>
}


export default Request