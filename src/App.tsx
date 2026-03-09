import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileSearch, Sparkles } from 'lucide-react';
import { SplashScreen } from './components/SplashScreen';
import { ResumeInput } from './components/ResumeInput';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeResume } from './services/gemini';
import { ResumeAnalysis } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = async (content: string | { data: string; mimeType: string }) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeResume(content);
      setAnalysis(result);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Header */}
          <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-900 rounded-lg">
                  <FileSearch className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-bold tracking-tight text-zinc-900">
                  RESU<span className="text-emerald-600">SCAN</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-500">
                <a href="#" className="hover:text-zinc-900 transition-colors">How it works</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
                <div className="h-4 w-px bg-zinc-200" />
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-12">
            {!analysis ? (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl"
                  >
                    Optimize your career with <span className="text-emerald-600">AI Intelligence</span>
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-zinc-600"
                  >
                    Get instant feedback on your resume. Our AI analyzes your skills, experience, and provides actionable tips to land your dream job.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ResumeInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                </motion.div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-2xl mx-auto p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm text-center font-medium"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-12">
                  {[
                    { title: "Skill Analysis", desc: "Deep dive into your technical and soft skill sets." },
                    { title: "Suitability Score", desc: "Understand how well your resume is optimized." },
                    { title: "Growth Tips", desc: "Actionable suggestions to improve your impact." }
                  ].map((feature, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-zinc-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <AnalysisResult analysis={analysis} onReset={handleReset} />
            )}
          </main>

          {/* Footer */}
          <footer className="py-12 border-t border-zinc-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-zinc-400">
                &copy; {new Date().getFullYear()} ResuScan AI. Built for the future of recruitment.
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
