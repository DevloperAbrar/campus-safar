import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Hero from '../components/home/Hero'
import Ticker from '../components/home/Ticker'
import ProductsSection from '../components/home/ProductsSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import StatsSection from '../components/home/StatsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FinalCTASection from '../components/home/FinalCTASection'
import { WaveDivider, CurveDivider, StadiumDivider, DiagonalDivider } from '../components/home/dividers'
import { homeSchema } from '../components/home/data'
import RecognitionSection from '../components/home/RecognitionSection'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  return (
    <>
      <SEO
        title="Software That Runs Your Campus & Business"
        description="CampusSafar -software for campuses and businesses. SF StudyBoard for JEE, NEET, Board prep with 50,000+ PYQs, virtual labs, AI doubt solver. Idea2Software for institutes and businesses."
        canonical="https://campussafar.com"
        schema={homeSchema}
      />
      <Navbar />

      <style>{`
        @media (max-width: 767px) {
          .products-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr 1fr !important; }
        }
        * { box-sizing: border-box; }
        .section-divider { display: block; margin: 0; padding: 0; line-height: 0; }
      `}</style>

      <Hero />
      <div className="section-divider"><WaveDivider fromColor="#0A1628" toColor="#FF5500" height={56} /></div>
      <Ticker />
      <div className="section-divider"><CurveDivider fromColor="#FF7A1A" toColor="#ffffff" height={64} /></div>

      <ProductsSection />

      <div className="section-divider"><StadiumDivider fromColor="#ffffff" toColor="#F8FAFF" height={64} /></div>
      <HowItWorksSection />
      <div className="section-divider"><WaveDivider fromColor="#0A1628" toColor="#F8FAFC" height={64} /></div>
      <StatsSection />

      <div className="section-divider">
        <DiagonalDivider fromColor="#F8FAFC" toColor="#04080F" height={56} direction="left" />
      </div>

      <TestimonialsSection />
      <RecognitionSection topFrom="#04080F" bottomTo="#F8FAFC" />
      {/* ^ note: bottomTo now stays light since FinalCTA's own divider handles the dark transition */}

      <FinalCTASection topFrom="#F8FAFC" />

      <Footer />
    </>
  )
}

export default Home