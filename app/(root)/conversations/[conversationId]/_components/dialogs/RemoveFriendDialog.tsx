'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutation'
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  conversationId: Id<'conversations'>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function RemoveFriendDialog({ conversationId, open, setOpen }: Props) {
  const router = useRouter()
  const { mutate: removeFriend, pending } = useMutationState(api.friend.remove)

  const handleRemoveFriend = async () => {
    try {
      router.push('/conversations') // redirect immediately before state changes
      await removeFriend({ conversationId })
      toast.success('Removed friend')
    } catch (error) {
      console.error('Failed to remove friend:', error)
      toast.error('Failed to remove friend')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent  className="block"
        style={{
          backgroundColor: "var(--dialog-bg)",
          color: "var(--dialog-text)",
          borderColor: "var(--dialog-border)",
        }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Messages will be deleted and you will
            not be able to message this user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveFriend} disabled={pending} className='bg-blue-600 text-amber-50'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveFriendDialog
