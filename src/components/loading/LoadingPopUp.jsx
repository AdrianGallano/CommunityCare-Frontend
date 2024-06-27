import React from "react";
import { LoaderCircle } from "lucide-react";


export default function LoadingPopUp(){
    return (
    <div className="fixed z-10 opacity-75 bg-gray-900 top-0 left-0 flex flex-col h-screen w-screen justify-center items-center">
        <LoaderCircle className="mr-2 h-16 w-16 animate-spin text-white" />
        <p className="text-2xl tracking-tight text-white">Please wait.</p>
    </div>)
}