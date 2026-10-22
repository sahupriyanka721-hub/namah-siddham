import React, { useState, useEffect } from 'react';
import { Search, Filter, Layers, ArrowUpRight } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { PlatformCard } from '../../components/public/PlatformCard';
import { SeoMeta } from '../../components/public/SeoMeta';
import { CardSkeleton } from '../../components/common/Skeleton';

export const EcosystemPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadPlatforms = async () => {
      try {
        const res = await publicApi.getPlatforms();
        setPlatforms(res.data.data || []);
      } catch (err) {
        console.error('Failed to load platforms:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPlatforms();
  }, []);

  const categories = ['all', ...new Set(platforms.map((p) => p.category))];

  const filteredPlatforms = platforms.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Our Digital Ecosystem"
        description="Explore the portfolio of digital marketplaces and aggregator platforms operated by Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 mr-1" />
            <span>Digital Marketplace Ecosystem</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Our Portfolio Platforms
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Namah Siddham Corporation Private Limited builds and operates specialized digital marketplaces designed to streamline discovery, booking, and fulfillment across essential everyday sectors.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-sage-200 shadow-soft-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-forest-900 text-gold-300 shadow-sm'
                    : 'bg-sage-50 text-charcoal-600 hover:bg-sage-100'
                }`}
              >
                {cat === 'all' ? 'All Platforms' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search platforms, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950 placeholder-charcoal-400"
            />
          </div>
        </div>
      </section>

      {/* Platform Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform._id} platform={platform} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-sage-200 p-8">
            <Layers className="w-12 h-12 text-sage-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-forest-950">No Platforms Found</h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Try adjusting your search criteria or view all platforms.
            </p>
          </div>
        )}
      </section>

      {/* Corporate Ecosystem Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-2xl p-8 text-white text-center space-y-3">
          <h3 className="font-serif font-bold text-xl">
            Are you a service vendor or digital merchant?
          </h3>
          <p className="text-xs sm:text-sm text-sage-200 max-w-2xl mx-auto font-light">
            Each platform in our ecosystem is powered by certified independent professionals and merchants. Register your interest to partner with our growing marketplace network.
          </p>
          <div className="pt-2">
            <a
              href="/partners"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gold-500 text-forest-950 text-xs font-bold hover:bg-gold-400 shadow-sm"
            >
              <span>Explore Partnership Opportunities</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcosystemPage;
