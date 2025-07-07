import { use, useMemo } from "react"
import {MessageSquare, Users} from "lucide-react"
import { usePathname } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export const useNavigation=()=>{

    const pathname= usePathname()



    const requestsCount= useQuery(api.requests.count)
    
    const conversations= useQuery(api.conversations.getConversation)


    const unseenMessageCount= useMemo(()=>{
        return conversations?.reduce((acc, curr)=>{
            return acc+ curr.unseenCount
        },0)

    }, [conversations])

    const paths= useMemo(()=>[
        {
            name: "Conversations",
            href: "/conversations",
            icon: <MessageSquare/>,
            active: pathname.startsWith("/conversations"),
            count: unseenMessageCount

        },
        {
            name: "Friends",
            href: "/friends",
            icon: <Users/>,
            active: pathname === "/friends",
            count: requestsCount

        }

    ], [pathname, requestsCount, unseenMessageCount])


    return paths;
}

