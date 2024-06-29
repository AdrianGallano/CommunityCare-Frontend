import { toast } from "sonner"
import moment from "moment/moment"


export function toggleToast(title) {

    const dateChanged = moment().format('dddd, MMMM Do YYYY, [at] h:mm a');
    
    toast(title, {
        description: dateChanged,
        action: {
            label: "Close",
            onClick: () => console.log("Closed"),
        },
    })
}