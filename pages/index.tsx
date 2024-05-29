import styles from "@/styles/Home.module.css";
import homeTop from "@/public/assets/images/Img-home-top.png";
import homeBottom from "@/public/assets/images/Img-home-bottom.png";
import mainHotItem from "@/public/assets/images/main-hot-item.png";
import mainSearch from "@/public/assets/images/main-search.png";
import mainRegister from "@/public/assets/images/main-register.png";
import facebookIcon from "@/public/assets/icons/icon-facebook.png";
import twitterIcon from "@/public/assets/icons/icon-twitter.png";
import youtubeIcon from "@/public/assets/icons/icon-youtube.png";
import instagramIcon from "@/public/assets/icons/icon-instagram.png";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      {/* 상단 베너 */}
      <header className={styles["home-top-container"]}>
        <div className={styles["home-top"]}>
          <div className={styles["home-top-title-btn"]}>
            <h1 className={styles["home-top-title"]}>
              {`일상의 모든 물건을
              거래해 보세요`}
            </h1>
            <Link href="/" className={styles["items-btn"]}>
              구경하러 가기
            </Link>
          </div>
          <Image
            src={homeTop}
            alt="상단 베너 판다 이미지"
            className={styles["home-top-img"]}
          />
        </div>
      </header>
      {/* 메인 */}
      <main className={styles["home-main"]}>
        <section className={styles["home-section"]}>
          <Image
            src={mainHotItem}
            alt="메인 이미지1"
            className={styles["main-img"]}
          />
          <div className={styles["main-container"]}>
            <h3 className={styles["main-topic"]}>Hot Item</h3>
            <h2 className={styles["main-title"]}>
              {`인기 상품을
            확인해 보세요`}
            </h2>
            <p className={styles["main-content"]}>
              {`가장 HOT한 중고거래 물품을
              판다 마켓에서 확인해 보세요`}
            </p>
          </div>
        </section>
        <section className={styles.right}>
          <div className={styles["main-container-right"]}>
            <h3 className={styles["main-topic"]}>Search</h3>
            <h2 className={styles["main-title"]}>
              {`구매를 원하는
            상품을 검색하세요`}
            </h2>
            <p className={styles["main-content"]}>
              {`구매하고 싶은 물품은 검색해서
              쉽게 찾아보세요`}
            </p>
          </div>
          <Image
            src={mainSearch}
            alt="메인 이미지2"
            className={styles["main-img main-img-middle"]}
          />
        </section>
        <section className={styles["home-section"]}>
          <Image src={mainRegister} alt="메인 이미지3" className="main-img" />
          <div className={styles["main-container"]}>
            <h3 className={styles["main-topic"]}>Register</h3>
            <h2 className={styles["main-title"]}>
              {`판매를 원하는
            상품을 등록하세요`}
            </h2>
            <p className={styles["main-content"]}>
              {`어떤 물건이든 판매하고 싶은 상품을
              쉽게 등록하세요`}
            </p>
          </div>
        </section>
      </main>
      <div className={styles["home-bottom-background-color"]}>
        <div className={styles["home-bottom-container"]}>
          <h2 className={styles["home-bottom"]}>
            {`믿을 수 있는
          판다마켓 중고거래`}
          </h2>
          <Image
            className={styles["home-bottom-img"]}
            src={homeBottom}
            alt="판다 중고거래 이미지"
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles["footer-container"]}>
          <p className={styles["footer-codeit"]}>@codeit - 2024</p>
          <div className={styles["footer-center"]}>
            <a href="/privacy.html" className={styles["footer-privacy"]}>
              Privacy Policy
            </a>
            <a href="/faq.html" className={styles["footer-faq"]}>
              FAQ
            </a>
          </div>
          <div className={styles["footer-ic"]}>
            <a href="https://www.facebook.com" target="_blank">
              <Image src={facebookIcon} alt="페이스북 로고 아이콘" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <Image src={twitterIcon} alt="트위터 로고 아이콘" />
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <Image src={youtubeIcon} alt="유튜브 로고 아이콘" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <Image src={instagramIcon} alt="인스타그램 로고 아이콘" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
