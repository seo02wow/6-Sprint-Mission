import Image from "next/image";
import Link from "next/link";
import pandaLogoImg from "@/public/assets/images/panda-logo.svg";
import pandaTextLogoImg from "@/public/assets/images/panda-text-logo.svg";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const isActive = (pathname: string): string => {
    return router.pathname.startsWith(pathname) ? "active-category" : "";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles["nav-ul"]}>
        <div className={styles["logo-category-container"]}>
          <li>
            <Link href="/" className={styles["logo-container"]}>
              <Image
                className={styles.logo}
                src={pandaLogoImg}
                alt="판다마켓 로고"
              />
              <Image
                className={styles["text-logo"]}
                src={pandaTextLogoImg}
                alt="판다마켓 텍스트 로고"
              />
            </Link>
          </li>
          <div className={styles["nav-category-container"]}>
            <li>
              <Link
                href="/boards"
                className={`${styles["nav-category"]} ${
                  styles[isActive("/board")]
                }`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`${styles["nav-category"]} ${
                  styles[isActive("/items")]
                } ${styles[isActive("/addItem")]}`}
              >
                중고마켓
              </Link>
            </li>
          </div>
        </div>
        <li className={styles["login-btn-container"]}>
          <Link href="/login" className={styles["login-btn"]}>
            로그인
          </Link>
        </li>
      </ul>
    </nav>
  );
}
