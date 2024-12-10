import { Metadata } from 'next'
import Image from 'next/image'
import { Motion } from '@/components/ui/motion'
import { TeamMember } from './team-member'
import Navbar from '@/components/global-comp/navbar'

export const metadata: Metadata = {
  title: 'About Us | Our Mission and Team',
  description: 'Learn about our mission and meet the team behind our success.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-32 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-16">About Us</h1>
        
        <section className="mb-24">
          <Motion
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are dedicated to revolutionizing the way people interact with technology. 
              Our mission is to create intuitive, powerful, and accessible solutions that 
              empower individuals and businesses to achieve their full potential in the 
              digital age.
            </p>
          </Motion>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Team</h2>
          <div className="space-y-24">
            <TeamMember
              name="Swaraj Kumar Biswal"
              role="IIT Kharagpur"
              imageUrl="/placeholder.svg?height=192&width=192"
              socialLinks={{
                twitter: "https://twitter.com/sarahjohnson",
                linkedin: "https://linkedin.com/in/sarahjohnson",
                github: "https://github.com/sarahjohnson"
              }}
              isReversed={false}
            />
            
            <TeamMember
              name="Swadhin Kumar Biswal"
              role="IIT Kharagpur"
              imageUrl="/placeholder.svg?height=192&width=192"
              socialLinks={{
                twitter: "https://twitter.com/michaelchen",
                linkedin: "https://linkedin.com/in/michaelchen",
                github: "https://github.com/michaelchen"
              }}
              isReversed={true}
            />
          </div>
        </section>
      </Motion>
    </div>
  )
}

