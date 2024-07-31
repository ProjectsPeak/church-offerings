import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Giving Made Easy</h1>
          <p className="text-lg md:text-xl">
            Securely manage your church offerings and donations with our user-friendly platform.
          </p>
        </div>
       

        <Button asChild>
          <Link href="/auth/login"> Sign In</Link>
        </Button>
    
      </div>
    </section>
  )
}