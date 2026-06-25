'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { createEventRegistration } from '@/lib/event-registrations';
import { ArrowRight, Calendar, CheckCircle, Clock, CreditCard, Loader2, MapPin, ShieldCheck, Users } from 'lucide-react';

const eventDetails = {
  title: 'Kids Night Fun Night Club',
  date: 'July 10, 2026',
  time: '5:00 PM - 9:00 PM',
  location: '7519 Mentor Ave Ste A106, Mentor, OH 44060',
  ages: 'Ages 10 and up',
  price: 50,
  image: '/images/events/kids-night-2026-07-10.jpg',
};

const customGivingLink = 'https://donate.stripe.com/9B64gA2lAfhT63T1Fvco00b';

export default function KidsNightPage() {
  return (
    <Suspense fallback={<KidsNightShell />}>
      <KidsNightContent />
    </Suspense>
  );
}

function KidsNightShell() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-amber-300" />
          <p className="text-gray-200">Loading Kids Night registration...</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function KidsNightContent() {
  const params = useSearchParams();
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrationSaved, setRegistrationSaved] = useState(false);

  const registered = params.get('registered') === '1';
  const canceled = params.get('canceled') === '1';
  const fieldClass = 'w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-950 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const registration = await createEventRegistration({
        eventSlug: 'kids-night-2026-07-10',
        eventTitle: eventDetails.title,
        parentName: formData.parentName.trim(),
        childName: formData.childName.trim(),
        childAge: formData.childAge.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        notes: formData.notes.trim(),
        status: 'registered',
        amount: eventDetails.price,
      });

      if (!registration.success) {
        throw new Error('Could not save the registration. Please try again.');
      }

      setRegistrationSaved(true);
      window.location.href = customGivingLink;
    } catch (err: any) {
      setError(err.message || 'Could not save the registration. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-28 pb-16 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 items-center max-w-6xl mx-auto">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <Image src={eventDetails.image} alt={eventDetails.title} fill priority className="object-cover" />
            </div>

            <div>
              {registered && (
                <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-400/10 p-4 text-green-100">
                  <div className="flex items-center gap-3 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    Registration received. Please complete the $50 Kids Night gift on the giving page.
                  </div>
                </div>
              )}

              {registrationSaved && (
                <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-400/10 p-4 text-green-100">
                  <div className="flex items-center gap-3 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    Registration saved. Opening the secure giving page now.
                  </div>
                </div>
              )}

              {canceled && (
                <div className="mb-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-amber-100">
                  Checkout was canceled. Your spot is not complete until the $50 gift is submitted.
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
                Kids Night Fun Night Club
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
                Kids Night is a safe, fun, and purpose-filled evening for ages 10 and up! Kids will enjoy games, dinner, a movie, and worship while parents get a well-deserved break. Spots are limited, so register today!
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Detail icon={<Calendar className="h-5 w-5" />} label="Date" value={eventDetails.date} />
                <Detail icon={<Clock className="h-5 w-5" />} label="Time" value={eventDetails.time} />
                <Detail icon={<Users className="h-5 w-5" />} label="Ages" value={eventDetails.ages} />
                <Detail icon={<MapPin className="h-5 w-5" />} label="Location" value={eventDetails.location} />
              </div>

              <div className="rounded-2xl bg-white text-gray-950 p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div>
                    <h2 className="text-2xl font-bold">Step 1: Register Your Child</h2>
                    <p className="text-sm text-gray-600">After this form, you will be sent to the secure giving page.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold uppercase text-gray-500">Suggested Gift</div>
                    <div className="text-3xl font-bold text-amber-600">$50</div>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Parent/guardian name" className={fieldClass} />
                    <input name="childName" value={formData.childName} onChange={handleChange} required placeholder="Child name" className={fieldClass} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input name="childAge" value={formData.childAge} onChange={handleChange} required placeholder="Child age" className={fieldClass} />
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email" className={`${fieldClass} sm:col-span-2`} />
                  </div>
                  <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder="Phone number" className={fieldClass} />
                  <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes for our team, allergies, or pickup details" className={`${fieldClass} min-h-24`} />

                  <div className="rounded-xl bg-amber-50 p-4 text-sm text-gray-700">
                    Admins will see this registration right away. On the giving page, click the $50 Kids Night button and type <strong>Kids Night</strong> in Stripe so the gift can be matched to this registration.
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
                  >
                    {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Saving Registration</> : <><CreditCard className="h-5 w-5" /> Continue to $50 Kids Night Gift</>}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="h-4 w-4" />
                    Secure payment powered by Stripe
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-4">
            {[
              ['5-6 PM', 'Games'],
              ['6-7:50 PM', 'Dinner & Movie'],
              ['8-8:45 PM', 'Worship'],
              ['9 PM', 'Pickup'],
            ].map(([time, label]) => (
              <div key={label} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-amber-600 font-bold">{time}</p>
                <p className="text-gray-950 font-semibold">{label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800">
              Back to all events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="flex items-center gap-3 text-amber-300 mb-2">
        {icon}
        <span className="text-sm font-semibold uppercase">{label}</span>
      </div>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}
