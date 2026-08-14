import { useEffect, useState } from "react";

function Typewriter({word,className,speedText=120,speedDelete=80}) {
//   const word = "Full Stack Developer";
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(word?.substring(0, text.length + 1));

        if (text?.length === word?.length - 1) {
          setIsDeleting(true);
        }
      } else {
        setText(word?.substring(0, text.length - 1));

        if (text?.length === 0) {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? speedDelete : speedText);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <h1 className={`text-3xl font-bold || ${className}`}>
      {text}
      <span className={`animate-pulse `}>|</span>
    </h1>
  );
}

export default Typewriter;