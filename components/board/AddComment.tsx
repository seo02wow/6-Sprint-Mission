import { useAuth } from "@/contexts/AuthProvider";
import styles from "@/styles/CommentInput.module.scss";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { getCookie } from "cookies-next";

interface CommentInputProps {
  articleId: string;
}

export default function AddComment({ articleId }: CommentInputProps) {
  const [content, setContent] = useState("");
  const buttonDisabled = content.trim().length === 0;
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
    let result;
    const accessToken = getCookie("accessToken");
    try {
      result = await axios.post(
        `/articles/${articleId}/comments`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {}
    setContent("");
    // NOTE - 댓글 입력 후 바로 데이터 업데이트하기 위해 강제 reload 처리
    window.location.reload();
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles["comment-input-section"]}>
        <label htmlFor="comment" className={styles.label}>
          댓글 달기
        </label>
        <input
          type="text"
          id="comment"
          placeholder="댓글을 입력해주세요"
          className={styles["comment-input"]}
          value={content}
          onChange={handleChange}
        />
        <button
          className={`${styles["comment-button"]} ${
            !buttonDisabled ? styles["active-button"] : ""
          }`}
          type="submit"
          disabled={buttonDisabled}
        >
          등록
        </button>
      </form>
    </section>
  );
}
