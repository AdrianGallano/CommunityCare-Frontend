
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const numberOfRows = [
    {
        value: "10",
        label: "10",
    },
    {
        value: "20",
        label: "20",
    },
    {
        value: "50",
        label: "50",
    },
    {
        value: "100",
        label: "100",
    },
]

export default function NumberOfRowsPopOver({ isOpenNumberOfRowsPopover, currentNumberOfRows, onSelectNumberOfRowsHandler, isOpenNumberOfRowsPopoverHandler }) {
    return (
        <Popover open={isOpenNumberOfRowsPopover} onOpenChange={isOpenNumberOfRowsPopoverHandler}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpenNumberOfRowsPopover}
                    className="w-[70px] justify-between text-gray-600"
                >
                    {numberOfRows
                        ? numberOfRows.find((row) => row.value === currentNumberOfRows)?.label
                        : "Select rows per page..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100px] p-0 text-left">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {numberOfRows.map((row) => (
                                <CommandItem
                                    key={row.value}
                                    value={row.value}
                                    onSelect={(currentValue) => onSelectNumberOfRowsHandler(currentValue)}
                                >
                                    {row.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentNumberOfRows === row.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}