export const SOUND_MAP = {
  gojo: {
    label: "誰か来て！",
    image: "/images/gojo.jpg",
    file: "/sounds/voice_gojo.mp3",
    tone: { frequency: 987.77, type: "sawtooth" },
    detailStyle: "alert",
    detailImage: "/images/alert.png",
  },
  mickey: {
    label: "誰か来て！",
    image: "/images/mickey.jpg",
    file: "/sounds/voice_mickey.mp3",
    tone: { frequency: 880, type: "square" },
    detailStyle: "alert",
    detailImage: "/images/alert.png",
  },
  sonic: {
    label: "誰か来て！",
    image: "/images/sonic.jpg",
    file: "/sounds/voice_sonic.mp3",
    tone: { frequency: 740, type: "triangle" },
    detailStyle: "alert",
    detailImage: "/images/alert.png",
  },
  call: {
    label: "呼び出しチャイム",
    image: "/images/call.jpg",
    file: "/sounds/call.mp3",
    tone: { frequency: 659.25, type: "square" },
    detailStyle: "image",
  },
  bell: {
    label: "ベル",
    image: "/images/bell.jpg",
    file: "/sounds/rinrin.mp3",
    tone: { frequency: 523.25, type: "triangle" },
    detailStyle: "image",
  },
};

export const getSoundByKey = (key) => SOUND_MAP[key] ?? null;
