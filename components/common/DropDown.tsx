import styles from "@/styles/DropDown.module.scss";
import { useRef, useState } from "react";

interface DropDownProps {
  onOrderChange: (order: string) => void;
}

export default function DropDown({ onOrderChange }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOrderChange(option === "최신순" ? "recent" : "like");
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles["dropdown-container"]}>
      <button onClick={handleToggleDropdown} className={styles["dropdown"]}>
        {selectedOption}
      </button>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          <div
            className={styles["dropdown-recent"]}
            onClick={() => handleOptionClick("최신순")}
          >
            최신순
          </div>
          <div
            className={styles["dropdown-like"]}
            onClick={() => handleOptionClick("인기순")}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}
