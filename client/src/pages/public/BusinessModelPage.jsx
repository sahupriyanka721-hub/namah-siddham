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
} from 'lucide-react';
import { AggregatorFlow } from '../../components/public/AggregatorFlow';
import { SeoMeta } from '../../components/public/SeoMeta';

export const BusinessModelPage = () => {
  const modelPillars = [
    {
      title: 'Customer Discovery',
      description:
        'Targeted search, structured categorization, and localized interfaces make it simple for consumers to find precise services and verified products.',
      icon: Search,
    },
    {
      title: 'Online Booking & Ordering',
      description:
        'Frictionless ordering experiences with upfront estimates, slot scheduling, clear cancellation terms, and verified order confirmations.',
      icon: CalendarCheck,
    },
    {
      title: 'Service Partner Coordination',
      description:
        'Local technicians, appliance specialists, and rental vehicle hosts receive automated dispatch notices with location and requirement details.',
      icon: Users2,
    },
    {
      title: 'Seller & Vendor Participation',
      description:
        'Digital storefronts and direct catalog management for retail suppliers, community artisans, and regional merchants.',
      icon: Store,
    },
    {
      title: 'Digital Platform Operations',
      description:
        'Centralized cloud infrastructure providing rating management, catalog curation, partner verification, and customer assistance.',
      icon: Settings,
    },
    {
      title: 'Business Collaboration',
      description:
        'Flexible engagement structures: revenue sharing, lead generation, subscription tiers, and corporate fleet accounts.',
      icon: Handshake,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="Business Model"
        description="Understand the multi-platform aggregator architecture and operational workflow of Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5 mr-1" />
            <span>Operational Architecture</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Our Aggregator Business Model
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Namah Siddham Corporation operates a multi-platform marketplace framework engineered to connect consumer demand with certified independent service providers, vehicle fleet operators, and specialized retail sellers.
          </p>
        </div>
      </section>

      {/* Visual Flow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
            Execution Pipeline
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
            End-To-End Fulfillment Flow
          </h2>
          <p className="text-sm text-charcoal-600 max-w-2xl">
            A structured four-tier orchestration linking consumers to skilled local capacity with high reliability.
          </p>
        </div>

        <AggregatorFlow />
      </section>

      {/* Key Functional Dimensions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
            Ecosystem Components
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
            Core Dimensions of Our Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-forest-950">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Commercial & Payment Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-serif font-bold text-base sm:text-lg">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Commercial Notice on Platform Payment Processing</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
            Namah Siddham Corporation Private Limited acts as the corporate operating and technology holding entity for multiple digital marketplaces. Transaction processing, customer invoicing, escrow arrangements, and commission settlements are managed independently according to each platform's distinct operating framework. Not every transaction across our portfolio is processed directly by the parent entity. For specific merchant terms, warranty conditions, or cancellation policies, please refer to the respective platform properties (HomeServixo, Carrento, Jainamshree, SuperiorMart).
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-forest-900 rounded-3xl p-10 text-white space-y-4">
          <h3 className="font-serif font-bold text-2xl text-white">
            Interested in Joining as an Aggregator Partner?
          </h3>
          <p className="text-sm text-sage-200 max-w-xl mx-auto font-light">
            We onboard verified service professionals, car rental fleets, and e-commerce vendors across our digital network.
          </p>
          <div className="pt-2">
            <Link
              to="/partners"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm shadow-md"
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
