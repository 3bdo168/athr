import Hero from '../components/sections/Hero'
import ClientLogos from '../components/sections/ClientLogos'
import ServicesSection from '../components/sections/ServicesSection'
import Stats from '../components/sections/Stats'
import Process from '../components/sections/Process'
import PortfolioPreview from '../components/sections/PortfolioPreview'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import Newsletter from '../components/sections/Newsletter'
import CTA from '../components/sections/CTA'
import AdBanner from '../components/AdBanner'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 pt-20">
      <SEO 
        title="Digital Marketing & Web Development" 
        path="/"
      />
      <AdBanner placement="home_top" />
      <Hero />
      <ClientLogos />
      <AdBanner placement="home_middle" />
      <ServicesSection />
      <Stats />
      <Process />
      <PortfolioPreview />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <AdBanner placement="home_bottom" />
      <CTA />
    </div>
  )
}