import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function ChurchBranchesPage() {
  const branches = [
    {
      name: 'Painesville, OH',
      address: '7519 Mentor Ave, Suite A106',
      city: 'Painesville, OH 44077',
      type: 'Main Campus',
    },
    {
      name: 'Wellspring, Achimota',
      address: 'Achimota',
      city: 'Accra, Ghana',
      type: 'International Branch',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 to-orange-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <p className="text-cyan-400 tracking-[0.3em] text-sm uppercase mb-4 animate-fadeIn">
            Locations
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeInUp">
            Church Branches
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Locations Worldwide
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Join us at any of our locations for worship, fellowship, and growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {branches.map((branch, index) => (
                <div
                  key={branch.name}
                  className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-cyan-500 transition-all animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-xs font-medium uppercase">
                      {branch.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{branch.name}</h3>
                  <div className="space-y-2 text-gray-400">
                    <p className="flex items-start gap-2">
                      <span className="text-cyan-400">📍</span>
                      {branch.address}
                    </p>
                    <p className="pl-6">{branch.city}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-gray-500">Service Times:</p>
                    <p className="text-white mt-2">Sunday: 11:00 AM</p>
                    <p className="text-white">Wednesday: 6:00 PM</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16 animate-fadeInUp delay-400">
              <p className="text-gray-400 text-lg mb-6">
                Can't make it in person? Join us online!
              </p>
              <a
                href="/media"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-md font-medium transition-all"
              >
                Watch Live Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
