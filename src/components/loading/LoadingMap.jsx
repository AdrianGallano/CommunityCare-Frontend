import { Map } from "lucide-react"

export default function LoadingMap({size="h-12 w-12"}){

    return (
        <Map className={`p-1.5 mb-2 border border-transparent rounded-full animate-spin text-white bg-black ${size}`} />
    )
} 