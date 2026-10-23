import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FolderGit2,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const PortfolioDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getPortfolioBySlug(slug);
        setProject(res.data?.data || null);
      } catch (err) {
        console.error('Failed to load portfolio detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-surface-500">Loading case study details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-navy-900">Project Not Found</h2>
        <p className="text-xs sm:text-sm text-surface-500">
          The requested portfolio project could not be found or is unpublished.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center text-xs font-bold text-royal-600 hover:underline"
        >
          ← Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title={project.seoTitle || `${project.name} — Portfolio Case Study`}
        description={project.seoDescription || project.shortDescription}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 text-white py-14 sm:py-18 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-surface-400">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-white">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-gold-400 font-semibold">{project.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="font-serif font-black text-2xl sm:text-4xl text-white">
                  {project.name}
                </h1>
                <span
                  className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                    project.projectType === 'Client Project'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : project.projectType === 'Internal Product'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}
                >
                  {project.projectType}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gold-400 uppercase tracking-wider font-mono">
                {project.industry} • {project.category}
              </p>
            </div>

            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Visit Project URL</span>
                <ExternalLink className="w-4 h-4 ml-1.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-4">
              <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif block">
                Case Study Overview
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-navy-900">
                Architectural Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-surface-600 leading-relaxed whitespace-pre-line">
                {project.detailedDescription || project.shortDescription}
              </p>
            </div>

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-4">
                <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif block">
                  Technology Stack
                </span>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  Frameworks, Libraries &amp; Infrastructure
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-surface-100 border border-surface-200 text-navy-900 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Metadata Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm space-y-4">
              <h4 className="font-serif font-bold text-sm text-navy-900 border-b border-surface-200 pb-3">
                Project Information
              </h4>

              <div className="space-y-3 text-xs text-surface-600">
                <div>
                  <span className="font-bold text-navy-900 block">Industry Sector:</span>
                  <span>{project.industry}</span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block">Project Category:</span>
                  <span>{project.category}</span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block">Project Classification:</span>
                  <span>{project.projectType}</span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block">Engineering Team:</span>
                  <span>Namah Siddham Corporation Private Limited</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-200">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Inquire Regarding Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetailPage;
