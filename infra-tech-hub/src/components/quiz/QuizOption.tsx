type QuizOptionProps = {
    id: string;
    text: string;
    isSelected: boolean;
    isAnswered: boolean;
    isCorrect: boolean | null;
    onClick: (id: string) => void;
  };
  
export default function QuizOption({
  id,
  text,
  isSelected,
  isAnswered,
  isCorrect,
  onClick,
}: QuizOptionProps) {
  const getClassName = () => {
    let className = "relative p-6 rounded-2xl cursor-pointer border transition-all duration-300 transform hover:scale-105 ";

    if (isSelected) {
      if (isAnswered) {
        className += isCorrect
          ? "bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400"
          : "bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400";
      } else {
        className += "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-indigo-400 shadow-lg shadow-indigo-500/25";
      }
    } else if (isAnswered && isCorrect) {
      className += "bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400";
    } else {
      className += "bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 backdrop-blur-sm";
    }

    return className;
  };

  const getIcon = () => {
    if (!isAnswered) return null;
    
    if (isSelected) {
      return isCorrect ? (
        <div className="absolute top-4 right-4 text-green-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <div className="absolute top-4 right-4 text-red-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    } else if (isCorrect) {
      return (
        <div className="absolute top-4 right-4 text-green-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div 
      className={getClassName()} 
      onClick={() => !isAnswered && onClick(id)}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-slate-100">{text}</span>
        {getIcon()}
      </div>
    </div>
  );
}