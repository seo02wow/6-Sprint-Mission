import styles from "@/styles/SearchForm.module.scss";

export default function SearchForm() {
  return (
    <form>
      <input
        className={styles["search-bar"]}
        placeholder="검색할 상품을 입력해주세요"
        type="search"
      />
    </form>
  );
}
