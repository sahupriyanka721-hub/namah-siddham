import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await publicApi.getPortfolio();
        setProjects(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const types = ['All', 'Demonstration Project', 'Internal Product', 'Client Project'];

  const filteredProjects = projects.filter((p) => {
    if (selectedType === 'All') return true;
    return p.projectType === selectedType;
  });

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Portfolio & Case Studies"
        description="Explore software engineering architectures, digital platforms, and demonstration projects delivered by Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 to-navy-900 text-white py-16 sm:py-20 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-royal-400/30 text-royal-300 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 mr-1" />
            <span>Engineering Showcase &amp; Implementations</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Portfolio &amp; Case Studies
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-3xl leading-relaxed font-light">
            A transparent overview of our completed software systems, multi-vendor aggregator architectures, and internal digital platforms.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-surface-200 pb-4">
          <span className="text-xs font-bold text-surface-400 uppercase tracking-wider mr-2 font-mono flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Filter By:
          </span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-royal-500 text-white shadow-soft-sm'
                  : 'bg-white text-surface-600 border border-surface-200 hover:bg-surface-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-surface-500">Loading portfolio projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.slug || project._id}
                className="bg-white rounded-3xl overflow-hidden border border-surface-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
              >
                <div className="p-7 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-royal-600 uppercase tracking-wider font-mono">
                      {project.industry}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        project.projectType === 'Client Project'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : project.projectType === 'Internal Product'
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {project.projectType}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-navy-900 hover:text-royal-600 transition-colors">
                    <Link to={`/portfolio/${project.slug}`}>{project.name}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-surface-500 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Technologies tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-surface-100 border border-surface-200 text-navy-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-7 py-4 bg-surface-50 border-t border-surface-200 flex items-center justify-between text-xs">
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="font-bold text-royal-600 hover:underline flex items-center"
                  >
                    <span>Read Case Study</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>

                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-500 hover:text-navy-900 inline-flex items-center"
                    >
                      <span>Visit Live Link</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-surface-200">
            <h3 className="font-serif font-bold text-lg text-navy-900">No Projects Found</h3>
            <p className="text-xs text-surface-500 mt-1">
              No portfolio projects currently match the selected filter.
            </p>
          </div>
        )}
      </section>

      {/* Corporate Engineering Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-100 rounded-3xl p-8 sm:p-12 border border-surface-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-xl text-navy-900">
              Need a Custom Software or Marketplace Build?
            </h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              We specialize in custom web applications, multi-tenant databases, API integrations, and scalable business workflows.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-xs sm:text-sm shrink-0 shadow-md transition-all"
          >
            <span>Discuss Your Project</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
