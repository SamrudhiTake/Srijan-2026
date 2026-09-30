import React, { useState } from 'react';
import { User, Mail, Phone, School, BookOpen, GraduationCap, CheckSquare, Square, AlertCircle, Loader2 } from 'lucide-react';

export default function IndividualRegistrationForm({ event, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '1st Year',
  });

  const [terms, setTerms] = useState({
    infoCorrect: false,
    rulesAgreed: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    if (!formData.college.trim()) errs.college = 'College/Institute name is required';
    if (!formData.branch.trim()) errs.branch = 'Branch/Department is required';
    if (!formData.year.trim()) errs.year = 'Year of study is required';

    if (!terms.infoCorrect) errs.infoCorrect = 'Please confirm your information is correct';
    if (!terms.rulesAgreed) errs.rulesAgreed = 'Please agree to Srijan event rules and guidelines';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        eventId: event.id,
        registrationType: 'individual',
        participant: {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim().replace(/\D/g, ''),
          college: formData.college.trim(),
          branch: formData.branch.trim(),
          year: formData.year.trim(),
        },
        termsAccepted: terms.infoCorrect && terms.rulesAgreed,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in" noValidate>
      {/* SECTION 1: Personal Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-300 font-semibold">
            1. Personal Details
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Full Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.name ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Email Address <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.email ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Mobile Number <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.phone ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 2: College Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-300 font-semibold">
            2. College Details
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* College Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              College / Institute Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. Government College of Engineering"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.college ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.college && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.college}</p>}
          </div>

          {/* Branch / Department */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Branch / Department <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g. Computer Science / ENTC"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.branch ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.branch && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.branch}</p>}
          </div>

          {/* Year of Study */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Year of Study <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border border-white/10 hover:border-white/20 focus:border-amber-500 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="1st Year" className="bg-space-950">1st Year</option>
                <option value="2nd Year" className="bg-space-950">2nd Year</option>
                <option value="3rd Year" className="bg-space-950">3rd Year</option>
                <option value="4th Year" className="bg-space-950">4th Year</option>
                <option value="Post Graduate / Other" className="bg-space-950">Post Graduate / Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Terms & Guidelines */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-300 font-semibold">
            3. Declaration
          </h3>
        </div>

        {/* Checkbox 1 */}
        <label className="flex items-start gap-3 cursor-pointer group text-xs sm:text-sm text-slate-300">
          <input
            type="checkbox"
            checked={terms.infoCorrect}
            onChange={(e) => {
              setTerms((prev) => ({ ...prev, infoCorrect: e.target.checked }));
              if (errors.infoCorrect) setErrors((prev) => ({ ...prev, infoCorrect: null }));
            }}
            className="hidden"
          />
          <div className="mt-0.5 text-amber-400 flex-shrink-0">
            {terms.infoCorrect ? (
              <CheckSquare className="w-5 h-5 text-amber-400" />
            ) : (
              <Square className="w-5 h-5 text-slate-500 group-hover:text-slate-400" />
            )}
          </div>
          <span>I confirm that the information provided by me is correct. <span className="text-amber-400">*</span></span>
        </label>
        {errors.infoCorrect && <p className="text-xs text-red-400 pl-8">{errors.infoCorrect}</p>}

        {/* Checkbox 2 */}
        <label className="flex items-start gap-3 cursor-pointer group text-xs sm:text-sm text-slate-300">
          <input
            type="checkbox"
            checked={terms.rulesAgreed}
            onChange={(e) => {
              setTerms((prev) => ({ ...prev, rulesAgreed: e.target.checked }));
              if (errors.rulesAgreed) setErrors((prev) => ({ ...prev, rulesAgreed: null }));
            }}
            className="hidden"
          />
          <div className="mt-0.5 text-amber-400 flex-shrink-0">
            {terms.rulesAgreed ? (
              <CheckSquare className="w-5 h-5 text-amber-400" />
            ) : (
              <Square className="w-5 h-5 text-slate-500 group-hover:text-slate-400" />
            )}
          </div>
          <span>I agree to the Srijan event rules and guidelines. <span className="text-amber-400">*</span></span>
        </label>
        {errors.rulesAgreed && <p className="text-xs text-red-400 pl-8">{errors.rulesAgreed}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Registration...</span>
            </>
          ) : (
            <span>COMPLETE REGISTRATION</span>
          )}
        </button>
      </div>
    </form>
  );
}
