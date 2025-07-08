'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog'
import { UserPlus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useMutationState } from '@/hooks/useMutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'





const addFriendSchema = z.object({
  email: z.string().min(1, { message: "This field can't be empty" }).email("Please enter a valid email"),
})

function AddFriendDialog() {




  const { mutate: createRequest, pending } = useMutationState(api.request.create)

  const form = useForm<z.infer<typeof addFriendSchema>>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      email: ''
    },
  })

  const handleSubmit = async (values: z.infer<typeof addFriendSchema>) => {
    try {
      await createRequest({ email: values.email })
      form.reset()
      toast.success("Friend request send!")


    } catch (error) {
      toast.error( error instanceof 
        ConvexError? error.data: "unexpected error occured"
      )
      console.error("Failed to send friend request:", error)
    }
  }

  return (
    <Dialog >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger className='bg-background' asChild >
            <Button variant='outline' size='icon'>
              <UserPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="block"
        style={{
          backgroundColor: "var(--dialog-bg)",
          color: "var(--dialog-text)",
          borderColor: "var(--dialog-border)",
        }}>
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
          <DialogDescription>
            Send request to connect with your friends!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={pending} type='submit' className='bg-blue-600 text-amber-50'>
                Send


              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendDialog
