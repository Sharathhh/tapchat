import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";


import { QueryCtx, MutationCtx } from "./_generated/server";

import { Id } from "./_generated/dataModel";

export const getConversation = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const conversationsMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
      .collect();

      const conversations = await Promise.all(

      conversationsMemberships?.map(async (membership) => {

      const conversation = await ctx.db.get(membership.conversationId);

        if (!conversation) {
          throw new ConvexError("Conversation could not be found");
        }

        return conversation;
      })
    );

    const conversationWithDetails = await Promise.all(
      conversations.map(async (conversation, index) => {

        const allconversationMembership = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversationId", (q) =>
            q.eq("conversationId", conversation?._id)
          )
          .collect();

          const lastMessage= await getLastMessageDetails({ctx,
             id: conversation.lastMessageId})


          const lastSeenMessage= conversationsMemberships[index]
          .lastSeenMessage ? await ctx.db.get(conversationsMemberships[index].lastSeenMessage!) : null;
          
          const  lastSeenMessageTime= lastSeenMessage?lastSeenMessage._creationTime : -1;


          const unseenMessages= await ctx.db.query("messages")
          .withIndex("by_conversationId", (q) =>q.eq("conversationId", conversation._id))
          .filter((q) => q.gt(q.field("_creationTime"), lastSeenMessageTime))
          .filter((q)=> q.neq(q.field("senderId"), currentUser._id)).collect()



        if (conversation.isGroup) {
          return { conversation, lastMessage, unseenCount: unseenMessages.length };
        } else {
          const otherMembership = allconversationMembership.filter(
            (membership) => membership.memberId != currentUser._id
          )[0];

          const otherMember = await ctx.db.get(otherMembership?.memberId);

          return {
            conversation,
            otherMember,
            lastMessage,
            unseenCount: unseenMessages.length,
          };
        }
      })
    );









    return conversationWithDetails
  },
});


const getLastMessageDetails= async ({
  ctx,
  id
}: {ctx: QueryCtx | MutationCtx, id: Id<"messages"> | undefined})=>{
  if(!id) return null



  const message= await ctx.db.get(id)


  if(!message) return null

  const sender= await ctx.db.get(message.senderId)

  if(!sender) return null

  const content= getMessageContent(message.type, message.content as unknown as string)


  return {
    content,
    sender: sender.username
  }
}


const getMessageContent= (type: string, content: string)=>{
  switch(type){
    case "text":
      return content;
    default:
    return "[Non-text]"
  }
}


