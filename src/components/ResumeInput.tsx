import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { InputMode } from '../types';

interface ResumeInputProps {
  onAnalyze: (content: string | { data: string; mimeType: string }) => void;
  isAnalyzing: boolean;
}

export const ResumeInput: React.FC<ResumeInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [mode, setMode] = useState<InputMode>('text');
  const [text, setText] = useState('');
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({ data: base64String, mimeType: file.type });
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (mode === 'text' && text.trim()) {
      onAnalyze(text);
    } else if (mode === 'image' && image) {
      onAnalyze(image);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
      <div className="flex border-bottom border-zinc-100">
        <button
          onClick={() => setMode('text')}
          className={cn(
            "flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
            mode === 'text' ? "bg-zinc-50 text-emerald-600 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          <FileText className="w-4 h-4" />
          Paste Text
        </button>
        <button
          onClick={() => setMode('image')}
          className={cn(
            "flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
            mode === 'image' ? "bg-zinc-50 text-emerald-600 border-b-2 border-emerald-500" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          <ImageIcon className="w-4 h-4" />
          Upload Image
        </button>
      </div>

      <div className="p-6">
        {mode === 'text' ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full h-64 p-4 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none font-sans"
          />
        ) : (
          <div 
            onClick={() => !preview && fileInputRef.current?.click()}
            className={cn(
              "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden relative",
              preview ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300"
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            {preview ? (
              <>
                <img src={preview} alt="Resume Preview" className="w-full h-full object-contain p-2" />
                <button 
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-600" />
                </button>
              </>
            ) : (
              <>
                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                  <Upload className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-zinc-700">Click to upload resume image</p>
                <p className="text-xs text-zinc-500 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
              </>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isAnalyzing || (mode === 'text' ? !text.trim() : !image)}
          className={cn(
            "w-full mt-6 py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
            isAnalyzing 
              ? "bg-zinc-400 cursor-not-allowed" 
              : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-lg shadow-emerald-500/20"
          )}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
};
