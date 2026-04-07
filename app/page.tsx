import Header from '@/components/header'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import About from '@/components/about'
import Career from '@/components/career'
import AISection from '@/components/ai-section'
import CodeShowcase from '@/components/code-showcase'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'
import AdvocateChatbotWrapper from '@/components/advocate-chatbot-wrapper'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Career />
      <AISection />
      <CodeShowcase />
      <Testimonials />
      <Footer />
      <AdvocateChatbotWrapper />
    </main>
  )
}
