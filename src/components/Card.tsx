import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

interface Props {
  text: string;
}

const Card = ({ text }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setShowAll((prev) => !prev);
  };

  const handleCopyClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing

    try {
      // Copy text to clipboard
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the 'copied' state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div
        className="absolute top-2 right-2 h-auto w-fit cursor-pointer"
        onClick={handleCopyClick}
      >
        {copied ? (
          <FaCheck className="text-green-500" />
        ) : (
          <FaCopy className="text-sm text-slate-400 hover:text-slate-200 transition" />
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
