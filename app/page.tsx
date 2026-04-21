import Header from '@/components/header'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import About from '@/components/about'
import Career from '@/components/career'
import Resume from '@/components/resume'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Career />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}
