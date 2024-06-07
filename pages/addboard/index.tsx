import ImageInput from "@/components/common/ImageInput";
import { useAuth } from "@/contexts/AuthProvider";
import styles from "@/styles/AddBoard.module.scss";
import { AddBoardValues } from "@/types/board";
import { ChangeEvent, useEffect, useState } from "react";

export default function AddBoard() {
  const { user } = useAuth(false);
  const [isAble, setIsAble] = useState(true);
  const [values, setValues] = useState<AddBoardValues>({
    image: "",
    content: "",
    title: "",
  });

  const handleChange = (name: string, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  useEffect(() => {
    if (values.title && values.content) {
      setIsAble(false);
    } else {
      setIsAble(true);
    }
  }, [values]);

  return (
    <main className={styles.main}>
      <section className={styles["post-section"]}>
        <h2 className={styles.heading}>게시글 쓰기</h2>
        <button
          disabled={isAble}
          className={`${styles["post-button"]} ${
            !isAble ? styles["active-button"] : ""
          }`}
        >
          등록
        </button>
      </section>
      <section className={styles["input-section"]}>
        <label htmlFor="title" className={styles.label}>
          *제목
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={`${styles["title-input"]} ${styles["common-input"]}`}
          placeholder="제목을 입력해주세요."
          value={values.title}
          onChange={handleInputChange}
        />
      </section>
      <section className={styles["input-section"]}>
        <label htmlFor="content" className={styles.label}>
          *내용
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="내용을 입력해주세요."
          className={`${styles["content-input"]} ${styles["common-input"]}`}
          value={values.content}
          onChange={handleInputChange}
        />
      </section>
      <ImageInput name="image" onChange={handleChange} />
    </main>
  );
}
