import { TbInfoTriangle } from "react-icons/tb";

const NoContent = () => {
  return (
    <div className="no-content">
      <TbInfoTriangle className="inline-block" /> No available clipboard
      contents. Kindly add a new content to see available contents.
    </div>
  );
};

export default NoContent;
