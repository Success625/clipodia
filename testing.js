import { getAllData, openDatabase } from "./utils";

const dbInteract = async () => {
  const db = await openDatabase("clipodia", "clipcontents");

  const allItems = await getAllData(db, "clipcontents");

  console.log(allItems);
};

dbInteract();
