import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {  User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React, { useEffect } from "react";
type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
};

function DMConversationItem({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
  unseenCount
}: Props) {



  useEffect(() => {
    console.log("Rendering DM:", id);
  }, [id]);

  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} className=" w-10 h-10 rounded-3xl" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender}
                  {":"} &nbsp;{" "}
                </p>{" "}
                <p className="truncate overflow-ellipsis ">
                  {lastMessageContent}
                </p>
              </span>
            ) : (
              <p className="text-sm text-muted-foreground truncate">
                Start the conversation!
              </p>
            )}
          </div>
        </div>
          {unseenCount ? <Badge className="bg-blue-600 rounded-2xl border-0 text-white"  >
                  {unseenCount}
                </Badge>: null}
      </Card>
    </Link>
  );
}

export default DMConversationItem;
