import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        image: v.string(),
        bio: v.optional(v.string()),
        email: v.string(),
        clerkId: v.string(),
    },

    handler: async (ctx, args) => {
        const userExists = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (userExists) return;

        // Create a user in db
        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            bio: args.bio,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0
        });
    }
});

export const getUserByClerkId = query({
    args: { clerkId: v.string()},
    handler: async(ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first()
        
        return user
    }
})

export const updateProfile = mutation({
    args: {
        fullname: v.string(),
        bio: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx)
        
        await ctx.db.patch(currentUser._id, {
            fullname: args.fullname,
            bio: args.bio
        })
    }
})


export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx){
    const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Unauthorized");

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .first();
        if(!currentUser) throw new Error("User not found");
    
    return currentUser;
}

export const isFollowing = query({
  args: {followingId: v.id("users")},
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx)

    const follow = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) => q.eq("followerId", currentUser._id).eq("followingId", args.followingId))
      .first()

    return !!follow
  }
})

export const toogleFollow = mutation({
  args: { followingId: v.id("users")},
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

     const existing = await ctx.db
      .query("follows")
      .withIndex("by_both", (q) => q.eq("followerId", currentUser._id).eq("followingId", args.followingId))
      .first()

      if(existing){
        //unfollow
        await ctx.db.delete(existing._id)
        await updateFollowCounts(ctx, currentUser._id, args.followingId, false);

        //Remove the notification
        const notification = await ctx.db
          .query("notifications")
          .withIndex("by_sender_receiver", (q) =>
            q.eq("senderId", currentUser._id).eq("receiverId", args.followingId))
          .first();

        if (notification) {
          await ctx.db.delete(notification._id);
        }

      } else {
        //follow
        await ctx.db.insert("follows", {
          followerId: currentUser._id,
          followingId: args.followingId
        })
        await updateFollowCounts(ctx, currentUser._id, args.followingId, true);

        // create a notification
        await ctx.db.insert("notifications", {
          receiverId: args.followingId,
          senderId: currentUser._id,
          type: "follow",
        })
      }
  }
})

async function updateFollowCounts(
  ctx: MutationCtx,
  followerId: Id<"users">,
  followingId: Id<"users">,
  isFollow: boolean
) {
  const follower = await ctx.db.get(followerId);
  const following = await ctx.db.get(followingId)

  if(follower && following){
    await ctx.db.patch(followerId, {
      following: follower.following + (isFollow ? 1 : - 1),
    });
    await ctx.db.patch(followingId, {
      followers: following.followers + (isFollow ? 1 : - 1)
    })
  }
}

export const getUserProfile = query({
  args: {id: v.id("users")},
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if(!user) throw new Error("User not found")

    return user
  }
})