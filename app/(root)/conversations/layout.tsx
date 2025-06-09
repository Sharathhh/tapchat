'use client'

import React, { useEffect } from 'react';
import ItemList from '@/components/shared/item-list/ItemList';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import DMConversationItem from './_components/DMConversationItem';
import CreateGroupDialog from './_components/CreateGroupDialog';
import GroupConversations from './_components/GroupCoversation';


type Props = React.PropsWithChildren<{}>;

function ConversationLayout({ children }: Props) {
  const conversations = useQuery(api.conversations.getConversation);



  useEffect(()=>{
    console.log("This is conversation",conversations)
  })




const renderIds= new Set();

  return (
    <>
      <ItemList title="Conversations" actions= {<CreateGroupDialog/>}>
        {!conversations ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          </div>
        ) : conversations.length === 0 ? (
          <p className="w-full h-full flex items-center justify-center">
            No Conversation found
          </p>
        ) : (
          conversations.map((conversationObj) => {


            const id= conversationObj.conversation._id

            if(renderIds.has(id))     // check for duplicate rendering

              return null
            
            renderIds.add(id)
      
           

            return conversationObj.conversation.isGroup ? 
            

          
            

                 <GroupConversations
                key={conversationObj.conversation._id}
                id={conversationObj.conversation._id}
                name={conversationObj.conversation.name || ''}
                lastMessageContent={conversationObj.lastMessage?.content}
                lastMessageSender={conversationObj.lastMessage?.sender}
                
            />
            
            : (
              <DMConversationItem
                key={conversationObj.conversation._id}
                id={conversationObj.conversation._id}
                username={conversationObj.otherMember?.username || ''}
                imageUrl={conversationObj.otherMember?.imageUrl || ''}
                lastMessageContent={conversationObj.lastMessage?.content}
                lastMessageSender={conversationObj.lastMessage?.sender}
                
            />
            );
          })
        )}
      </ItemList>

      {children}
    </>
  );
}

export default ConversationLayout;
