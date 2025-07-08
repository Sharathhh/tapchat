import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
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

    // Fetch friendships where current user is either user1 or user2
    const friendships1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();

    const friendships2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    const friendships = [...friendships1, ...friendships2];



// Deduplicate friendships by their _id
const uniqueFriendshipsMap = new Map();
for (const f of friendships) {
  uniqueFriendshipsMap.set(f._id.toString(), f);
}
const uniqueFriendships = Array.from(uniqueFriendshipsMap.values());






    // Get actual friend user documents
    const friends = await Promise.all(
      uniqueFriendships.map(async (friendship) => {
        const friendId =
          friendship.user1 === currentUser._id
            ? friendship.user2
            : friendship.user1;

        const friend = await ctx.db.get(friendId);
        if (!friend) {
          console.warn(`Friend not found for ID: ${friendId}`);
          return null; // avoid throwing inside a Promise.all
        }

        return friend;
      })
    );

 

// Filter nulls and deduplicate friends by _id
const uniqueFriendsMap = new Map();
for (const friend of friends) {
  if (friend) uniqueFriendsMap.set(friend._id.toString(), friend);
}
const uniqueFriends = Array.from(uniqueFriendsMap.values());

return uniqueFriends;

  },
});
