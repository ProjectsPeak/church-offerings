import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Settings Page"
}

export default function Page(){

    return (
        <main className="mx-auto my-10 space-y-4">
            <h1 className="text-center text-xl font-bold">Settings Page</h1>
        </main>
    )
}