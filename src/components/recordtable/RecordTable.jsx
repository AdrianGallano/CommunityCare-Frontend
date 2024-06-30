import {
    PlusCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Header from "../header/Header"
import LoadingMap from "../loading/LoadingMap"
import { useEffect, useState } from "react"

import {
    ChevronRight,
    ChevronLeft,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"

import NumberOfRowsPopOver from "./NumberOfRowsPopover"



export default function RecordTable({ page, pageAdj, columns, tableRows, asyncFetchFamilies, pageInfo, loading, onAddButtonHandler }) {
    const [isTableRowsEmpty, setIsTableRowsEmpty] = useState(false)
    const [isOpenNumberOfRowsPopover, setIsOpenNumberOfRowsPopover] = useState(false)
    const [currentNumberOfRows, setCurrentNumberOfRows] = useState("10")


    useEffect(() => {
        if ("members" in tableRows.props && tableRows.props.members.length == 0) {
            setIsTableRowsEmpty(true)
        } else if ("families" in tableRows.props && tableRows.props.families.length == 0) {
            setIsTableRowsEmpty(true)
        } else {
            setIsTableRowsEmpty(false)
        }
    }, [tableRows])

    useEffect(() => {
        asyncFetchFamilies(currentNumberOfRows)
    }, [currentNumberOfRows])

    function onSelectNumberOfRowsHandler(currentValue) {
        setCurrentNumberOfRows(currentValue)
        setIsOpenNumberOfRowsPopover(false)
    }

    function isOpenNumberOfRowsPopoverHandler() {
        setIsOpenNumberOfRowsPopover((currentValue) => !currentValue)
    }

    const tableColumns = columns.map((column, index) => {
        return index == 0 || index == columns.length - 2 ?
            <TableHead key={index}>{column}</TableHead> :
            index == columns.length - 1 ?
                <TableHead key={index}> <span className="sr-only">{column}</span> </TableHead> :
                <TableHead key={index} className="hidden md:table-cell">
                    {column}
                </TableHead>
    })


    return (<>
        <Header page={page} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="sm" className="h-8 gap-1" onClick={onAddButtonHandler}>
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add {pageAdj}
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>{page[0].toUpperCase() + page.slice(1)}</CardTitle>
                            <CardDescription>
                                Manage {page} and view their informations.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {tableColumns}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading
                                        ? <TableRow>
                                            <TableCell colSpan="100%">
                                                <div className="flex flex-col items-center p-6">
                                                    <LoadingMap size="h-8 w-8" />
                                                    <p className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Let  me cook...</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        : isTableRowsEmpty ?
                                            <TableRow>
                                                <TableCell className="scroll-m-20 border-b py-12 tracking-tight first:mt-0 text-center" colSpan="100%">
                                                    <p className="text-sm font-semibold text-gray-500">No {pageAdj} Record Exist</p>
                                                </TableCell>
                                            </TableRow> : tableRows}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex-col items-stretch gap-4">
                            <div className="flex justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <p className="font-medium text-sm text-gray-600 text-nowrap">Rows per page</p>
                                    <NumberOfRowsPopOver
                                        isOpenNumberOfRowsPopover={isOpenNumberOfRowsPopover}
                                        onSelectNumberOfRowsHandler={onSelectNumberOfRowsHandler}
                                        isOpenNumberOfRowsPopoverHandler={isOpenNumberOfRowsPopoverHandler}
                                        currentNumberOfRows={currentNumberOfRows}
                                    />
                                </div>
                                <div>
                                    <div>

                                        <Button variant="outline" size="icon" className="hidden md:inline-flex">
                                            <ChevronsLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="hidden md:inline-flex" >
                                            <ChevronsRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground self-end">
                                Showing <strong>{pageInfo.previous ? pageInfo.previous : 1}-{pageInfo.count}</strong> of <strong>{pageInfo.count}</strong> {page[0].toUpperCase() + page.slice(1)}
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    </>
    )
}




