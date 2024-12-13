import Card from "./Card";
import type { DBItem } from "../../utils";
import NoContent from "./NoContent";

// interface Content {
//   id: number;
//   value: { text: string };
// }

interface props {
  contents: DBItem<{ text: string }>[];
}

const Cards = ({ contents }: props) => {
  return contents.length > 0 ? (
    <div className="cards">
      {contents.map(({ id, value }) => (
        <Card key={id} text={value?.text} />
      ))}
    </div>
  ) : (
    <NoContent />
  );
};

export default Cards;
