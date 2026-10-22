import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, User, ArrowRight, Search } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await publicApi.getNews();
        setArticles(res.data.data || []);
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filtered = articles.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="News & Corporate Updates"
        description="Latest news, product announcements, expansion updates, and official statements from Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Newspaper className="w-3.5 h-3.5 mr-1" />
            <span>Official Communications</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            News & Announcements
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Stay updated on new platform rollouts, business milestones, partner initiatives, and corporate announcements.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-soft-sm max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news & updates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-forest-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-charcoal-500 mt-3">Loading news articles...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <article
                key={item._id}
                className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span className="font-semibold text-gold-600 uppercase tracking-wider font-serif">
                      {item.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-forest-950 hover:text-forest-800 transition-colors leading-snug">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="px-6 py-4 bg-sage-50 border-t border-sage-100 flex items-center justify-between">
                  <span className="text-xs text-charcoal-500 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-gold-600" />
                    {item.author}
                  </span>
                  <Link
                    to={`/news/${item.slug}`}
                    className="text-xs font-bold text-forest-900 hover:text-forest-700 inline-flex items-center group"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-sage-200 p-8 space-y-2">
            <Newspaper className="w-12 h-12 text-sage-300 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-forest-950">No Articles Found</h3>
            <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
              There are currently no published announcements matching your filter.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default NewsPage;
