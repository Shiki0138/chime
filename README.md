# 呼び出しチャイムアプリ

React + Vite で動く簡易呼び出しチャイムです。トップページでボタンの種類を選び、次の画面で大きなチャイムボタンを押すと音が鳴ります。音声ファイルが存在しない場合は、代わりに電子音が再生されます。

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

表示された URL (通常は `http://localhost:5000/`) をブラウザで開くとアプリを確認できます。

## 音声ファイルを配置する

`public/sounds` フォルダに以下の MP3 ファイルを配置すると、実際の音声を再生できます。

- `voice_gojo.mp3` … 「誰か来て！」
- `voice_mickey.mp3` … 「誰か来て！」
- `voice_sonic.mp3` … 「誰か来て！」
- `call.mp3` … 呼び出しボタンの音
- `rinrin.mp3` … ベル音

音声ファイルが未配置の場合は、代わりに短い電子音が鳴ります。

## ビルド

```bash
npm run build
```

出力は `dist` ディレクトリに生成されます。

## GitHub Pages に公開する

このリポジトリは GitHub Actions を使って GitHub Pages へ自動デプロイされます。

1. GitHub でリポジトリの **Settings → Pages** に進み、Build and deployment の Source を **GitHub Actions** に設定します。
2. `main` ブランチへプッシュすると、`.github/workflows/deploy.yml` が実行され、`dist` が GitHub Pages に公開されます。

デプロイ完了後は `https://shiki0138.github.io/chime/` でアプリを確認できます。
