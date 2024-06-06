import styles from "@/styles/SearchForm.module.scss";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

interface SearchFormProps {
  keyword: string;
  onChangeKeyword: (newKeyword: string) => void;
}

export default function SearchForm({
  keyword,
  onChangeKeyword,
}: SearchFormProps) {
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeKeyword(localKeyword);
    if (!localKeyword) {
      return router.push("/boards");
    }
    return router.push(`/boards?keyword=${localKeyword}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles["search-bar"]}
        placeholder="검색할 상품을 입력해주세요"
        type="search"
        name="keyword"
        onChange={handleChange}
        value={localKeyword}
      />
    </form>
  );
}
