"use client";

import { useForm } from "react-hook-form";
import * as z from 'zod';
import { LoginSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { CardWrapper } from "./CardWrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";



export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    }); 

    const onSubmit = (values:z.infer<typeof LoginSchema>) => {
        console.log(values)
    }

 return (
       <CardWrapper headerLabel="Welcome back" actionLabel="Don't have an account?" actionHref="/auth/register">
             <Form {...form}>
               <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                   <div className="space-y-4">
                     <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="jumajafari@gmail.com" type="email"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )}/>

                     <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="******" type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )}/>
                   </div>
                   
                   <FormSuccess message=""/>
                   <FormError message=""/>
                   <Button type="submit" className="w-full">Login</Button>
               </form>
           </Form>
       </CardWrapper>
    )
}