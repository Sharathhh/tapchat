"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMutationState } from "@/hooks/useMutation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CirclePlus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const createGroupFormSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  members: z
    .string()
    .array()
    .min(1, { message: "You must select at least 1 friend" }),
});

const CreateGroupDialog = () => {

  const friends = useQuery(api.friends.get);

  const { mutate: createGroup, pending } = useMutationState(
    api.conversation.createGroup
  );

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = form.watch("members", []);

  const unselectedFriends = useMemo(() => {
  
    return friends? friends.filter(friend=> !members.includes(friend._id)): []

  // Remove duplicate friends based on _id
  

}, [members.length, friends?.length])


  const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
    await createGroup({ name: values.name, members: values.members }).then(()=> {


        form.reset();
        toast.success("Group created successfully!")


    }).catch((error)=>{
      toast.error(error instanceof ConvexError? error.data: "Unexpected error occured while creating group")
    })
  };



  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <CirclePlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Group</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent
        className="block"
        style={{
          backgroundColor: "var(--dialog-bg)",
          color: "var(--dialog-text)",
          borderColor: "var(--dialog-border)",
        }}
      >
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Add your friends to get started!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Group name..." {...field} />
                  </FormControl>
                  <FormMessage className="text-red-900" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Friends</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          disabled={unselectedFriends.length === 0}
                        >
                          <Button className="w-full" variant="outline">
                            Select
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-full " >
                          {unselectedFriends.map((friend) => {


console.log("unselected",unselectedFriends)
                            return (
                              <DropdownMenuCheckboxItem
                                key={friend._id}
                                className="flex items-center gap-2 w-full p-2 bg-white "
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    form.setValue("members", [
                                      ...members,
                                      friend._id,
                                    ]);
                                  }
                                }}
                              >
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={friend.imageUrl} />

                                  <AvatarFallback>
                                    {friend.username.substring(0, 1)}
                                  </AvatarFallback>
                                </Avatar>
                                <h4 className="truncate">{friend.username}</h4>
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage  className="text-red-900"/>
                  </FormItem>
                );
              }}
            />

            {members && members.length ? (
  <Card className="flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar">
    {Array.from(
      new Map(
        friends
          ?.filter((friend) => members.includes(friend._id))
          .map((friend) => [friend._id, friend])
      ).values()
    ).map((friend) => (
      <div
        key={friend._id}
        className="flex flex-col items-center gap-1"
      >
        <div className="relative top-1">
          <Avatar>
            <AvatarImage src={friend.imageUrl} />
            <AvatarFallback>
              {friend.username.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <X
            className="text-muted-foreground w-4 h-4 absolute bottom-8 left-7 bg-muted rounded-full cursor-pointer"
            onClick={() =>
              form.setValue(
                "members",
                members.filter((id) => id !== friend._id)
              )
            }
          />
        </div>
        <p className="truncate text-sm">
          {friend.username.split(" ")[0]}
        </p>
      </div>
    ))}
  </Card>
) : null}


            <DialogFooter>
              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-600 text-white "
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
