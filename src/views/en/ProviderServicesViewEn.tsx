import React, { useState } from 'react';
import {
  Tag,
  Building2,
  CheckCircle2,
  Edit3,
  Plus,
  Eye,
  Sliders,
  Sparkles,
  MapPin,
  Clock,
  X,
  Save,
  Globe,
  Check,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ProviderServiceItemEn {
  id: string;
  name: string;
  description: string;
  category: string;
  accessibilityFeatures: string[];
  availability: string;
  status: 'active' | 'draft' | 'under_review';
  beneficiariesCount: number;
}

const initialServicesEn: ProviderServiceItemEn[] = [
  {
    id: 'srv-1',
    name: 'Tamkeen Accessible Telecom & High-Speed Data Package',
    description: 'Permanent 50% discount on all postpaid, prepaid, and high-speed fiber internet packages, with unlimited minutes and data for government and educational portals.',
    category: 'Telecom & Connectivity',
    accessibilityFeatures: [
      '24/7 Sign Language Video Customer Support',
      'Audio & Electronic Invoices compatible with screen readers',
      'Full exemption from installation and home delivery fees'
    ],
    availability: 'Available across all branches & mystc digital app',
    status: 'active',
    beneficiariesCount: 1840,
  },
  {
    id: 'srv-2',
    name: 'Instant Video Customer Service in Sign Language',
    description: 'Direct high-definition video call with certified sign language customer representatives to complete transactions, activate plans, and resolve technical inquiries.',
    category: 'Accessible Support',
    accessibilityFeatures: [
      'HD Video optimized for lip-reading and sign gestures',
      'Certified interpreters from Saudi Hearing Disability Association',
      'Instant response time under 60 seconds'
    ],
    availability: 'Available via app 24/7 nationwide',
    status: 'active',
    beneficiariesCount: 920,
  },
  {
    id: 'srv-3',
    name: 'Dedicated On-Site Home Tech Support & Maintenance',
    description: 'Free on-site home visits for router installation, fiber optic setup, and technical troubleshooting with full consideration for accessibility needs.',
    category: 'Field Technical Support',
    accessibilityFeatures: [
      'Technicians trained in disability etiquette protocols',
      'Priority home appointment booking with SMS confirmations',
      'Complimentary Wi-Fi range extenders'
    ],
    availability: 'Nationwide coverage across all cities and provinces',
    status: 'active',
    beneficiariesCount: 460,
  },
  {
    id: 'srv-4',
    name: 'Assistive Smart Devices & Hardware Accessibility Program',
    description: 'Special subsidy and zero-interest installments on smartphones and tablets configured with voice feedback, screen magnifiers, and electronic Braille display support.',
    category: 'Assistive Tech & Devices',
    accessibilityFeatures: [
      'Pre-configured with TalkBack/VoiceOver & high-contrast themes',
      'Comprehensive device warranty with express replacement',
      'Free 1-on-1 accessibility onboarding session'
    ],
    availability: 'Available in 45 universal-access certified flagships',
    status: 'active',
    beneficiariesCount: 680,
  }
];

interface ProviderServicesViewEnProps {
  onNavigate?: (tab: string) => void;
}

export const ProviderServicesViewEn: React.FC<ProviderServicesViewEnProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<ProviderServiceItemEn[]>(initialServicesEn);
  const [editingService, setEditingService] = useState<ProviderServiceItemEn | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Telecom & Connectivity');
  const [newServiceAvailability, setNewServiceAvailability] = useState('Branches & Digital App');
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [newFeaturesList, setNewFeaturesList] = useState<string[]>([
    'Universal Accessibility Compliant',
    'Priority Service for Mu\'ini Cardholders'
  ]);

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setNewFeaturesList([...newFeaturesList, newFeatureInput.trim()]);
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setNewFeaturesList(newFeaturesList.filter((_, i) => i !== index));
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServiceDesc.trim()) return;

    const newService: ProviderServiceItemEn = {
      id: `srv-${Date.now()}`,
      name: newServiceName,
      description: newServiceDesc,
      category: newServiceCategory,
      accessibilityFeatures: newFeaturesList.length > 0 ? newFeaturesList : ['Universal Accessibility Compliant'],
      availability: newServiceAvailability,
      status: 'active',
      beneficiariesCount: 0,
    };

    setServices([newService, ...services]);
    setIsAddModalOpen(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });

    // Reset Form
    setNewServiceName('');
    setNewServiceDesc('');
    setNewFeaturesList(['Universal Accessibility Compliant']);
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServices(services.map((s) => (s.id === editingService.id ? editingService : s)));
    setEditingService(null);
  };

  return (
    <div id="provider-services-screen-en" className="space-y-6 pb-20 animate-fade-in text-left" dir="ltr">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Accessible Services Management
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Review, configure, and publish accessible services tailored for people with disabilities
              </p>
            </div>
          </div>
        </div>

        <button
          id="btn-add-new-service-en"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </section>

      {/* Summary Metrics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Total Active Services</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{services.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">100% Active & Published</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Beneficiaries Reached</span>
          <span className="text-2xl font-black text-indigo-900 font-mono mt-1 block">3,900+</span>
          <span className="text-[10px] text-indigo-600 font-bold mt-0.5 block">Via digital cards</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Accessibility Features</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">14 Features</span>
          <span className="text-[10px] text-slate-500 font-bold mt-0.5 block">Universal Code Compliant</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Beneficiary Satisfaction</span>
          <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">98.2%</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">Rating ★★★★★</span>
        </div>
      </section>

      {/* Services List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            Published Services & Accommodations
          </h2>
          <span className="text-xs text-slate-500 font-bold">
            {services.length} Active Services
          </span>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-4"
            >
              {/* Top Meta: Category, Status, Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {service.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{service.status === 'active' ? 'Active & Live' : 'Draft'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {service.beneficiariesCount} Active Beneficiaries
                  </span>
                  {/* Edit / Manage Button */}
                  <button
                    onClick={() => setEditingService(service)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit / Manage</span>
                  </button>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  {service.description}
                </p>
              </div>

              {/* Accessibility Features */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 block">
                  Accessibility Accommodations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.accessibilityFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium">
                  <strong>Availability:</strong> {service.availability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit / Manage Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-700" />
                <span>Edit & Manage Service</span>
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Name</label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Status</label>
                  <select
                    value={editingService.status}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="active">Active & Live</option>
                    <option value="draft">Draft</option>
                    <option value="under_review">Under Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Availability & Coverage</label>
                <input
                  type="text"
                  value={editingService.availability}
                  onChange={(e) => setEditingService({ ...editingService, availability: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-700" />
                <span>Launch New Accessible Service</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Universal Digital Access Bundle..."
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description & Privileges *</label>
                <textarea
                  rows={3}
                  placeholder="Describe the service details and how beneficiaries with disabilities can benefit..."
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="Telecom & Connectivity">Telecom & Connectivity</option>
                    <option value="Accessible Support">Accessible Support</option>
                    <option value="Field Technical Support">Field Technical Support</option>
                    <option value="Assistive Tech & Devices">Assistive Tech & Devices</option>
                    <option value="Commercial Discounts">Commercial Discounts</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Availability</label>
                  <input
                    type="text"
                    placeholder="Branches, app, delivery..."
                    value={newServiceAvailability}
                    onChange={(e) => setNewServiceAvailability(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              {/* Accessibility Features Adder */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Accessibility Accommodations</label>
                <div className="flex gap-1.5 mb-2">
                  <input
                    type="text"
                    placeholder="e.g., Sign language, screen reader support..."
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {newFeaturesList.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Service Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
