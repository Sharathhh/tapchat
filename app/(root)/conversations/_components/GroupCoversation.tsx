import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback} from "@radix-ui/react-avatar";
import { Badge} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
type Props = {
  id: Id<"conversations">;
  name: string;
  clerkId?: string
  lastMessageSender?: string;
  lastMessageContent?: string;
  unseenCount: number;
};

function GroupConversations({
  id,
  name,
  lastMessageContent,
  lastMessageSender,
  clerkId,
  unseenCount
}: Props) {



  useEffect(() => {
    console.log("Rendering Group:", clerkId);
  }, [clerkId]);



  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarFallback>
              {name.charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
                <p className="font-semibold">
                  {lastMessageSender}
                  {":"} &nbsp;{" "}
                </p>{" "}
                <p className="truncate overflow-ellipsis">
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
        {unseenCount ? <Badge>
          {unseenCount}
        </Badge>: null}
      </Card>
    </Link>
  );
}

export default GroupConversations;
