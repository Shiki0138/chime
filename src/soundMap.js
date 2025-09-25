const normalizeBase = (base) => {
  if (!base) return "/";
  return base.endsWith("/") ? base : `${base}/`;
};

const assetUrl = (path) => `${normalizeBase(import.meta.env.BASE_URL)}${path}`;

export const SOUND_MAP = {
  gojo: {
    label: "誰か来て！",
    image: assetUrl("images/gojo.jpg"),
    file: assetUrl("sounds/voice_gojo.mp3"),
    tone: { frequency: 987.77, type: "sawtooth" },
    detailStyle: "alert",
    detailImage: assetUrl("images/alert.png"),
  },
  mickey: {
    label: "誰か来て！",
    image: assetUrl("images/mickey.jpg"),
    file: assetUrl("sounds/voice_mickey.mp3"),
    tone: { frequency: 880, type: "square" },
    detailStyle: "alert",
    detailImage: assetUrl("images/alert.png"),
  },
  sonic: {
    label: "誰か来て！",
    image: assetUrl("images/sonic.jpg"),
    file: assetUrl("sounds/voice_sonic.mp3"),
    tone: { frequency: 740, type: "triangle" },
    detailStyle: "alert",
    detailImage: assetUrl("images/alert.png"),
  },
  call: {
    label: "呼び出しチャイム",
    image: assetUrl("images/call.jpg"),
    file: assetUrl("sounds/call.mp3"),
    tone: { frequency: 659.25, type: "square" },
    detailStyle: "image",
  },
  bell: {
    label: "黒電話",
    image: assetUrl("images/bell.jpg"),
    file: assetUrl("sounds/rinrin.mp3"),
    tone: { frequency: 523.25, type: "triangle" },
    detailStyle: "image",
  },
};

export const getSoundByKey = (key) => SOUND_MAP[key] ?? null;
