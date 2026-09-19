import React, { useState } from 'react';
import {
  JobOpportunity
} from '../../types';
import {
  Briefcase,
  GraduationCap,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Accessibility,
  Laptop,
  Sun,
  Eye,
  Car,
  TrendingUp,
  X,
  Send,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JobsTrainingViewEnProps {
  opportunities: JobOpportunity[];
  onApplyJob: (jobId: string) => void;
}

export const JobsTrainingViewEn: React.FC<JobsTrainingViewEnProps> = ({
  opportunities,
  onApplyJob,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'jobs' | 'training'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');
  const [onlyMowaamah, setOnlyMowaamah] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  const filteredOpportunities = opportunities.filter((op) => {
    const matchesCategory = op.category === selectedCategory;
    const matchesSearch =
      op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity =
      selectedCity === 'all' ||
      op.location.toLowerCase().includes(selectedCity.toLowerCase()) ||
      (selectedCity === 'remote' && op.location.toLowerCase().includes('remote'));
    const matchesWorkType =
      selectedWorkType === 'all' ||
      op.type.toLowerCase().includes(selectedWorkType.toLowerCase());
    const matchesMowaamah =
      !onlyMowaamah || (op.accessibilityMatrix.ramps && op.accessibilityMatrix.reservedParking);

    return matchesCategory && matchesSearch && matchesCity && matchesWorkType && matchesMowaamah;
  });

  const handleApply = (jobId: string) => {
    onApplyJob(jobId);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    setShowAppliedToast(true);
    setTimeout(() => {
      setShowAppliedToast(false);
      setSelectedJob(null);
    }, 1800);
  };

  return (
    <div id="mueeni-jobs-screen-en" className="space-y-5 pb-24 animate-fade-in text-left">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-700 text-emerald-100 border border-emerald-500/30">
              Career & Training Hub
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              Empowerment & Future Portal
            </h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-md leading-relaxed">
              Explore job and training opportunities with accredited inclusive workplaces supporting Universal Accessibility.
            </p>
          </div>
          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md items-center justify-center text-white border border-white/20">
            <Briefcase className="w-7 h-7" />
          </div>
        </div>
      </section>

      {/* Main Switcher Tabs (Jobs / Co-op Training) */}
      <div className="flex rounded-2xl bg-slate-200/80 p-1.5 border border-slate-300 shadow-2xs">
        <button
          id="tab-jobs-btn-en"
          onClick={() => setSelectedCategory('jobs')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            selectedCategory === 'jobs'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Available Jobs</span>
        </button>

        <button
          id="tab-training-btn-en"
          onClick={() => setSelectedCategory('training')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            selectedCategory === 'training'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Co-op Internships</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex-1 relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            id="jobs-search-input-en"
            type="text"
            placeholder={
              selectedCategory === 'jobs'
                ? 'Search by title, skill, or company...'
                : 'Search co-op internships...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-4 pl-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-hidden shadow-2xs"
          />
        </div>

        {/* Filter Badges & Selects */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold focus:border-emerald-600 outline-hidden shadow-2xs"
          >
            <option value="all">All Locations</option>
            <option value="riyadh">Riyadh</option>
            <option value="jeddah">Jeddah</option>
            <option value="dammam">Dammam</option>
            <option value="remote">Remote Work</option>
          </select>

          <select
            value={selectedWorkType}
            onChange={(e) => setSelectedWorkType(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold focus:border-emerald-600 outline-hidden shadow-2xs"
          >
            <option value="all">All Work Types</option>
            <option value="remote">Fully Remote</option>
            <option value="full time">On-site / Full Time</option>
            <option value="hybrid">Hybrid / Flexible</option>
          </select>

          <button
            type="button"
            onClick={() => setOnlyMowaamah(!onlyMowaamah)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              onlyMowaamah
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>Mowaamah Accredited Only</span>
          </button>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700">No matching opportunities found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search criteria or filter tags</p>
          </div>
        ) : (
          filteredOpportunities.map((op) => (
            <div
              key={op.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 space-y-4"
            >
              {/* Job Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-sm shrink-0">
                    <Building2 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                        op.category === 'training'
                          ? 'bg-teal-100 text-teal-900 border-teal-200'
                          : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                      }`}>
                        {op.category === 'training' ? 'Training Program' : 'Job Opportunity'}
                      </span>
                      {op.applied && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {op.category === 'training' ? 'Registered' : 'Applied'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                      {op.title}
                    </h3>

                    {/* Organization / Provider */}
                    <p className="text-xs font-bold text-slate-700 mt-0.5">
                      {op.category === 'training'
                        ? `Training Provider: ${op.trainingProvider || op.company}`
                        : `Organization: ${op.company}`}
                    </p>

                    {/* Meta info: Location, Work/Training Type, Dates */}
                    <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-500 mt-1.5 font-medium">
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {op.location}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {op.category === 'training'
                          ? `Training Type: ${op.trainingType || op.type}`
                          : `Work Type: ${op.type}`}
                      </span>

                      {op.category === 'training' && op.trainingDate && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded-md">
                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                            <span>Program Period: {op.trainingDate}</span>
                          </span>
                        </>
                      )}

                      {op.deadline && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Deadline: {op.deadline}</span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Required Skills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="text-[11px] font-bold text-slate-600">Required Skills:</span>
                      {(op.skills || op.requirements.slice(0, 3)).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Logistics Accessibility Matrix */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-slate-700 flex items-center gap-1.5">
                    <Accessibility className="w-4 h-4 text-emerald-600" />
                    <span>Workplace Accessibility Matrix:</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700">
                    Universal Design Standards
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                  <div
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
                      op.accessibilityMatrix.ramps
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Ramps</span>
                  </div>

                  <div
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
                      op.accessibilityMatrix.reservedParking
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Reserved Parking</span>
                  </div>

                  <div
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
                      op.accessibilityMatrix.visualPaths
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visual Paths</span>
                  </div>

                  <div
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
                      op.accessibilityMatrix.lighting
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Adapted Lighting</span>
                  </div>

                  <div
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
                      op.accessibilityMatrix.assistiveTech
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Assistive Tech</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
                {op.salary && (
                  <span className="text-xs font-bold text-slate-600">
                    Compensation: <strong className="text-emerald-700">{op.salary}</strong>
                  </span>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    id={`view-job-details-${op.id}-en`}
                    onClick={() => setSelectedJob(op)}
                    className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                  >
                    View Details
                  </button>

                  {op.category === 'training' ? (
                    <button
                      id={`register-training-btn-${op.id}-en`}
                      onClick={() => handleApply(op.id)}
                      disabled={op.applied}
                      className={`px-5 py-2 rounded-2xl text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 ${
                        op.applied
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-teal-700 hover:bg-teal-800 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{op.applied ? 'Registered' : 'Register for Training'}</span>
                    </button>
                  ) : (
                    <button
                      id={`apply-job-btn-${op.id}-en`}
                      onClick={() => handleApply(op.id)}
                      disabled={op.applied}
                      className={`px-5 py-2 rounded-2xl text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 ${
                        op.applied
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{op.applied ? 'Applied' : 'Apply for Job'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Opportunity Details & Application Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-emerald-50/70">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  {selectedJob.company}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  {selectedJob.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              {/* Detailed Summary Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-slate-700">
                    {selectedJob.category === 'training' ? 'Provider:' : 'Organization:'}
                    <strong className="text-emerald-950 ml-1">{selectedJob.trainingProvider || selectedJob.company}</strong>
                  </span>
                  <span className="font-bold text-slate-700">
                    Location: <strong className="text-emerald-950">{selectedJob.location}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-100/80">
                  <span className="font-bold text-slate-700">
                    {selectedJob.category === 'training' ? 'Training Type:' : 'Work Type:'}
                    <strong className="text-emerald-950 ml-1">{selectedJob.trainingType || selectedJob.type}</strong>
                  </span>
                  {selectedJob.category === 'training' && selectedJob.trainingDate && (
                    <span className="font-bold text-teal-800">
                      Dates: {selectedJob.trainingDate}
                    </span>
                  )}
                  {selectedJob.deadline && (
                    <span className="font-bold text-amber-900">
                      Deadline: {selectedJob.deadline}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 mb-1">Role Description:</h4>
                <p className="leading-relaxed text-slate-600">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 mb-1.5">Requirements & Required Skills:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {(selectedJob.skills || []).map((skill, idx) => (
                    <li key={`skill-${idx}`} className="font-bold text-slate-800">{skill}</li>
                  ))}
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={`req-${idx}`}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-black text-slate-900">Certified Workplace Readiness:</h4>
                <p className="text-xs text-slate-500">
                  Site audited and equipped to accommodate motor and visual needs, ensuring safety and independence in the workplace.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>

              <button
                id="apply-job-confirm-btn-en"
                onClick={() => handleApply(selectedJob.id)}
                disabled={selectedJob.applied}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm transition-all ${
                  selectedJob.applied
                    ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                    : selectedJob.category === 'training'
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                {selectedJob.category === 'training' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{selectedJob.applied ? 'Already Registered' : 'Confirm Training Registration'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{selectedJob.applied ? 'Already Applied' : 'Instant Apply for Job'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applied Success Toast */}
      {showAppliedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border border-emerald-500 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span>Application submitted successfully and matched with employer!</span>
        </div>
      )}
    </div>
  );
};
