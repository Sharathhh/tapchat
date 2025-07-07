import { error } from "console";
import { useMutation } from "convex/react";
import { useState } from "react";

export const useMutationState=(mutationToRun:any)=>{
    const [pending, setpending]= useState(false);
   

    console.log("This is pending state",pending)


    const mutationFn = useMutation(mutationToRun)


    const mutate=async(payload: any)=>{
        setpending(true);

        return mutationFn(payload)
        .then((res)=>{
            console.log("This is the response from the mutation",res)
            return res;
            

        })
        .catch((error)=>{
            throw error;
        })
        .finally(()=>{
            setpending(false);
        })
    }
return {mutate, pending}
}