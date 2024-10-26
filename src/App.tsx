'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState('home')
  const [rotation, setRotation] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const backgroundImages = {
    home: "/placeholder.svg?height=1080&width=1920&text=Home",
    features: "/placeholder.svg?height=1080&width=1920&text=Features",
    contact: "/placeholder.svg?height=1080&width=1920&text=Contact"
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Simulated 360 Photo Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-100 ease-linear"
        style={{
          backgroundImage: `url('${backgroundImages[activeTab]}')`,
          transform: `rotate(${rotation}deg)`
        }}
      />

      {/* Navigation Tabs */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Expandable Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-20 bg-black bg-opacity-70 text-white transition-all duration-300 ease-in-out ${
          isExpanded ? 'h-[70vh] overflow-y-auto' : 'h-24 overflow-hidden'
        }`}
      >
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">360° Interactive Showcase</h1>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isExpanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
            </button>
          </div>
          
          <p className="text-lg md:text-xl mb-6">
            {isExpanded 
              ? "Explore our innovative product from every angle. Dive into the details and discover why it's the perfect choice for you."
              : "Click to expand and learn more about our innovative product..."}
          </p>

          {activeTab === 'home' && (
            <div className="text-sm md:text-base space-y-4">
              <p>Welcome to our cutting-edge product showcase. Here, you can explore every aspect of our revolutionary design.</p>
              {isExpanded && (
                <>
                  <p>Our product combines state-of-the-art technology with sleek aesthetics, providing an unparalleled user experience.</p>
                  <p>Scroll through this expanded view to discover more about what makes our product unique in the market.</p>
                  <img src="/placeholder.svg?height=300&width=500&text=Product" alt="Product showcase" className="w-full rounded-lg shadow-lg" />
                </>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="text-sm md:text-base space-y-4">
              <p>Discover the amazing features that set our product apart from the competition.</p>
              {isExpanded && (
                <>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Advanced AI-powered functionality</li>
                    <li>Seamless integration with existing systems</li>
                    <li>Energy-efficient design for sustainable use</li>
                    <li>Customizable interface to suit your preferences</li>
                    <li>Real-time data processing and analytics</li>
                  </ul>
                  <p>Each feature is meticulously designed to enhance your productivity and streamline your workflow.</p>
                  <img src="/placeholder.svg?height=300&width=500&text=Features" alt="Product features" className="w-full rounded-lg shadow-lg" />
                </>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="text-sm md:text-base space-y-4">
              <p>We're here to answer any questions you may have about our product.</p>
              {isExpanded && (
                <>
                  <p>Get in touch with us through any of the following methods:</p>
                  <ul className="list-none space-y-2">
                    <li>Email: contact@example.com</li>
                    <li>Phone: (123) 456-7890</li>
                    <li>Address: 123 Innovation Street, Tech City, TC 12345</li>
                  </ul>
                  <p>Our customer support team is available 24/7 to assist you with any inquiries or support needs.</p>
                  <img src="/placeholder.svg?height=300&width=500&text=Contact" alt="Contact us" className="w-full rounded-lg shadow-lg" />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}