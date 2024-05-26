import { ChangeEvent, useEffect, useRef, useState } from "react";
import "styles/AddItemFileInput.css";

interface Props {
  onChange: (name: string, value: string | File | null) => void;
  name: string;
}

function AddItemFileInput({ onChange, name }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.item(0);
    if (nextValue) {
      onChange(name, nextValue);
      const nextPreview = URL.createObjectURL(nextValue);
      setPreview(nextPreview);
    }
  };

  const handleClearClick = () => {
    const fileInputNode = fileInputRef.current;
    if (!fileInputNode) {
      return;
    }
    fileInputNode.value = "";
    onChange(name, null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      // 정리함수
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <section className="img-input-container">
      <div className="img-input-label-container">
        <h2 className="img-input-title">상품 이미지</h2>
        <label htmlFor="img" className="img-input-label"></label>
        <input
          type="file"
          id="img"
          accept="image/*"
          className="img-input"
          ref={fileInputRef}
          onChange={handleChange}
          name={name}
        />
      </div>
      {preview && (
        <>
          <img src={preview} alt="이미지 미리보기" className="preview" />
          <input
            type="button"
            className="preview-delete-btn"
            onClick={handleClearClick}
          />
        </>
      )}
    </section>
  );
}

export default AddItemFileInput;
