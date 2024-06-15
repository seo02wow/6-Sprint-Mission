import AddImage from "@/components/common/AddImage";
import { useAuth } from "@/contexts/AuthProvider";
import styles from "@/styles/AddBoard.module.scss";
import { AddBoardValues } from "@/types/board";
import { getCookie } from "cookies-next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function AddBoard() {
  const { user } = useAuth(true);
  const [isAble, setIsAble] = useState(true);
  const router = useRouter();
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = getCookie("accessToken");
    const { image, content, title } = values;
    let imageUrl;

    try {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imageResult = await axios.post("/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        imageUrl = imageResult.data.url;
      }

      await axios.post(
        "/articles",
        { image: imageUrl, content, title },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Navigate to the boards page
      router.push("/boards");
    } catch (error) {
      console.error("Failed to submit the form", error);
    }
  };

  useEffect(() => {
    if (values.title && values.content) {
      setIsAble(false);
    } else {
      setIsAble(true);
    }
  }, [values]);

  return (
    <form className={styles.main} onSubmit={handleSubmit}>
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
      <AddImage name="image" onChange={handleChange} />
    </form>
  );
}
