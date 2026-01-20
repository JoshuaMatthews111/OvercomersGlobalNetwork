'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  autoplay?: boolean;
  onClose?: () => void;
}

export function VideoPlayer({ videoId, title, autoplay = false, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  if (!isPlaying) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(true)}
            className="w-20 h-20 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
      {onClose && (
        <button
          onClick={() => {
            setIsPlaying(false);
            onClose();
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&cc_load_policy=1&cc_lang_pref=en`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
