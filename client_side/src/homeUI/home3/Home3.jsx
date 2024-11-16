import React from 'react'
import HeroSection from './HeroSection'
import AboutUsSection from './AboutUsSection'
import TestimonialsSection from './TestimonialsSection'
import Gallery from './Gallery'

const Home3 = () => {
  return (
    <>
    <div className='bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 text-gray-800'>
       <HeroSection />
       <AboutUsSection />
       <TestimonialsSection />
       <Gallery />
    </div>
    </>
  )
}

export default Home3