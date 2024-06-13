import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "@/styles/ImageInput.module.scss";

interface ImageInputProps {
  onChange: (name: string, value: string | File | null) => void;
  name: string;
}

export default function AddImage({ onChange, name }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files?.[0];
    if (nextValue) {
      onChange(name, nextValue);
      const nextPreview = URL.createObjectURL(nextValue);
      setPreview(nextPreview);
    } else {
      onChange(name, null); // 파일이 없는 경우 null 전달
      setPreview(null);
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
    <section className={styles["img-input-container"]}>
      <div className={styles["img-input-label-container"]}>
        <h2 className={styles["img-input-title"]}>상품 이미지</h2>
        <label htmlFor="img" className={styles["img-input-label"]}></label>
        <input
          type="file"
          id="img"
          accept="image/*"
          className={styles["img-input"]}
          ref={fileInputRef}
          onChange={handleChange}
          name={name}
        />
      </div>
      {preview && (
        <>
          <img src={preview} alt="이미지 미리보기" className={styles.preview} />
          <input
            type="button"
            className={styles["preview-delete-btn"]}
            onClick={handleClearClick}
          />
        </>
      )}
    </section>
  );
}
