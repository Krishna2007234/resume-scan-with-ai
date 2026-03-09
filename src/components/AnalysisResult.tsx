import React from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { CheckCircle2, AlertCircle, Briefcase, Award, Sparkles, ArrowLeft } from 'lucide-react';
import { ResumeAnalysis } from '../types';
import { cn } from '../lib/utils';

interface AnalysisResultProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-rose-600 bg-rose-50 border-rose-100";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Input
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          Analysis Complete
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className={cn("md:col-span-1 p-8 rounded-2xl border flex flex-col items-center justify-center text-center", getScoreColor(analysis.suitabilityScore))}>
          <span className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">Suitability Score</span>
          <div className="text-7xl font-black tracking-tighter">{analysis.suitabilityScore}</div>
          <div className="mt-4 h-2 w-full bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${analysis.suitabilityScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-current"
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="md:col-span-2 p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-800 font-bold mb-4">
            <Briefcase className="w-5 h-5 text-emerald-500" />
            Experience Summary
          </div>
          <p className="text-zinc-600 leading-relaxed">
            {analysis.experienceSummary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills & Roles */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              Identified Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-medium border border-zinc-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              Suggested Roles
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {analysis.suggestedRoles.map((role, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-emerald-800 text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  {role}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Strengths & Improvements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Key Strengths
            </h3>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-6 bg-zinc-900 text-zinc-100 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
              <AlertCircle className="w-5 h-5" />
              Improvement Suggestions
            </h3>
            <div className="markdown-body prose prose-invert prose-sm max-w-none text-zinc-300">
              <Markdown>{analysis.improvements}</Markdown>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
