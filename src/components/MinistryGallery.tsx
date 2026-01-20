'use client';

import Image from 'next/image';

const images = [
  { src: '/images/ministry/ministry-1.jpg', alt: 'OGN Community Outreach' },
  { src: '/images/ministry/ministry-2.jpg', alt: 'OGN Gathering' },
  { src: '/images/ministry/ministry-3.jpg', alt: 'OGN Worship' },
  { src: '/images/ministry/ministry-4.jpg', alt: 'OGN Book Study Group' },
  { src: '/images/ministry/ministry-5.jpg', alt: 'OGN Ministry Event' },
  { src: '/images/ministry/ministry-6.jpg', alt: 'OGN Fellowship' },
  { src: '/images/ministry/ministry-7.jpg', alt: 'OGN Community' },
  { src: '/images/ministry/ministry-9.jpg', alt: 'OGN Service' },
];

export function MinistryGallery() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
            Our Community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Life at <span className="gold-shimmer">Overcomers</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Glimpses of our global family gathering, worshipping, and serving together.
          </p>
        </div>
      </div>

      {/* Full-width Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden group ${
              index === 0 || index === 3 ? 'row-span-2' : ''
            }`}
          >
            <div className={`relative ${index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-square'} w-full`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">
                  {image.alt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
