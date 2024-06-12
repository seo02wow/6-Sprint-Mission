import useDeviceSize from "@/hooks/useDeviceSize";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "@/styles/BestArticle.module.scss";
import { Article } from "@/types/board";
import BestArticleCard from "./BestArticle";

export default function BestArticleList() {
  const { isDesktop, isMobile, isTablet, bestPageSizeCount } = useDeviceSize();
  const [bestArticleList, setBestArticleList] = useState<Article[]>([]);
  const [bestPageSize, setBestPageSize] = useState(bestPageSizeCount);

  async function getBestArticleList() {
    const res = await axios.get(
      `/articles?pageSize=${bestPageSize}&orderBy=like`
    );
    const nextArticleList = res.data.list;
    setBestArticleList(nextArticleList);
  }

  useEffect(() => {
    getBestArticleList();
  }, [bestPageSize]);

  useEffect(() => {
    if (isMobile) {
      setBestPageSize(1);
    } else if (isTablet) {
      setBestPageSize(2);
    } else if (isDesktop) {
      setBestPageSize(3);
    }
  }, [isMobile, isTablet, isDesktop]);

  return (
    <div className={styles["best-article-list-container"]}>
      {bestArticleList.map((article) => {
        return <BestArticleCard key={article.id} article={article} />;
      })}
    </div>
  );
}
