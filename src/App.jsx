import { useRef, useState } from "react";
import { getSoundByKey, SOUND_MAP } from "./soundMap.js";

export default function App() {
  const [selected, setSelected] = useState(null);
  const audioContextRef = useRef(null);

  if (!selected) {
    return (
      <div style={styles.page}>
        <h2 style={styles.heading}>呼び出しボタンを選んでください</h2>
        <div style={styles.grid}>
          {Object.entries(SOUND_MAP).map(([key, item]) => (
            <button
              key={key}
              style={styles.choice}
              onClick={() => setSelected(key)}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.label}
                  style={styles.choiceImage}
                />
              ) : (
                <div style={styles.choiceIcon}>{item.icon}</div>
              )}
              <div>{item.label}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const sound = getSoundByKey(selected);

  const playFallbackTone = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      console.warn("AudioContext が利用できません");
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume().catch((err) => console.warn("AudioContext resume 失敗", err));
    }

    const tone = sound?.tone ?? {};
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = tone.type ?? "sine";
    oscillator.frequency.value = tone.frequency ?? 880;

    const duration = tone.duration ?? 0.6;
    const now = ctx.currentTime;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.55, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  };

  const playSound = () => {
    if (!sound) {
      playFallbackTone();
      return;
    }

    const audio = new Audio(sound.file);

    const handleAudioError = (event) => {
      audio.removeEventListener("error", handleAudioError);
      console.warn("音声ファイルが再生できません", event?.error);
      playFallbackTone();
    };

    audio.addEventListener("error", handleAudioError);

    audio.addEventListener("ended", () => {
      audio.removeEventListener("error", handleAudioError);
    });

    audio
      .play()
      .catch((err) => {
        audio.removeEventListener("error", handleAudioError);
        console.warn("音声再生エラー:", err);
        playFallbackTone();
      });
  };

  const detailStyle = sound?.detailStyle ?? "alert";
  const isImageDetail = detailStyle === "image" || detailStyle === "alert";
  const detailImage = isImageDetail
    ? sound?.detailImage ?? sound?.image ?? null
    : null;

  const bigButtonStyle = {
    ...styles.bigButton,
    ...(isImageDetail ? styles.bigButtonImage : styles.bigButtonAlert),
  };

  return (
    <div style={styles.detailPage}>
      <button style={styles.back} onClick={() => setSelected(null)}>
        ← 戻る
      </button>
      <button style={bigButtonStyle} onClick={playSound}>
        {detailImage ? (
          <img
            src={detailImage}
            alt={sound?.label ?? "チャイム"}
            style={styles.bigImage}
          />
        ) : (
          <div style={styles.bigIcon}>！</div>
        )}
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    padding: "80px 20px",
    fontFamily: "'Noto Sans JP', system-ui, sans-serif",
    background: "linear-gradient(160deg, #fff7f7 0%, #f3ecff 100%)",
    position: "relative",
    textAlign: "center",
  },
  detailPage: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    padding: "40px 20px",
    fontFamily: "'Noto Sans JP', system-ui, sans-serif",
    background: "linear-gradient(160deg, #fff7f7 0%, #f3ecff 100%)",
    position: "relative",
    textAlign: "center",
  },
  heading: {
    margin: 0,
  },
  grid: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  choice: {
    fontSize: 18,
    padding: "24px 32px",
    borderRadius: 16,
    cursor: "pointer",
    border: "none",
    background: "white",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    minWidth: 200,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  choiceIcon: {
    fontSize: 52,
  },
  choiceImage: {
    width: 140,
    height: 140,
    objectFit: "contain",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    padding: 8,
  },
  back: {
    position: "absolute",
    top: 24,
    left: 24,
    border: "none",
    background: "transparent",
    fontSize: 18,
    cursor: "pointer",
  },
  bigButton: {
    width: "min(90vw, 90vh)",
    height: "min(90vw, 90vh)",
    maxWidth: 520,
    maxHeight: 520,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transition: "transform 0.1s ease",
  },
  bigButtonAlert: {
    background: "#f44336",
    color: "#fff",
    boxShadow: "0 16px 40px rgba(244, 67, 54, 0.4)",
  },
  bigButtonImage: {
    width: "min(90vw, 520px)",
    height: "auto",
    maxWidth: 520,
    maxHeight: 520,
    padding: 0,
    background: "transparent",
    color: "#222",
    boxShadow: "none",
    borderRadius: 0,
    overflow: "visible",
  },
  bigIcon: {
    fontSize: "clamp(180px, 45vw, 340px)",
    lineHeight: 1,
    color: "#fff",
    fontWeight: 700,
    fontFamily:
      "'Baloo 2', 'Fredoka One', 'Nunito', 'Hiragino Maru Gothic Pro', 'Rounded Mplus 1c', 'Arial Rounded MT Bold', 'Comic Sans MS', sans-serif",
    textShadow: "0 10px 24px rgba(0, 0, 0, 0.3)",
  },
  bigImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    display: "block",
  },
};
