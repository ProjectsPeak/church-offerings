import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Settings Page"
}

export default async function SettingsPage(){
    const session = await auth()
    return (
        <main className="mx-auto my-10 space-y-4">
            <h1 className="text-center text-xl font-bold">Settings Page</h1>
             <div className="text-center">{JSON.stringify(session)}</div>
        </main>
    )
}