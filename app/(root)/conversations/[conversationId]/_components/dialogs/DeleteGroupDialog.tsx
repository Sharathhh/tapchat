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
  import React, { Dispatch,  SetStateAction} from 'react'
  import { toast } from 'sonner'


  
  type Props = {
    conversationId: Id<'conversations'>
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
  }
  
  function DeleteGroupDialog({ conversationId, open, setOpen }: Props) {

4




    const { mutate: deleteGroup, pending } = useMutationState(api.conversation.deleteGroup)
  
    const handleDeleteGroup = async () => {

    
    

      

      try {
        await deleteGroup({ conversationId })

        toast.success('Group Deleted')

        setOpen(false) // Close dialog on success
        console.log("Dialog open state:",open)




      } catch (error) {
        toast.error(
          error instanceof ConvexError ? error.data : 'Unexpected error occurred'
        )
      }
    }
  
    
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen} >
        <AlertDialogContent className="block"
        style={{
          backgroundColor: "var(--dialog-bg)",
          color: "var(--dialog-text)",
          borderColor: "var(--dialog-border)",
        }}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.All Messages will be deleted and you will
              not be able to message this group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending} >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={handleDeleteGroup} disabled={pending} className='bg-blue-600 text-amber-50'>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default DeleteGroupDialog


