import React from 'react';
import { Link } from 'react-router-dom';
import {
  Workflow,
  Search,
  CalendarCheck,
  Users2,
  Store,
  Settings,
  Handshake,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
} from 'lucide-react';
import { SeoMeta } from '../../components/public/SeoMeta';

export const BusinessModelPage = () => {
  const modelPillars = [
    {
      title: '1. Customer Discovery',
      description:
        'Targeted search, structured categorization, and localized interfaces make it simple for consumers to find precise services and verified products.',
      icon: Search,
    },
    {
      title: '2. Online Booking & Ordering',
      description:
        'Frictionless ordering experiences with upfront estimates, slot scheduling, clear cancellation terms, and verified order confirmations.',
      icon: CalendarCheck,
    },
    {
      title: '3. Service Partner Coordination',
      description:
        'Local technicians, appliance specialists, and rental vehicle hosts receive automated dispatch notices with location and requirement details.',
      icon: Users2,
    },
    {
      title: '4. Seller & Vendor Participation',
      description:
        'Digital storefronts and direct catalog management for retail suppliers, community artisans, and regional merchants.',
      icon: Store,
    },
    {
      title: '5. Digital Platform Operations',
      description:
        'Centralized cloud infrastructure providing rating management, catalog curation, partner verification, and customer assistance.',
      icon: Settings,
    },
    {
      title: '6. Business Collaboration',
      description:
        'Flexible engagement structures: revenue sharing, lead generation, subscription tiers, and corporate fleet accounts.',
      icon: Handshake,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="How Our Business Model Works"
        description="Understand the multi-platform aggregator architecture and operational workflow of Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 to-navy-900 text-white py-16 sm:py-20 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-royal-400/30 text-royal-300 text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5 mr-1" />
            <span>Operational Architecture &amp; Platform Workflows</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            How Our Business Model Works
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-3xl leading-relaxed font-light">
            Namah Siddham Corporation operates a multi-platform marketplace framework engineered to connect consumer demand with certified independent service providers, vehicle fleet operators, and specialized retail sellers.
          </p>
        </div>
      </section>

      {/* Visual Flow Section: Customer Need -> Platform -> Discovery -> Partner -> Fulfilment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
            Execution Pipeline
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
            End-To-End Fulfillment Architecture
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-2xl">
            A structured five-tier orchestration linking consumers to skilled local capacity with transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-9 h-9 rounded-full bg-royal-50 text-royal-600 border border-royal-200 font-bold text-xs mx-auto flex items-center justify-center">
              1
            </div>
            <h4 className="font-serif font-bold text-sm text-navy-900">Customer Need</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Household appliance repair, flexible vehicle mobility rental, satvik cultural goods, or multi-category products.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-9 h-9 rounded-full bg-royal-50 text-royal-600 border border-royal-200 font-bold text-xs mx-auto flex items-center justify-center">
              2
            </div>
            <h4 className="font-serif font-bold text-sm text-navy-900">Specialized Platform</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Navigating to category-dedicated platform properties (HomeServixo, Carrento, Jainamshree, SuperiorMart).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-9 h-9 rounded-full bg-royal-50 text-royal-600 border border-royal-200 font-bold text-xs mx-auto flex items-center justify-center">
              3
            </div>
            <h4 className="font-serif font-bold text-sm text-navy-900">Booking / Ordering</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Transparent preliminary diagnostic rates, vehicle search, or product catalog add-to-cart.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-9 h-9 rounded-full bg-royal-50 text-royal-600 border border-royal-200 font-bold text-xs mx-auto flex items-center justify-center">
              4
            </div>
            <h4 className="font-serif font-bold text-sm text-navy-900">Relevant Partner</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Matched with nearby background-checked technicians, car owners, or verified retail merchants.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-9 h-9 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-bold text-xs mx-auto flex items-center justify-center">
              5
            </div>
            <h4 className="font-serif font-bold text-sm text-navy-900">Fulfillment Model</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Executed according to the platform's documented operating model, warranty terms, and support standards.
            </p>
          </div>
        </div>
      </section>

      {/* Key Functional Dimensions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
            Ecosystem Components
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
            Core Dimensions of Our Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-royal-50 border border-royal-100 flex items-center justify-center text-royal-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Commercial & Payment Notice (Mandatory from prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-serif font-bold text-base sm:text-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Important Operating &amp; Payment Disclosure</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
            Namah Siddham Corporation Private Limited acts as the corporate operating and technology holding entity for multiple digital marketplaces. Transaction processing, customer invoicing, escrow arrangements, and commission settlements are managed independently according to each platform's distinct operating framework. Not every transaction across our portfolio is processed directly by the parent entity. Individual platforms maintain independent fulfillment, merchant agreements, and payment arrangements.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-navy-950 rounded-3xl p-10 text-white space-y-4 border border-navy-800">
          <h3 className="font-serif font-bold text-2xl text-white">
            Interested in Joining as an Aggregator Partner?
          </h3>
          <p className="text-xs sm:text-sm text-surface-400 max-w-xl mx-auto font-light">
            We onboard verified service professionals, car rental fleets, and e-commerce vendors across our digital network.
          </p>
          <div className="pt-2">
            <Link
              to="/partners"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              <span>Submit Partnership Application</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessModelPage;
