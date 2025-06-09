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
  
  import { ConvexError } from 'convex/values'
  import React, { Dispatch, SetStateAction } from 'react'
  import { toast } from 'sonner'
  
  type Props = {
    conversationId: Id<'conversations'>
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
  }
  
  function RemoveFriendDialog({ conversationId, open, setOpen }: Props) {
    const { mutate: removeFriend, pending } = useMutationState(api.friend.remove)
  
    const handleRemoveFriend = async () => {
      try {
        await removeFriend({ conversationId })
        toast.success('Removed friend')
        setOpen(false) // ✅ Close dialog on success
      } catch (error) {
        toast.error(
          error instanceof ConvexError ? error.data : 'Unexpected error occurred'
        )
      }
    }
  
    
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Messages will be deleted and you will
              not be able to message this user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel  disabled={pending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveFriend} disabled={pending}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default RemoveFriendDialog
  