interface props {
  onToggle: () => void;
}

const AddNew = ({ onToggle: toggle }: props) => {
  return (
    <div className="add-new">
      <button className="add-new-btn" onClick={toggle}>
        Add New
      </button>
    </div>
  );
};

export default AddNew;
