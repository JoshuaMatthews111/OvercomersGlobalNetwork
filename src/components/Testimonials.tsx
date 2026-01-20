'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "Joining a house church through OGN transformed my faith. The intimate gatherings and genuine discipleship have helped me grow in ways I never imagined possible.",
    name: "Sarah M.",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "As a leader trained by OGN, I've seen God move powerfully in our community. We started with 5 people in my living room, now we've multiplied into 3 house churches.",
    name: "David K.",
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The resources and teachings from OGN have equipped me to disciple others effectively. This network truly embodies the Acts model of church.",
    name: "Maria L.",
    location: "São Paulo, Brazil",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Finding OGN was an answer to prayer. The global community and home-to-home model has given me a family of believers across nations.",
    name: "James O.",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
            Testimonies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Stories of Transformation
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from believers around the world whose lives have been changed through our global network.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Testimonial Content */}
            <div className="pt-4">
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-200 hover:border-amber-500 hover:bg-amber-50 flex items-center justify-center transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-200 hover:border-amber-500 hover:bg-amber-50 flex items-center justify-center transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-amber-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
