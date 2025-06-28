import Link from "next/link";
import QuizClient from "./QuizClient";

// 仮のクイズデータと問題
const quizData = {
  "syn-handshake": {
    id: "syn-handshake",
    title: "TCPの3ウェイハンドシェイク",
    level: 1,
    levelName: "入門",
    topic: "ネットワーク基礎",
    questions: [
      {
        id: 1,
        text: "TCPの3ウェイハンドシェイクで最初に送信されるフラグは？",
        options: [
          { id: "a", text: "ACK" },
          { id: "b", text: "SYN" },
          { id: "c", text: "FIN" },
          { id: "d", text: "RST" },
        ],
        correctAnswer: "b",
        explanation:
          "3ウェイハンドシェイクの最初のステップでは、クライアントがSYNフラグを立てたセグメントをサーバーに送信します。",
      },
      {
        id: 2,
        text: "3ウェイハンドシェイクの2番目のステップで、サーバーが送信するフラグの組み合わせは？",
        options: [
          { id: "a", text: "SYNのみ" },
          { id: "b", text: "ACKのみ" },
          { id: "c", text: "SYN+ACK" },
          { id: "d", text: "FIN+ACK" },
        ],
        correctAnswer: "c",
        explanation:
          "2番目のステップでは、サーバーがSYNとACKフラグを組み合わせたセグメントを送信します。SYNは自身の初期シーケンス番号を示し、ACKはクライアントのSYNに対する確認応答です。",
      },
      {
        id: 3,
        text: "3ウェイハンドシェイクの最後のステップでクライアントが送信するフラグは？",
        options: [
          { id: "a", text: "SYN" },
          { id: "b", text: "ACK" },
          { id: "c", text: "FIN" },
          { id: "d", text: "RST" },
        ],
        correctAnswer: "b",
        explanation:
          "最後のステップでは、クライアントがACKフラグを立てたセグメントを送信し、サーバーのSYN+ACKに対する確認応答を行います。",
      },
    ],
  },
  "tcp-flags": {
    id: "tcp-flags",
    title: "TCPフラグの基本",
    level: 1,
    levelName: "入門",
    topic: "ネットワーク基礎",
    questions: [
      {
        id: 1,
        text: "TCPヘッダー内でコネクション確立要求を示すフラグは？",
        options: [
          { id: "a", text: "SYN" },
          { id: "b", text: "ACK" },
          { id: "c", text: "PSH" },
          { id: "d", text: "URG" },
        ],
        correctAnswer: "a",
        explanation: "SYN (Synchronize) フラグは、TCPコネクションの確立要求を示します。",
      },
      {
        id: 2,
        text: "コネクションの終了を開始するためのフラグは？",
        options: [
          { id: "a", text: "RST" },
          { id: "b", text: "FIN" },
          { id: "c", text: "ACK" },
          { id: "d", text: "PSH" },
        ],
        correctAnswer: "b",
        explanation: "FIN (Finish) フラグは、送信側がデータ送信を完了し、コネクションを終了したいことを示します。",
      }
    ]
  }
};

export async function generateStaticParams() {
  return [
    { id: 'syn-handshake' },
    { id: 'tcp-flags' }
  ];
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = quizData[id as keyof typeof quizData];
  
  if (!quiz) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>クイズが見つかりません</p>
        <Link href="/quiz" className="text-indigo-400 hover:text-indigo-300 mt-4">
          クイズ一覧に戻る
        </Link>
      </div>
    );
  }

  return <QuizClient quiz={quiz} />;
}