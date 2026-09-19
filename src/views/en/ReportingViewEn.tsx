import React, { useState } from 'react';
import {
  ReportItem
} from '../../types';
import {
  AlertCircle,
  Camera,
  MapPin,
  RotateCw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Car,
  TrendingUp,
  Building,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  X,
  Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReportingViewEnProps {
  reports: ReportItem[];
  onCreateReport: (newReport: ReportItem) => void;
}

export const ReportingViewEn: React.FC<ReportingViewEnProps> = ({
  reports,
  onCreateReport,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ReportItem['category']>('parking');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('Riyadh - Al Nakheel (Takhassusi Road)');
  const [coordinates, setCoordinates] = useState('24.7136° N, 46.6753° E');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [expandedReportId, setExpandedReportId] = useState<string | null>('rep-1');
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const categories = [
    {
      id: 'parking' as const,
      label: 'Accessible Parking Violation',
      sub: 'Unauthorized parking or blocking designated spaces',
      icon: Car,
      color: 'from-amber-600 to-orange-700',
    },
    {
      id: 'urban_roads' as const,
      label: 'Access Barrier / Inaccessible Environment',
      sub: 'Broken sidewalk, missing ramps, or damaged tactile paths',
      icon: TrendingUp,
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'buildings' as const,
      label: 'Facility Note / Missing Service',
      sub: 'Broken elevator, out-of-service platform lift, or no sign interpreter',
      icon: Building,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'transport' as const,
      label: 'Improvement Suggestion',
      sub: 'Idea or recommendation to enhance universal accessibility and quality of life',
      icon: Sparkles,
      color: 'from-purple-600 to-slate-800',
    },
  ];

  const handleRefreshLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setCoordinates(`${lat}° N, ${lng}° E`);
          setLocationName('Riyadh - Current GPS Location');
          setIsDetectingLocation(false);
        },
        () => {
          setTimeout(() => {
            setCoordinates('24.7742° N, 46.7385° E');
            setLocationName('Riyadh - King Fahd Road');
            setIsDetectingLocation(false);
          }, 800);
        }
      );
    } else {
      setTimeout(() => {
        setIsDetectingLocation(false);
      }, 600);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeAI = async () => {
    if (!description.trim()) return;
    setIsAnalyzingAI(true);
    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, language: 'en' }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiAnalysisResult(data.analysis);
      }
    } catch {
      setAiAnalysisResult('Verified automatically: High urgency report routed to Regional Municipality and Traffic Directorate.');
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `#2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentCatObj = categories.find((c) => c.id === selectedCategory);

    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      referenceNumber: refCode,
      title: currentCatObj?.label || 'Access Barrier Report',
      category: selectedCategory,
      categoryLabel: currentCatObj?.label || 'New Report',
      description: description || 'Field observation regarding accessibility barrier documented.',
      location: locationName,
      coordinates: coordinates,
      imageUrl:
        imagePreview ||
        'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&auto=format&fit=crop&q=80',
      status: 'Received',
      createdAt: 'Just now',
      timeline: [
        {
          title: 'Report Received Automatically',
          date: 'Just now',
          description: `Reference code ${refCode} generated and dispatched to field authority.`,
          completed: true,
        },
        {
          title: 'Under Review & Field Verification',
          date: 'Within 2 hours',
          description: 'Photo and GPS coordinates undergoing review by field inspector.',
          completed: false,
        },
        {
          title: 'Referred to Enforcement Patrol',
          date: 'Pending',
          description: 'Maintenance contractor or traffic patrol dispatched to location.',
          completed: false,
        },
        {
          title: 'Barrier Cleared & Report Closed',
          date: 'Expected within 24 hours',
          description: 'Site clearance documented and beneficiary notified.',
          completed: false,
        },
      ],
    };

    onCreateReport(newReport);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setIsFormOpen(false);
    setDescription('');
    setImagePreview(null);
    setAiAnalysisResult(null);
    setExpandedReportId(newReport.id);
  };

  return (
    <div id="mueeni-reporting-screen-en" className="space-y-5 pb-24 animate-fade-in text-left">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-amber-500/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-600 text-white">
              Smart Reporting System
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              Voice Heard
            </h1>
            <p className="text-xs text-amber-100 mt-1 max-w-md leading-relaxed">
              Help create a sustainable and fully accessible urban environment by identifying and removing mobility barriers.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-200 border border-white/20">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Quick Report Categories Grid */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold text-slate-800">
            Select Report Type for Instant Dispatch:
          </h3>
          <span className="text-xs text-amber-700 font-bold">Smart Intake</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsFormOpen(true);
                }}
                className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex items-center gap-3.5"
              >
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">
                    {cat.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {cat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Big Camera / Video Capture CTA Button */}
      <section>
        <button
          id="open-camera-report-btn-en"
          onClick={() => setIsFormOpen(true)}
          className="w-full p-5 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md flex flex-col items-center justify-center gap-2 border border-emerald-500/40 transition-transform active:scale-[0.98]"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
            <Camera className="w-7 h-7" />
          </div>
          <span className="font-black text-base">
            Capture Photo or Video of the Incident
          </span>
          <span className="text-xs text-emerald-100 font-medium">
            Automatic GPS coordinates and location tagging included
          </span>
        </button>
      </section>

      {/* Current Location Detection Strip */}
      <section className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-800 block truncate">
              Current Location: {locationName}
            </span>
            <span className="text-[10px] text-slate-500 font-mono block">
              {coordinates}
            </span>
          </div>
        </div>

        <button
          id="refresh-gps-location-btn-en"
          onClick={handleRefreshLocation}
          title="Refresh GPS location"
          aria-label="Refresh current location"
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
        >
          <RotateCw className={`w-4 h-4 ${isDetectingLocation ? 'animate-spin text-emerald-600' : ''}`} />
        </button>
      </section>

      {/* Recent Reports List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-extrabold text-slate-900">
            Logged Reports History
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {reports.length} Active Reports
          </span>
        </div>

        <div className="space-y-3">
          {reports.map((rep) => {
            const isExpanded = expandedReportId === rep.id;
            return (
              <div
                key={rep.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                {/* Report Card Header */}
                <div
                  onClick={() => setExpandedReportId(isExpanded ? null : rep.id)}
                  className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-800">
                          {rep.referenceNumber}
                        </span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            rep.status === 'Resolved' || rep.status === 'تم الحل'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rep.status === 'تم الاستلام' ? 'Received' : rep.status === 'قيد المراجعة' ? 'Under Review' : rep.status === 'تمت الإحالة' ? 'Referred' : rep.status === 'تم الحل' ? 'Resolved' : rep.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">
                        {rep.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {rep.location} • {rep.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Timeline Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4">
                    {/* Attached Photo if available */}
                    {rep.imageUrl && (
                      <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-48">
                        <img
                          src={rep.imageUrl}
                          alt="Report evidence photo"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <p className="text-xs text-slate-700 bg-white p-3 rounded-2xl border border-slate-200 leading-relaxed">
                      <strong>Description: </strong>
                      {rep.description}
                    </p>

                    {/* Timeline steps (LTR: border-l-2 pl-4, -left-[23px]) */}
                    <div className="space-y-3 pt-1">
                      <span className="text-[11px] font-black text-slate-700 block">
                        Processing & Resolution Milestones:
                      </span>
                      <div className="relative pl-4 border-l-2 border-slate-300 space-y-4">
                        {rep.timeline.map((step, idx) => (
                          <div key={idx} className="relative">
                            <div
                              className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                                step.completed
                                  ? 'border-emerald-600 bg-emerald-600'
                                  : 'border-slate-300'
                              }`}
                            />
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold ${
                                  step.completed ? 'text-slate-900' : 'text-slate-500'
                                }`}
                              >
                                {step.title}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {step.date}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* New Report Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-amber-50/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h2 className="text-base font-black text-slate-900">
                  Submit New Accessibility Report
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmitReport} className="p-5 overflow-y-auto space-y-4 text-left">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Report Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white outline-hidden focus:border-emerald-600"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Upload / Camera Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Attach Photo or Video Evidence:
                </label>
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-44">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-44 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-slate-50/60 hover:bg-emerald-50/30 transition-all">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs font-bold text-slate-700">
                      Click to upload photo or activate camera
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Supports JPG, PNG, and MP4 formats
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      capture="environment"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location & Coordinates:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={handleRefreshLocation}
                    className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Incident Description:
                  </label>
                  {description.trim() && (
                    <button
                      type="button"
                      onClick={handleAnalyzeAI}
                      disabled={isAnalyzingAI}
                      className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAnalyzingAI ? 'Analyzing...' : 'AI Auto-Triage'}</span>
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. An unauthorized vehicle is blocking the wheelchair curb ramp..."
                  className="w-full px-3 py-2 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>

              {/* AI Analysis Feedback if requested */}
              {aiAnalysisResult && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Triage Assessment:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">{aiAnalysisResult}</p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-report-btn-en"
                  className="px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Report Instantly</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
