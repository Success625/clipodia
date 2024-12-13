import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { openDatabase, storeDataWithExpiry } from "../../utils";

interface Props {
  active: boolean;
  setActive: () => void;
  setUpdate: () => void;
}

const AddNewForm = ({
  active,
  setActive: toggleActive,
  setUpdate: updateClips,
}: Props) => {
  const inputFieldDefaultHeight = "40px";
  const [input, setInput] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    toggleActive();

    const db = await openDatabase("clipodia", "clipcontents");

    await storeDataWithExpiry(db, "clipcontents", { text: input });

    const inputField = document.querySelector(
      ".add-new-form-input"
    ) as HTMLInputElement;
    inputField.style.height = inputFieldDefaultHeight;

    setInput("");
    updateClips();
  };

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInput(event.target.value);

    event.target.style.height = inputFieldDefaultHeight;
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${active ? "active" : ""} add-new-form`}
        aria-label="New Content"
      >
        <textarea
          name="textContent"
          onChange={handleInput}
          value={input}
          className="add-new-form-input"
          placeholder="Enter your text content"
          required
        />

        <button type="submit" className="add-new-form-submit">
          Submit
        </button>
      </form>

      <div className="overlay" onClick={toggleActive}></div>
    </>
  );
};

export default AddNewForm;
