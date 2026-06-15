import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ServicePillars from '@/components/ServicePillars'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'

// Lazy-load below-fold sections to improve LCP / initial bundle
const Testimonials  = dynamic(() => import('@/components/Testimonials'))
const FAQ           = dynamic(() => import('@/components/FAQ'))
const FounderQuote  = dynamic(() => import('@/components/FounderQuote'))
const FinalCTA      = dynamic(() => import('@/components/FinalCTA'))
const Footer        = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicePillars />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FounderQuote />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
