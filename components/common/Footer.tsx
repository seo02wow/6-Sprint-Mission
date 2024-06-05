import styles from "@/styles/Footer.module.scss";
import facebookIcon from "@/public/assets/icons/icon-facebook.png";
import twitterIcon from "@/public/assets/icons/icon-twitter.png";
import youtubeIcon from "@/public/assets/icons/icon-youtube.png";
import instagramIcon from "@/public/assets/icons/icon-instagram.png";
import Image from "next/image";

export default function Footer() {
  return (
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
  );
}
