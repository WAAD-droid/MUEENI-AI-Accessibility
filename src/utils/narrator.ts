/**
 * Voice Narrator utility for Arabic accessibility
 */
export function speakArabic(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel(); // stop any current speech
    const cleanText = text.replace(/[*_#`[\]()]/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try finding an Arabic voice
    const voices = window.speechSynthesis.getVoices() || [];
    const arabicVoice = voices.find(v => v?.lang?.startsWith('ar') || v?.name?.toLowerCase()?.includes('arabic') || v?.name?.toLowerCase()?.includes('maged') || v?.name?.toLowerCase()?.includes('tariq'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

/**
 * Voice Narrator utility for English accessibility
 */
export function speakEnglish(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel(); // stop any current speech
    const cleanText = text.replace(/[*_#`[\]()]/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try finding an English voice
    const voices = window.speechSynthesis.getVoices() || [];
    const englishVoice = voices.find(v => v?.lang?.startsWith('en') && (v?.name?.includes('Google') || v?.name?.includes('Natural') || v?.lang === 'en-US'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}
