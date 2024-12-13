import { MouseEventHandler, useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

interface props {
  text: string;
}

const Card = ({ text }: props) => {
  const [showAll, setShowAll] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState(0);

  const handleClick = () => {
    setShowAll((prev) => !prev);
  };

  const handleCopyClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    clearTimeout(copyTimeout);
    setCopyTimeout(
      setTimeout(() => {
        setCopyTimeout(0);
      }, 3000)
    );

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div
        className="absolute top-2 right-2 h-auto w-fit"
        onClick={handleCopyClick}
      >
        {copyTimeout ? (
          <FaCheck />
        ) : (
          <FaCopy className="text-sm text-slate-400 hover:text-slate-200 transition cursor-pointer" />
        )}
      </div>

      <p className="card-p">
        {text.length > 200
          ? showAll
            ? text
            : `${text.substring(0, 200)}...`
          : text}
      </p>
    </div>
  );
};

export default Card;
