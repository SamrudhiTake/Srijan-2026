import React, { useState } from 'react';
import { Users, User, Mail, Phone, School, BookOpen, GraduationCap, CheckSquare, Square, AlertCircle, Loader2, Sparkles } from 'lucide-react';

const createEmptyMember = () => ({
  name: '',
  email: '',
  phone: '',
  college: '',
  branch: '',
  year: '1st Year',
});

export default function TeamRegistrationForm({ event, onSubmit, isSubmitting }) {
  const minTeamSize = event.minTeamSize || 2;
  const maxTeamSize = event.maxTeamSize || 4;

  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState(minTeamSize);

  const [teamLeader, setTeamLeader] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '1st Year',
  });

  // Array of members (excluding leader, so teamSize - 1 members)
  const [members, setMembers] = useState(
    Array.from({ length: minTeamSize - 1 }, () => createEmptyMember())
  );

  const [terms, setTerms] = useState({
    infoCorrect: false,
    rulesAgreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleTeamSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setTeamSize(newSize);

    const neededMembers = newSize - 1;
    setMembers((prev) => {
      if (prev.length < neededMembers) {
        const added = Array.from({ length: neededMembers - prev.length }, () => createEmptyMember());
        return [...prev, ...added];
      } else {
        return prev.slice(0, neededMembers);
      }
    });
  };

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setTeamLeader((prev) => ({ ...prev, [name]: value }));
    if (errors[`leader_${name}`]) {
      setErrors((prev) => ({ ...prev, [`leader_${name}`]: null }));
    }
  };

  const handleMemberChange = (index, field, value) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    if (errors[`member_${index}_${field}`]) {
      setErrors((prev) => ({ ...prev, [`member_${index}_${field}`]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!teamName.trim()) errs.teamName = 'Team name is required';

    // Validate leader
    if (!teamLeader.name.trim()) errs.leader_name = 'Leader full name is required';
    if (!teamLeader.email.trim()) {
      errs.leader_email = 'Leader email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teamLeader.email.trim())) {
      errs.leader_email = 'Enter a valid email address';
    }

    const cleanLeaderPhone = teamLeader.phone.trim().replace(/\D/g, '');
    if (!cleanLeaderPhone) {
      errs.leader_phone = 'Leader mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanLeaderPhone)) {
      errs.leader_phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!teamLeader.college.trim()) errs.leader_college = 'Leader college name is required';
    if (!teamLeader.branch.trim()) errs.leader_branch = 'Leader branch is required';

    // Validate each member
    members.forEach((m, idx) => {
      const memberNum = idx + 2;
      if (!m.name.trim()) errs[`member_${idx}_name`] = `Member ${memberNum} name is required`;
      if (!m.email.trim()) {
        errs[`member_${idx}_email`] = `Member ${memberNum} email is required`;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) {
        errs[`member_${idx}_email`] = `Enter a valid email address for Member ${memberNum}`;
      }

      const cleanMemberPhone = m.phone.trim().replace(/\D/g, '');
      if (!cleanMemberPhone) {
        errs[`member_${idx}_phone`] = `Member ${memberNum} mobile is required`;
      } else if (!/^[6-9]\d{9}$/.test(cleanMemberPhone)) {
        errs[`member_${idx}_phone`] = `Valid 10-digit number required`;
      }

      if (!m.college.trim()) errs[`member_${idx}_college`] = `College required`;
      if (!m.branch.trim()) errs[`member_${idx}_branch`] = `Branch required`;
    });

    // Check duplicate emails within team
    const allEmails = [
      teamLeader.email.trim().toLowerCase(),
      ...members.map((m) => m.email.trim().toLowerCase()),
    ].filter(Boolean);

    const emailSet = new Set(allEmails);
    if (emailSet.size !== allEmails.length) {
      errs.general = 'All team members must have unique email addresses.';
    }

    if (!terms.infoCorrect) errs.infoCorrect = 'Please confirm that the information provided is correct';
    if (!terms.rulesAgreed) errs.rulesAgreed = 'Please agree to Srijan event rules and guidelines';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        eventId: event.id,
        registrationType: 'team',
        teamName: teamName.trim(),
        teamLeader: {
          name: teamLeader.name.trim(),
          email: teamLeader.email.trim().toLowerCase(),
          phone: teamLeader.phone.trim().replace(/\D/g, ''),
          college: teamLeader.college.trim(),
          branch: teamLeader.branch.trim(),
          year: teamLeader.year.trim(),
        },
        members: members.map((m) => ({
          name: m.name.trim(),
          email: m.email.trim().toLowerCase(),
          phone: m.phone.trim().replace(/\D/g, ''),
          college: m.college.trim(),
          branch: m.branch.trim(),
          year: m.year.trim(),
        })),
        termsAccepted: terms.infoCorrect && terms.rulesAgreed,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in" noValidate>
      {errors.general && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* SECTION 1: Team Configuration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-300 font-semibold">
            1. Team Details
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Team Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Team Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  if (errors.teamName) setErrors((prev) => ({ ...prev, teamName: null }));
                }}
                placeholder="e.g. Code Warriors"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.teamName ? 'border-red-500/80 ring-1 ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors`}
              />
            </div>
            {errors.teamName && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.teamName}</p>}
          </div>

          {/* Number of Team Members */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Total Team Size <span className="text-amber-400">*</span>
            </label>
            <select
              value={teamSize}
              onChange={handleTeamSizeChange}
              className="w-full px-4 py-2.5 rounded-xl bg-space-950/80 border border-white/10 hover:border-white/20 focus:border-amber-500 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors appearance-none cursor-pointer"
            >
              {Array.from({ length: maxTeamSize - minTeamSize + 1 }, (_, i) => minTeamSize + i).map((sz) => (
                <option key={sz} value={sz} className="bg-space-950">
                  {sz} Members (Leader + {sz - 1})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: Team Leader Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-300 font-semibold">
              2. Team Leader (Member 1)
            </h3>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
            Primary Contact
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Leader Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Leader Full Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                value={teamLeader.name}
                onChange={handleLeaderChange}
                placeholder="e.g. Priya Sharma"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.leader_name ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
              />
            </div>
            {errors.leader_name && <p className="text-xs text-red-400 mt-1">{errors.leader_name}</p>}
          </div>

          {/* Leader Email */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Leader Email <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={teamLeader.email}
                onChange={handleLeaderChange}
                placeholder="e.g. priya@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.leader_email ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
              />
            </div>
            {errors.leader_email && <p className="text-xs text-red-400 mt-1">{errors.leader_email}</p>}
          </div>

          {/* Leader Phone */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Leader Mobile Number <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                name="phone"
                value={teamLeader.phone}
                onChange={handleLeaderChange}
                placeholder="10-digit mobile"
                maxLength={10}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.leader_phone ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
              />
            </div>
            {errors.leader_phone && <p className="text-xs text-red-400 mt-1">{errors.leader_phone}</p>}
          </div>

          {/* Leader College */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              College/Institute <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="college"
                value={teamLeader.college}
                onChange={handleLeaderChange}
                placeholder="College name"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.leader_college ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
              />
            </div>
            {errors.leader_college && <p className="text-xs text-red-400 mt-1">{errors.leader_college}</p>}
          </div>

          {/* Leader Branch & Year */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Branch <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                name="branch"
                value={teamLeader.branch}
                onChange={handleLeaderChange}
                placeholder="Branch"
                className={`w-full px-3 py-2.5 rounded-xl bg-space-950/80 border ${
                  errors.leader_branch ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Year <span className="text-amber-400">*</span>
              </label>
              <select
                name="year"
                value={teamLeader.year}
                onChange={handleLeaderChange}
                className="w-full px-2 py-2.5 rounded-xl bg-space-950/80 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Post Graduate / Other">PG/Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Dynamic Team Members */}
      {members.map((member, idx) => {
        const memberNum = idx + 2;
        return (
          <div key={idx} className="space-y-4 p-5 rounded-2xl bg-space-900/60 border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <h4 className="text-sm font-mono uppercase tracking-wider text-amber-200 font-semibold">
                  Team Member {memberNum}
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Member Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Member {memberNum} Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                  placeholder="Full name"
                  className={`w-full px-4 py-2.5 rounded-xl bg-space-950/80 border ${
                    errors[`member_${idx}_name`] ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
                />
                {errors[`member_${idx}_name`] && (
                  <p className="text-xs text-red-400 mt-1">{errors[`member_${idx}_name`]}</p>
                )}
              </div>

              {/* Member Email */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Member {memberNum} Email <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                  placeholder="Email address"
                  className={`w-full px-4 py-2.5 rounded-xl bg-space-950/80 border ${
                    errors[`member_${idx}_email`] ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
                />
                {errors[`member_${idx}_email`] && (
                  <p className="text-xs text-red-400 mt-1">{errors[`member_${idx}_email`]}</p>
                )}
              </div>

              {/* Member Phone */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Member {memberNum} Mobile <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                  placeholder="10-digit number"
                  maxLength={10}
                  className={`w-full px-4 py-2.5 rounded-xl bg-space-950/80 border ${
                    errors[`member_${idx}_phone`] ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
                />
                {errors[`member_${idx}_phone`] && (
                  <p className="text-xs text-red-400 mt-1">{errors[`member_${idx}_phone`]}</p>
                )}
              </div>

              {/* Member College */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  College/Institute <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={member.college}
                  onChange={(e) => handleMemberChange(idx, 'college', e.target.value)}
                  placeholder="College name"
                  className={`w-full px-4 py-2.5 rounded-xl bg-space-950/80 border ${
                    errors[`member_${idx}_college`] ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
                />
                {errors[`member_${idx}_college`] && (
                  <p className="text-xs text-red-400 mt-1">{errors[`member_${idx}_college`]}</p>
                )}
              </div>

              {/* Member Branch & Year */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Branch <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.branch}
                    onChange={(e) => handleMemberChange(idx, 'branch', e.target.value)}
                    placeholder="Branch"
                    className={`w-full px-3 py-2.5 rounded-xl bg-space-950/80 border ${
                      errors[`member_${idx}_branch`] ? 'border-red-500/80' : 'border-white/10 focus:border-amber-500'
                    } text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Year <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={member.year}
                    onChange={(e) => handleMemberChange(idx, 'year', e.target.value)}
                    className="w-full px-2 py-2.5 rounded-xl bg-space-950/80 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Post Graduate / Other">PG/Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* SECTION 4: Terms */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-300 font-semibold">
            4. Declaration
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
          <span>I confirm that the information provided for all team members is correct. <span className="text-amber-400">*</span></span>
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
          <span>All team members agree to the Srijan Hackathon rules and code of conduct. <span className="text-amber-400">*</span></span>
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
              <span>Registering Team...</span>
            </>
          ) : (
            <span>REGISTER TEAM ({teamSize} MEMBERS)</span>
          )}
        </button>
      </div>
    </form>
  );
}
