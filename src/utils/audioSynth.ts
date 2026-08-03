// Simple, soothing Web Audio API synthesizer for soft music box / chime effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle soft sine chime
export function playChimeNote(freq = 523.25, type: OscillatorType = 'sine', duration = 0.8, volume = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio synth failed:', e);
  }
}

// Play an arpeggio sequence for magic moments (e.g., opening letter, revealing surprise)
export function playMagicArpeggio() {
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playChimeNote(freq, 'sine', 1.2, 0.12);
    }, idx * 120);
  });
}

// Play cute playful pop sound when button dodges or is clicked
export function playPlayfulPop(attempt: number) {
  const baseFreq = 380 + attempt * 90;
  playChimeNote(baseFreq, 'sine', 0.25, 0.18);
}
