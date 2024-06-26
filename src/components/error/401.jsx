export default function Unauthorized() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                401, Unauthorized User.
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                hacker yarn? <a className="underline" href="/login">login here</a>
            </p>
        </div>
    )
}