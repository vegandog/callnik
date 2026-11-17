'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const voices = [
  { name: 'דנה',  gender: 'f' },
  { name: 'עלמה', gender: 'f' },
  { name: 'נועה', gender: 'f' },
  { name: 'עדן',  gender: 'f' },
  { name: 'קובי', gender: 'm' },
  { name: 'יואב', gender: 'm' },
]

function VoiceCard({ name, gender, playing, onPlay }: { name: string; gender: string; playing: boolean; onPlay: (name: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white ring-2 ring-gray-100 cursor-pointer select-none"
        style={{ transition: 'transform 0.2s, box-shadow 0.2s', transform: hovered ? 'scale(1.08)' : 'scale(1)', boxShadow: playing ? '0 0 0 3px #22C55E' : '' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onPlay(name)}
      >
        <Image src={`/voices/photo-${name}.jpg`} alt={name} width={96} height={96} className="object-cover w-full h-full" />
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.45)', opacity: hovered || playing ? 1 : 0 }}
        >
          {playing
            ? <span className="text-white text-xs font-bold animate-pulse">▶ מנגן</span>
            : <span className="text-white text-xs font-bold">להאזנה</span>
          }
        </div>
      </div>
      <div>
        <p className="text-gray-900 font-semibold text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{gender === 'f' ? 'קול נשי' : 'קול גברי'}</p>
      </div>
    </div>
  )
}

export default function VoicesSection() {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = (name: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (playingVoice === name) {
      setPlayingVoice(null)
      return
    }
    const audio = new Audio(`/voices/${name}.mp3`)
    audio.play()
    audio.onended = () => setPlayingVoice(null)
    audioRef.current = audio
    setPlayingVoice(name)
  }

  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">תבחר קול שמתאים לעסק שלך</h2>
        <p className="text-gray-500 mb-10">6 קולות עבריים טבעיים - תשמע כל אחד לפני שתחליט</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {voices.map(({ name, gender }) => (
            <VoiceCard key={name} name={name} gender={gender} playing={playingVoice === name} onPlay={handlePlay} />
          ))}
        </div>
      </div>
    </section>
  )
}
