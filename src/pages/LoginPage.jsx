import { useNavigate } from "react-router-dom"
import { useState } from "react"
import dataFetch from "../services/api"

import LoginForm from "../components/auth/LoginForm"


export default function LoginPage() {
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
        <LoginForm handleButtonClick={handleButtonClick} handleOnChange={handleOnChange} loading={loading} userData={userData} error={error} />
    )
}
