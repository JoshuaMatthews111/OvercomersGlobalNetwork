import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function BooksPage() {
  const books = [
    {
      title: 'Advancing Kingdom Culture',
      description: 'Guidelines For the Local Assembly',
      image: '/images/books/book-1.png',
      price: '$15.99',
      preOrder: true,
    },
    {
      title: 'Master Your Days, Weeks, Months',
      description: '2026 Hand-guide to Success',
      image: '/images/books/book-2.png',
      price: '$15.99',
      preOrder: false,
    },
    {
      title: 'Advancing Kingdom Culture',
      description: 'Guidelines & Structure for the Local Assembly',
      image: '/images/books/book-3.jpg',
      price: '$15.99',
      preOrder: true,
    },
    {
      title: 'Exercising Dominion Over Your World',
      description: 'Through Spiritual Laws and Principles',
      image: '/images/books/book-4.png',
      price: '$15.99',
      preOrder: false,
    },
    {
      title: 'Divine Intimacy',
      description: 'The Believers Guide to Fellowship With God',
      image: '/images/books/book-5.png',
      price: '$15.99',
      preOrder: false,
    },
    {
      title: 'Exercising Dominion Over Your World',
      description: 'Through Spiritual Laws and Principles',
      image: '/images/books/book-6.png',
      price: '$15.99',
      preOrder: false,
    },
    {
      title: 'The Ultimate Journey With Jesus Christ',
      description: 'Foundational Teachings Every Believer Needs',
      image: '/images/books/book-7.png',
      price: '$15.99',
      preOrder: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-cyan-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <p className="text-orange-400 tracking-[0.3em] text-sm uppercase mb-4 animate-fadeIn gold-shimmer">
            Resources
          </p>
          <h1 className="text-5xl md:text-7xl font-bold animate-fadeInUp">
            <span className="shimmer-text">Books & Resources</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">
                  Grow in Your Faith
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Explore our collection of books, study guides, and resources designed to help
                you deepen your relationship with God and grow in your understanding of His Word.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp delay-200">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg border border-white/10 hover:border-orange-500 transition-all overflow-hidden group"
                >
                  <div className="relative w-full h-96 bg-gradient-to-br from-orange-900/20 to-cyan-900/20">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      <span className="gold-shimmer">{book.title}</span>
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{book.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-white font-bold text-lg">{book.price}</span>
                      {book.preOrder && (
                        <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                          Pre-Order
                        </span>
                      )}
                    </div>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-md font-medium transition-all">
                      {book.preOrder ? 'Pre-Order Now' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center animate-fadeInUp delay-300">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-md font-medium transition-all hover:scale-105"
              >
                <span className="shimmer-text">Contact Us for More Information</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
