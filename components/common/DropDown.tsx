import styles from "@/styles/DropDown.module.scss";
import { useRef, useState } from "react";
import { Order, orderOptions } from "@/types/order";

interface DropDownProps {
  selectedOption: Order;
  setSelectedOption: (option: Order) => void;
}

export default function DropDown({
  selectedOption,
  setSelectedOption,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Order) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles["dropdown-container"]}>
      <button onClick={handleToggleDropdown} className={styles["dropdown"]}>
        {orderOptions[selectedOption]}
      </button>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          {Object.values(Order).map((option) => (
            <div
              key={option}
              className={`${styles[`dropdown-${option}`]} ${
                styles["dropdown-common"]
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {orderOptions[option]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
