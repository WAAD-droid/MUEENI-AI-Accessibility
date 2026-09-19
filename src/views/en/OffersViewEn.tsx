import React, { useState } from 'react';
import {
  OfferItem
} from '../../types';
import {
  Tag,
  Search,
  Gift,
  Copy,
  Check,
  ChevronRight,
  Coffee,
  Hotel,
  ShoppingBag,
  HeartPulse,
  Plane,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OffersViewEnProps {
  offers: OfferItem[];
  onOpenCampaign: () => void;
}

export const OffersViewEn: React.FC<OffersViewEnProps> = ({
  offers,
  onOpenCampaign,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOfferModal, setActiveOfferModal] = useState<OfferItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'medical_devices', label: 'Medical Equipment', icon: HeartPulse },
    { id: 'travel', label: 'Aviation & Transit', icon: Plane },
    { id: 'health', label: 'Health & Rehab', icon: HeartPulse },
    { id: 'hotels', label: 'Hotels & Stays', icon: Hotel },
    { id: 'shopping', label: 'Shopping & Vouchers', icon: ShoppingBag },
    { id: 'cafes', label: 'Cafes & Dining', icon: Coffee },
  ];

  const filteredOffers = offers.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="mueeni-offers-screen-en" className="space-y-5 pb-24 animate-fade-in text-left">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-700 text-white">
              Discounts & Benefits
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              Services & Discounts Portal
            </h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-md leading-relaxed">
              Exclusive discounts, accessible perks, and partner offers for MUEENI beneficiaries across the Kingdom.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-200 border border-white/20">
            <Tag className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Purple Saturday Promotional Banner */}
      <section
        onClick={onOpenCampaign}
        className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white border border-purple-400/40 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-500/30 flex items-center justify-center text-purple-200 border border-purple-400/30 shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-purple-500 text-white">
                Featured Initiative
              </span>
              <h3 className="text-sm font-black text-white">Purple Saturday Initiative</h3>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              Discounts up to 70% every Saturday throughout July
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-purple-300" />
      </section>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          id="offers-search-input-en"
          type="text"
          placeholder="Search by store, cafe, hotel, or promo code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-4 pl-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-hidden shadow-2xs"
        />
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-2xs shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.icon && React.createElement(cat.icon, { className: 'w-3.5 h-3.5' })}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredOffers.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveOfferModal(item)}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all p-4 cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div className="flex gap-3">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    {item.discount}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-1 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 font-bold truncate">
                  {item.company}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[10px]">
                Valid until: {item.validUntil}
              </span>
              <button
                className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1"
              >
                <span>Redeem Offer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Redeem / Promo Code Modal */}
      {activeOfferModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Header image banner */}
            <div className="relative h-36 bg-slate-100">
              <img
                src={activeOfferModal.imageUrl}
                alt={activeOfferModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveOfferModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                {activeOfferModal.discount}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-center">
              <div>
                <span className="text-xs font-bold text-emerald-700">
                  {activeOfferModal.company}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {activeOfferModal.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeOfferModal.description}
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-300 space-y-2">
                <span className="text-[11px] font-bold text-emerald-800 block">
                  Exclusive Promo Code:
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-xl font-black text-emerald-950 tracking-widest px-3 py-1 bg-white rounded-xl shadow-2xs">
                    {activeOfferModal.promoCode}
                  </span>
                  <button
                    id="copy-promo-code-btn-en"
                    onClick={() => handleCopyPromo(activeOfferModal.promoCode)}
                    className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-xs"
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copiedCode && (
                  <span className="text-[11px] font-bold text-emerald-700 block animate-fade-in">
                    Promo code copied! You can apply it at online checkout or present it at any branch.
                  </span>
                )}
              </div>

              <div className="text-[11px] text-slate-400 space-y-0.5">
                <p>Valid for all certified MUEENI beneficiaries</p>
                <p>Expiration Date: {activeOfferModal.validUntil}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveOfferModal(null)}
                className="w-full py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
