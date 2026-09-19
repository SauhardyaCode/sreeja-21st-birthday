/**
 * Web Audio API synthesizer for interactive sounds, drums, and looping music-box melody
 * Zero external audio files required, 100% offline, responsive, and instant!
 */
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimeout = null;
    this.musicMasterGain = null;
    this.currentNoteIndex = 0;
    this.activeMusicOscs = [];
    this.tempo = 0.44; // seconds per beat

    // Happy Birthday notes (frequency, duration beats)
    this.melody = [
      { f: 261.63, d: 0.75 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 1.0 }, { f: 261.63, d: 1.0 }, { f: 349.23, d: 1.0 }, { f: 329.63, d: 2.0 },
      { f: 261.63, d: 0.75 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 1.0 }, { f: 261.63, d: 1.0 }, { f: 392.00, d: 1.0 }, { f: 349.23, d: 2.0 },
      { f: 261.63, d: 0.75 }, { f: 261.63, d: 0.25 }, { f: 523.25, d: 1.0 }, { f: 440.00, d: 1.0 }, { f: 349.23, d: 1.0 }, { f: 329.63, d: 1.0 }, { f: 293.66, d: 2.0 },
      { f: 466.16, d: 0.75 }, { f: 466.16, d: 0.25 }, { f: 440.00, d: 1.0 }, { f: 349.23, d: 1.0 }, { f: 392.00, d: 1.0 }, { f: 349.23, d: 2.5 }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.musicMasterGain = this.ctx.createGain();
        this.musicMasterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
        this.musicMasterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute chime/pop sound for buttons and gift choices
  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Gentle blowing sound for candle
  playBlow() {
    this.init();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.55;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const now = this.ctx.currentTime;
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.linearRampToValueAtTime(120, now + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.55);
    } catch (e) {}
  }

  // Cheerful bell fanfare for gift claim / completion
  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          const now = this.ctx.currentTime;
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.5);
        } catch (e) {}
      }, idx * 110);
    });
  }

  // ============================================================================
  // PLAYABLE DRUM KIT SYNTHESIZERS
  // ============================================================================

  // 1. Punchy Kick / Bass Drum
  playKick() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.18);

      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  // 2. Crisp Snare Drum with wire rattle
  playSnare() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      
      // Noise component (snare rattle)
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.65, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.18);

      // Tone body component
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      oscGain.gain.setValueAtTime(0.35, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // 3. Shimmering Crash Cymbal / Hi-Hat
  playCymbal() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.55;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(5500, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.55);
    } catch (e) {}
  }

  // 4. Melodic Resonant Tom / Bongo
  playTom(pitch = 220) {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, now + 0.18);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  // 5. High-energy celebratory drumroll culminating in a crash!
  playDrumroll(onComplete) {
    this.init();
    let delay = 0;
    let interval = 85;
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.playSnare();
      }, delay);
      delay += interval;
      interval = Math.max(35, interval * 0.93);
    }
    setTimeout(() => {
      this.playKick();
      this.playCymbal();
      if (onComplete) onComplete();
    }, delay + 40);
  }

  // ============================================================================
  // LOOPING MUSIC BOX BIRTHDAY THEME (Instant Pause & Seamless Resume)
  // ============================================================================
  playMusicBoxNote(freq, startTime, duration = 0.5) {
    if (!this.ctx || !this.musicMasterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.13, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.musicMasterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);

      this.activeMusicOscs.push(osc);
      osc.onended = () => {
        const idx = this.activeMusicOscs.indexOf(osc);
        if (idx !== -1) this.activeMusicOscs.splice(idx, 1);
      };
    } catch (e) {}
  }

  startBirthdayMelody() {
    this.init();
    if (!this.ctx) return;
    this.isPlayingMusic = true;

    // Unmute music master gain immediately
    if (this.musicMasterGain) {
      this.musicMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.musicMasterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    }

    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }

    this.playNextMusicNote();
  }

  playNextMusicNote() {
    if (!this.isPlayingMusic || !this.ctx) return;

    const note = this.melody[this.currentNoteIndex];
    const now = this.ctx.currentTime;
    const noteDuration = note.d * this.tempo;

    // Play melody note
    this.playMusicBoxNote(note.f, now, noteDuration * 1.4);

    // Play soft bass tone on downbeats
    if (note.d >= 1.0 && note.f > 300) {
      this.playMusicBoxNote(note.f / 2, now, 0.7);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    // Pause slightly between full melody loops, otherwise play next note smoothly
    const delayMs = (this.currentNoteIndex === 0) ? (noteDuration + 1.2) * 1000 : noteDuration * 1000;

    this.musicTimeout = setTimeout(() => {
      if (this.isPlayingMusic) {
        this.playNextMusicNote();
      }
    }, delayMs);
  }

  stopBirthdayMelody() {
    this.isPlayingMusic = false;

    // 1. Cancel next scheduled note timer
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }

    // 2. Instantly silence the music master gain
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.musicMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }

    // 3. Immediately stop and disconnect all currently ringing oscillators
    if (this.activeMusicOscs && this.activeMusicOscs.length > 0) {
      this.activeMusicOscs.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      this.activeMusicOscs = [];
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopBirthdayMelody();
      return false;
    } else {
      this.startBirthdayMelody();
      return true;
    }
  }
}

window.soundFx = new SoundEffects();
