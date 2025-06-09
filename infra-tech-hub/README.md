# Infra Tech Hub - TCPレベル判定君

ネットワーク・クラウド・セキュリティなど複数分野の実践スキルを測定・理解・向上できるモジュール型クイズプラットフォーム

![TCP Level Assessment](https://img.shields.io/badge/TCP-Level%20Assessment-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-cyan)

## 🎯 プロジェクト概要

**TCPレベル判定君**は、ネットワークエンジニアやインフラエンジニアのTCP/IP知識とスキルを体系的に評価するWebアプリケーションです。TCP通信プロトコルをベースとした4段階のレベル体系で、基礎から応用まで幅広い知識を測定できます。

### 🎓 対象ユーザー

| ペルソナ | ニーズ | 具体例 |
|---------|--------|-------|
| **ネットワーク基礎学習者** | 構造的な演習と明確なフィードバック | 大学生、CCNA受験者 |
| **現役ネットワークエンジニア** | スキルのギャップ診断と認定 | 企業の運用保守担当 |
| **DevOps・クラウドエンジニア** | トラブルシュート演習やラボ環境 | AWS/GCP/SRE担当 |
| **採用担当者** | 客観的な技術スクリーニングツール | SIer、人材採用部門 |

## 🏆 レベル体系

TCP通信の段階に対応した4つのレベルでスキルを評価します：

| レベル | 名称 | 期待スキル |
|--------|------|-----------|
| **Lv.1** | **SYN** | 三者ハンドシェイクと基本用語の理解 |
| **Lv.2** | **ACK** | フロー制御、主要フラグの運用 |
| **Lv.3** | **ESTABLISHED** | 輻輳制御、パケット解析 |
| **Lv.4** | **FIN/ACK** | 高度トラブルシュート、RFC読解 |

## ✨ 主要機能

### 📝 クイズシステム
- **多形式対応**: 選択式、真偽式、シナリオベース問題
- **即座のフィードバック**: 解答後すぐに詳細な解説を表示
- **進捗管理**: リアルタイムでの回答状況追跡

### 📊 スコアリング・分析
- **詳細な採点**: 正答率、回答速度、難易度を考慮した総合評価
- **パフォーマンス分析**: 強み・弱点の可視化
- **学習推奨**: スコアに応じた次のステップ提案

### 🎮 ユーザー体験
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **ダークテーマ**: 目に優しいUI
- **匿名利用**: ログイン不要で即座に始められる

## 🛠 技術スタック

### フロントエンド
- **Next.js 15.3.1** - App Routerによるモダンなルーティング
- **React 19.0.0** - 最新のReact機能を活用
- **TypeScript 5** - 型安全な開発
- **Tailwind CSS 4** - ユーティリティファーストなスタイリング

### データ・コンテンツ管理
- **gray-matter** - Markdownコンテンツのフロントマター解析
- **marked** - MarkdownからHTMLへの変換
- **Supabase** (準備中) - 将来のユーザー管理・進捗追跡用

### 開発・ビルドツール
- **Turbopack** - 高速な開発ビルド
- **ESLint** - コード品質管理
- **PostCSS** - CSS処理とTailwind CSS統合

## 🚀 クイックスタート

### 前提条件
- Node.js 18.0.0 以上
- npm または yarn

### インストール・実行

```bash
# リポジトリをクローン
git clone https://github.com/your-username/infra-tech-hub.git
cd infra-tech-hub

# 依存関係をインストール
npm install

# 開発サーバーを起動（Turbopack使用）
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

### 利用可能なコマンド

```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# ESLintによるコード検証
npm run lint
```

## 📁 プロジェクト構成

```
infra-tech-hub/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── quiz/              # クイズ関連ページ
│   │   ├── page.tsx       # クイズ一覧
│   │   └── [id]/         # 個別クイズページ
│   └── result/            # 結果ページ
├── src/
│   ├── components/        # Reactコンポーネント
│   │   ├── layout/       # ヘッダー・フッター
│   │   └── quiz/         # クイズ関連コンポーネント
│   └── quiz-content/     # Markdownクイズ定義
├── public/               # 静的ファイル
└── ...設定ファイル
```

## 📄 クイズコンテンツ形式

クイズはMarkdown + YAML frontmatterで定義されています：

```markdown
---
id: syn-handshake
title: TCPの3ウェイハンドシェイク
level: 1
levelName: SYN
topic: ネットワーク基礎
---

# 1
TCPの3ウェイハンドシェイクで最初に送信されるパケットのフラグは？

## options
- a: ACK
- b: SYN
- c: FIN
- d: RST

## correctAnswer
b

## explanation
TCPの3ウェイハンドシェイクでは、クライアントが最初にSYNフラグを設定した...
```

## 🎯 開発ロードマップ

### MVP段階（現在）
- [x] 基本的なクイズ機能
- [x] スコアリングシステム
- [x] レスポンシブUI
- [ ] Markdownコンテンツの動的読み込み

### Phase 2（予定）
- [ ] ユーザー認証・プロフィール
- [ ] 進捗追跡・履歴管理
- [ ] 管理者向けコンテンツ管理画面

### Phase 3（将来）
- [ ] PCAPファイル解析チャレンジ
- [ ] リアルタイムラボ環境
- [ ] チーム機能・組織管理

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 📞 サポート・お問い合わせ

- バグ報告・機能要望: [GitHub Issues](https://github.com/your-username/infra-tech-hub/issues)
- ディスカッション: [GitHub Discussions](https://github.com/your-username/infra-tech-hub/discussions)

---

**Infra Tech Hub** - ネットワークスキルの可視化と成長を支援するプラットフォーム