import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import {
  User,
  Briefcase,
  HelpCircle,
  Calendar as CalendarIcon,
  Clock,
  Video,
  ChevronRight,
  ChevronLeft,
  Check,
  Mail,
  Phone,
  Hash,
  Globe,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { saveMessage } from "../utils/adminStorage";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  // Step 1
  role: string;
  inquiry: string;
  // Step 2
  date: Date | null;
  time: string;
  platform: "Google Meet" | "Zoom";
  // Step 3
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  agenda: string;
  message: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    role: "",
    inquiry: "",
    date: null,
    time: "",
    platform: "Google Meet",
    name: "",
    email: "",
    countryCode: "+91", // Default
    phone: "",
    agenda: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countryCodes = [
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "AU" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
    { code: "+81", country: "JP" },
  ];

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3) as Step);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setFormData({
      role: "",
      inquiry: "",
      date: null,
      time: "",
      platform: "Google Meet",
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      agenda: "",
      message: "",
    });
  };

  const handleClose = () => {
    onClose();
    // Delay reset to allow modal close animation to finish
    setTimeout(resetForm, 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save to local storage for admin dashboard
    saveMessage(formData);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // --- Step 1: Context ---
  const renderStep1 = () => {
    const roles = [
      { id: "Founder", icon: <User size={18} />, label: "Founder" },
      { id: "HR", icon: <Briefcase size={18} />, label: "HR / Recruiter" },
      { id: "Other", icon: <HelpCircle size={18} />, label: "Other" },
    ];

    const inquiries = [
      { id: "Job Offer", label: "Hire for Job / Offer" },
      { id: "Freelance", label: "Freelance Project" },
      { id: "Connect", label: "None / Just Connect" },
    ];

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <label className="text-sm font-bold text-muted uppercase">
            Tell me about yourself
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => updateField("role", r.id)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                  formData.role === r.id
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-surface border-border text-muted hover:border-muted hover:bg-surfaceHighlight"
                }`}
              >
                {r.icon}
                <span className="text-sm font-medium">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-muted uppercase">
            What's your inquiry about?
          </label>
          <div className="grid grid-cols-1 gap-3">
            {inquiries.map((i) => (
              <button
                key={i.id}
                onClick={() => updateField("inquiry", i.id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                  formData.inquiry === i.id
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-surface border-border text-muted hover:border-muted hover:bg-surfaceHighlight"
                }`}
              >
                <span className="text-sm font-medium">{i.label}</span>
                {formData.inquiry === i.id && <Check size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- Step 2: Scheduling ---
  const renderStep2 = () => {
    // Simple Calendar Generation (Current Month)
    const today = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    const timeSlots = ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"];

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Calendar */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-muted uppercase flex items-center gap-2">
            <CalendarIcon size={14} /> Select Date (
            {today.toLocaleString("default", { month: "long" })})
          </label>
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="text-[10px] text-muted font-bold">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {blanks.map((b) => (
                <div key={`blank-${b}`} />
              ))}
              {days.map((day) => {
                const isToday = day === today.getDate();
                const isPast = day < today.getDate();
                const isSelected = formData.date?.getDate() === day;

                return (
                  <button
                    key={day}
                    disabled={isPast}
                    onClick={() => {
                      const newDate = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        day
                      );
                      updateField("date", newDate);
                    }}
                    className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                      isSelected
                        ? "bg-accent text-white shadow-lg shadow-accent/25"
                        : isPast
                        ? "text-muted/30 cursor-not-allowed"
                        : isToday
                        ? "bg-surfaceHighlight text-accent font-bold border border-accent/30"
                        : "text-text hover:bg-surfaceHighlight"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time & Platform */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted uppercase flex items-center gap-2">
              <Clock size={14} /> Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  onClick={() => updateField("time", t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    formData.time === t
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-surface border-border text-muted hover:border-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-muted uppercase flex items-center gap-2">
              <Video size={14} /> Platform
            </label>
            <div className="flex flex-col gap-2">
              {["Google Meet", "Zoom"].map((p) => (
                <button
                  key={p}
                  onClick={() => updateField("platform", p as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left flex justify-between items-center ${
                    formData.platform === p
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-surface border-border text-muted hover:border-muted"
                  }`}
                >
                  {p}
                  {formData.platform === p && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Step 3: Details ---
  const renderStep3 = () => (
    <div className="space-y-5 animate-fade-in">
      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted uppercase flex items-center gap-1">
            <User size={12} /> Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full bg-surface border border-border rounded-lg p-2.5 text-sm text-text focus:border-accent outline-none"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted uppercase flex items-center gap-1">
            <Mail size={12} /> Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full bg-surface border border-border rounded-lg p-2.5 text-sm text-text focus:border-accent outline-none"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-muted uppercase flex items-center gap-1">
          <Phone size={12} /> Phone (Optional)
        </label>
        <div className="flex gap-3">
          <div className="relative w-24 shrink-0">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted z-10 pointer-events-none">
              <Globe size={14} />
            </div>
            <select
              value={formData.countryCode}
              onChange={(e) => updateField("countryCode", e.target.value)}
              className="w-full bg-surface border border-border rounded-lg py-2.5 pl-8 pr-2 text-sm text-text focus:border-accent outline-none appearance-none cursor-pointer"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full bg-surface border border-border rounded-lg p-2.5 text-sm text-text focus:border-accent outline-none"
            placeholder="123 456 7890"
          />
        </div>
      </div>

      {/* Agenda */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-muted uppercase flex items-center gap-1">
          <Hash size={12} /> Agenda
        </label>
        <input
          type="text"
          value={formData.agenda}
          onChange={(e) => updateField("agenda", e.target.value)}
          className="w-full bg-surface border border-border rounded-lg p-2.5 text-sm text-text focus:border-accent outline-none"
          placeholder="Brief topic of discussion..."
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-muted uppercase flex items-center gap-1">
          <MessageSquare size={12} /> Message (Optional)
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="w-full bg-surface border border-border rounded-lg p-2.5 text-sm text-text focus:border-accent outline-none h-20 resize-none"
          placeholder="Any additional details..."
        />
      </div>
    </div>
  );

  // --- Success View ---
  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[350px] animate-fade-in text-center p-6">
      <div className="w-16 h-16 bg-surfaceHighlight rounded-full flex items-center justify-center mb-6 shadow-lg shadow-accent/10 border border-border">
        <CheckCircle size={32} className="text-accent" />
      </div>
      <h3 className="text-3xl font-display font-bold text-text mb-3">
        Request Sent
      </h3>
      <p className="text-muted text-lg max-w-xs mx-auto leading-relaxed mb-8">
        Thanks for reaching out! I've received your details and will confirm the
        meeting shortly via email.
      </p>
      <div className="w-full max-w-xs">
        <Button
          variant="primary"
          onClick={handleClose}
          className="w-full justify-center"
        >
          Return to Portfolio
        </Button>
      </div>
    </div>
  );

  // Validation Check
  const canProceed = () => {
    if (step === 1) return formData.role && formData.inquiry;
    if (step === 2) return formData.date && formData.time && formData.platform;
    if (step === 3) return formData.name && formData.email && formData.agenda;
    return false;
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={!isSuccess ? "Let's Connect" : ""}
      maxWidth="lg"
    >
      <div className="flex flex-col h-full">
        {/* Progress Bar (Only show if not success) */}
        {!isSuccess && (
          <div className="flex items-center gap-2 mb-6 px-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  s <= step ? "bg-accent" : "bg-surfaceHighlight"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 min-h-[350px]">
          {isSuccess ? (
            renderSuccess()
          ) : (
            <>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </>
          )}
        </div>

        {/* Footer Actions (Only show if not success) */}
        {!isSuccess && (
          <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
            {step > 1 ? (
              <Button
                variant="ghost"
                onClick={handleBack}
                icon={<ChevronLeft size={16} />}
              >
                Back
              </Button>
            ) : (
              <div></div> // Spacer
            )}

            {step < 3 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                Next <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!canProceed()}
                isLoading={isSubmitting}
                className="gap-2"
              >
                Confirm Booking <Check size={16} />
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ContactModal;
