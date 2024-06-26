import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import CommunityImage from "../../assets/community.jpg"
import { useState } from "react"
import dataFetch from "../../services/api"
import { LoaderCircle } from "lucide-react"
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function LoginForm() {
    const [userData, setUserData] = useState({
        "username": "",
        "password": ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    async function handleButtonClick(e) {
        e.preventDefault()
        setLoading(true)
        setError(false)
        try {
            const data = await dataFetch("api/token/", "POST", userData)
            localStorage.setItem("access", data.access)
            localStorage.setItem("refresh", data.refresh)

            window.dispatchEvent(new Event("storage"));

            navigate("/dashboard")
        } catch (e) {
            setError(true)
            console.log(e.message)
        } finally {
            setLoading(false)
        }
    }

    function handleOnChange(e) {
        const { name, value } = e.target

        setUserData((prevUserData) => {
            return { ...prevUserData, [name]: value }
        })
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your username below to login to your account
                        </p>
                    </div>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="username"
                                placeholder="AdrianMolino"
                                autoComplete="username"
                                name="username"
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" autoComplete="current-password" onChange={handleOnChange} required />
                        </div>
                        {error &&
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Login Failed</AlertTitle>
                                <AlertDescription>
                                    please enter a valid username, and password.
                                </AlertDescription>
                            </Alert>}


                        {loading ? <Button disabled>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="w-full" onClick={handleButtonClick}>
                            Login
                        </Button>}

                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src={CommunityImage}
                    alt="Image"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
