'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Quote, Linkedin, ChevronLeft, ChevronRight, Building2, User
} from 'lucide-react'
import Image from 'next/image'

interface TestimonialItem {
  id: string
  name: string
  title: string
  company: string
  linkedinUrl?: string
  imageUrl?: string
  content: string
  relationship?: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [enabled, setEnabled] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/admin/testimonials/visible')
        if (res.ok) {
          const data = await res.json()
          setEnabled(data.enabled)
          setTestimonials(data.testimonials || [])
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Don't render if disabled or no testimonials
  if (!isLoading && (!enabled || testimonials.length === 0)) {
    return null
  }

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section id="testimonials" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-6">
            <Quote className="w-4 h-4 text-violet-400" />
            <span className="text-violet-400 text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Say</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Recommendations from colleagues and clients I&apos;ve had the pleasure of working with
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <Quote className="w-12 h-12 text-violet-400/50" />
              <p className="text-slate-500">Loading testimonials...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Testimonial Card */}
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTestimonial && (
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 relative"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6 md:top-8 md:left-8">
                      <Quote className="w-10 h-10 text-violet-500/30" />
                    </div>

                    {/* Content */}
                    <div className="pt-8 md:pt-6">
                      <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 italic">
                        &ldquo;{activeTestimonial.content}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center overflow-hidden">
                            {activeTestimonial.imageUrl ? (
                              <Image
                                src={activeTestimonial.imageUrl}
                                alt={activeTestimonial.name}
                                width={56}
                                height={56}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <User className="w-7 h-7 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-lg">{activeTestimonial.name}</h4>
                            <p className="text-slate-400">
                              {activeTestimonial.title} at {activeTestimonial.company}
                            </p>
                            {activeTestimonial.relationship && (
                              <p className="text-sm text-slate-500">{activeTestimonial.relationship}</p>
                            )}
                          </div>
                        </div>

                        {/* LinkedIn Link */}
                        {activeTestimonial.linkedinUrl && (
                          <a
                            href={activeTestimonial.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 rounded-lg text-[#0077B5] transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm font-medium">View on LinkedIn</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {testimonials.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? 'bg-violet-500 w-8'
                            : 'bg-slate-600 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </section>
  )
}
