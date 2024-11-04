"use client";

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, User, Send, CheckCircle } from "lucide-react"
import mail from "@/assets/Home/ContactForm/envelope.png"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section className="w-[90%] mb-32 mx-auto rounded-2xl py-12 bg-none">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-7xl font-bold tracking-tighter sm:text-5xl bg-clip-text">
              Let's Connect
            </h2>
            <p className="max-w-[900px] text-zinc-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              Have a question or want to collaborate? We're just a message away. Reach out and let's create something amazing together.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl space-y-8 mt-12">
          <div className="rounded-lg bg-none text-card-foreground shadow-xl overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              {/* Left Column - Form */}
              <div className="bg-white/30 backdrop-blur-sm p-12 sm:p-12">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">Send Us a Message</h3>
                {isSubmitted ? (
                  <div className="flex flex-col items-center space-y-4 h-full justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                    <h3 className="text-2xl font-semibold">Thank you for reaching out!</h3>
                    <p className="text-zinc-500 text-center">We've received your message and will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                      <div className="relative">
                        <Input id="name" placeholder="Your full name" required className="pl-10 bg-white/30" />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                      <div className="relative">
                        <Input id="email" placeholder="you@example.com" type="email" required className="pl-10 bg-white/30" />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                      <Textarea id="message" placeholder="Your message here..." required className="min-h-[150px] bg-white/30" />
                    </div>
                    <Button className="w-full bg-[#9000BF] hover:bg-purple-700" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
              <div className="relative hidden md:block pt-8 backdrop-blur-lg">
                <Image
                  src={mail}
                  alt="Contact us"
                  width={300}
                  height={300}
                  className="object-cover w-[70%] h-[70%] mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300/60 to-purple-400/60 mix-blend-overlay" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/40 backdrop-blur-sm rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold mb-2">Get in Touch</h4>
                  <p className="text-sm text-zinc-600">We're here to help and answer any question you might have. We look forward to hearing from you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}