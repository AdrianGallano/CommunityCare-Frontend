import React from "react";
import { LoaderCircle } from "lucide-react";




export default function Loading(){
    return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
        <LoaderCircle className="mr-2 h-16 w-16 animate-spin" />
        <p className=" border-b pb-2 text-2xl tracking-tight ">Sandali lang!</p>
    </div>)
}