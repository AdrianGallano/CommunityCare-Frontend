import {
    PlusCircle,
    LoaderCircle
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



export default function RecordTable({ page, pageAdj, columns, tableRows, pageInfo, loading, onAddButtonHandler }) {

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
                                                <LoaderCircle className="m-auto h-12 w-12 animate-spin" />
                                            </TableCell>
                                        </TableRow>
                                        : tableRows}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
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