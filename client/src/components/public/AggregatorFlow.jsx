import React from 'react';
import { ArrowRight, UserCheck, Layers, Users2, CheckCircle, Info } from 'lucide-react';

export const AggregatorFlow = () => {
  const steps = [
    {
      step: '01',
      title: 'Customer Discovery & Need',
      description:
        'Users discover tailored services or specialized products across our intuitive, category-specific web platforms.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Digital Platform Matching',
      description:
        'Our proprietary aggregator logic verifies requirements, checks regional availability, and matches with appropriate partners.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Partner / Seller Coordination',
      description:
        'Verified service technicians, fleet owners, or certified merchants receive the order details for prompt scheduling.',
      icon: Users2,
    },
    {
      step: '04',
      title: 'Fulfillment & Quality Assurance',
      description:
        'The order or service is completed at the doorstep or delivery address with clear verification and transparent support.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-12">
      {/* 4-Step Diagram Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 group-hover:bg-forest-900 group-hover:text-gold-300 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif font-black text-2xl text-sage-300 group-hover:text-gold-500 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-forest-950 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-forest-900 text-gold-300 flex items-center justify-center shadow-md">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Operational Clarification Note */}
      <div className="bg-sage-50 border border-sage-200 rounded-xl p-5 flex items-start space-x-3.5 text-xs sm:text-sm text-forest-900">
        <Info className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-forest-950">
            Multi-Model Operational Architecture
          </p>
          <p className="text-charcoal-600 leading-relaxed">
            The exact workflow, transaction processing, and service agreements vary across individual aggregator platforms depending on sector requirements. Payment arrangements, vendor payouts, and fulfillment terms are tailored specifically within each operating brand (HomeServixo, Carrento, Jainamshree, SuperiorMart).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AggregatorFlow;
