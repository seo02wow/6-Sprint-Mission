import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/login.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupValues } from "@/types/signup";
import axios from "@/lib/axios";

export default function Signup() {
  const [values, setValues] = useState<SignupValues>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, nickname, password, passwordConfirmation } = values;

    let result;
    try {
      result = await axios.post("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });
    } catch (e) {}
  };

  return (
    <main className={styles.main}>
      <div className={styles["logo-wrapper"]}>
        <Link href="/">
          <Image
            alt="랜딩페이지로 이동하는 판다마켓 로고"
            fill
            src="/assets/images/panda-logo-text.svg"
          />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <section className={styles["input-container"]}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            className={styles.input}
            onChange={handleInputChange}
            value={values.email}
          />
        </section>
        <section className={styles["input-container"]}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            className={styles.input}
            onChange={handleInputChange}
            value={values.nickname}
          />
        </section>
        <section className={styles["input-container"]}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
              className={styles.input}
              onChange={handleInputChange}
              value={values.password}
            />
            <Image
              alt="비밀번호 보이기"
              width={24}
              height={24}
              src="/assets/images/password-eye-off.svg"
              className={styles["password-eye"]}
            />
          </div>
        </section>
        <section className={styles["input-container"]}>
          <label htmlFor="passwordConfirmation" className={styles.label}>
            비밀번호 확인
          </label>
          <div>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              name="passwordConfirmation"
              className={styles.input}
              onChange={handleInputChange}
              value={values.passwordConfirmation}
            />
            <Image
              alt="비밀번호 보이기"
              width={24}
              height={24}
              src="/assets/images/password-eye-off.svg"
              className={styles["password-eye"]}
            />
          </div>
        </section>
        <button type="submit" className={styles["signup-button"]}>
          회원가입
        </button>
      </form>
      <section className={styles["easy-login-section"]}>
        <div className={styles["easy-login"]}>
          <p>간편 로그인하기</p>
          <div className={styles["easy-login-icon"]}>
            <Link
              href="https://www.google.com/"
              className={styles["easy-login-a"]}
            >
              <Image
                src="/assets/icons/icon-google.svg"
                alt="구글 간편 로그인"
                width={42}
                height={42}
              />
            </Link>
            <Link
              href="https://www.kakaocorp.com/page/"
              className={styles["easy-login-a"]}
            >
              <Image
                src="/assets/icons/icon-kakaotalk.svg"
                alt="카카오톡 간편 로그인"
                width={42}
                height={42}
              />
            </Link>
          </div>
        </div>
        <div className={styles["move-signup-container"]}>
          <p>
            이미 회원이신가요?
            <Link href="/login" className={styles["move-login"]}>
              로그인
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
