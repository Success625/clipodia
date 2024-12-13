import { useEffect, useState } from "react";
import AddNew from "./AddNew";
import AddNewForm from "./AddNewForm";
import Cards from "./Cards";
import { openDatabase, getDataWithExpiry } from "../../utils";
import type { DBItem } from "../../utils";

const Home = () => {
  const [addNewActive, setAddNewActive] = useState(false);
  const [clipContents, setClipContents] = useState<DBItem<unknown>[]>([]);

  const getCips = async () => {
    const db = await openDatabase("clipodia", "clipcontents");
    const clipContentsArr = await getDataWithExpiry(db, "clipcontents");
    setClipContents(clipContentsArr);

    console.log(clipContentsArr);
  };

  useEffect(() => {
    const fetchClips = async () => {
      await getCips();
    };

    fetchClips();
  }, []);

  const onUpdate = async () => {
    await getCips();
  };

  const handleToggle = () => setAddNewActive((prev) => !prev);

  const contents = clipContents.map(
    (clipContent) => clipContent as DBItem<{ text: string }>
  );

  return (
    <main>
      <h1 className="text-xl p-3">
        Your Clipboard Portal Across Your Devices.
      </h1>
      <Cards contents={contents} />
      <AddNew onToggle={handleToggle} />
      <AddNewForm
        setUpdate={onUpdate}
        active={addNewActive}
        setActive={handleToggle}
      />
    </main>
  );
};

export default Home;
