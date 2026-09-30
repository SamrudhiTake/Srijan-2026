import React from 'react';
import {
  Code2,
  Cpu,
  Terminal,
  Globe,
  Layers,
  Sparkles,
  Lightbulb,
  Hammer,
  Trophy,
  Calendar,
  MapPin,
  Users,
  FileText,
  ExternalLink,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Code2,
  Cpu,
  Terminal,
  Globe,
  Layers,
  Sparkles,
  Lightbulb,
  Hammer,
  Trophy,
  Calendar,
  MapPin,
  Users,
  FileText,
  ExternalLink,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight
};

export default function DynamicIcon({ name, className = "w-5 h-5", ...props }) {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} {...props} />;
}
