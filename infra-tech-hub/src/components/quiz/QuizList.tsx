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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {quizzes.map((quiz, index) => (
        <Link
          key={quiz.id}
          href={`/quiz/${quiz.id}`}
          className="block bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:from-slate-700/50 hover:to-slate-800/50 backdrop-blur-sm border border-slate-700/30 hover:border-slate-600/50 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-slate-100">{quiz.title}</h2>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-medium">
              Lv.{quiz.level} {quiz.levelName}
            </span>
          </div>
          <p className="text-slate-300 mb-6 leading-relaxed">{quiz.description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-indigo-400 font-medium">{quiz.questions}問</span>
            <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-600/30">
              {quiz.topic}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}