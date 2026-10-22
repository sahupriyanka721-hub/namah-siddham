import React, { useState, useEffect } from 'react';
import { Users2, Linkedin, ShieldCheck, User } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await publicApi.getTeam();
        setTeam(res.data.data || []);
      } catch (err) {
        console.error('Failed to load team profiles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Leadership & Governance"
        description="Meet the board of directors and corporate leadership team guiding Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Users2 className="w-3.5 h-3.5 mr-1" />
            <span>Corporate Governance</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Leadership & Board of Directors
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Namah Siddham Corporation Private Limited is guided by corporate leadership committed to building sustainable, ethical, and technology-driven digital platforms.
          </p>
        </div>
      </section>

      {/* Team Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-forest-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-charcoal-500 mt-3">Loading leadership profiles...</p>
          </div>
        ) : team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="w-16 h-16 rounded-xl object-cover border border-sage-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-16 h-16 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center font-bold text-xl border border-forest-100 ${
                        member.profileImage ? 'hidden' : 'flex'
                      }`}
                    >
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-forest-950">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed whitespace-pre-line">
                    {member.biography}
                  </p>
                </div>

                {member.linkedinUrl && (
                  <div className="px-6 py-3 bg-sage-50 border-t border-sage-100 flex items-center justify-between">
                    <span className="text-xs text-charcoal-500">Professional Profile</span>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-900 hover:text-gold-600 transition-colors inline-flex items-center text-xs font-semibold"
                    >
                      <Linkedin className="w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-sage-200 p-8 space-y-2">
            <ShieldCheck className="w-12 h-12 text-forest-800 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-forest-950">
              Corporate Governance Notice
            </h3>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Leadership and director profiles are administered in accordance with corporate disclosures under the Companies Act, 2013.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
