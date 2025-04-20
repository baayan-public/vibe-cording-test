import Link from 'next/link';

type Quiz = {
  id: string;
  title: string;
  level: number;
  levelName: string;
  questions: number;
  description: string;
  topic: string;
};

type QuizListProps = {
  quizzes: Quiz[];
};

export default function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quizzes.map((quiz) => (
        <Link
          key={quiz.id}
          href={`/quiz/${quiz.id}`}
          className="block bg-white/5 hover:bg-white/10 rounded-lg p-6 transition-colors"
        >
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Lv.{quiz.level} {quiz.levelName}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{quiz.description}</p>
          <div className="flex justify-between text-sm">
            <span>{quiz.questions}問</span>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              {quiz.topic}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}