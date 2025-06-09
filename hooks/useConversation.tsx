import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useConversation=()=>{

    const params= useParams()


    const conversationId= useMemo(()=>//similar as useffect updated when certain other values got updated
        params?.conversationId || ("" as 
            string), [params?.conversationId])



            const isActive= useMemo(()=>
                !!conversationId, [conversationId])



            return {
                isActive, conversationId
            }

}