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
      let className = "p-4 rounded-lg cursor-pointer border border-transparent transition-all ";
  
      if (isSelected) {
        if (isAnswered) {
          className += isCorrect
            ? "bg-green-500/20 border-green-500"
            : "bg-red-500/20 border-red-500";
        } else {
          className += "bg-blue-500/20 border-blue-500";
        }
      } else if (isAnswered && isCorrect) {
        className += "bg-green-500/20 border-green-500";
      } else {
        className += "bg-white/10 hover:bg-white/20";
      }
  
      return className;
    };
  
    return (
      <div className={getClassName()} onClick={() => onClick(id)}>
        {text}
      </div>
    );
  }