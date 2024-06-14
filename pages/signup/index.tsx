import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/login.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SignupValues } from "@/types/signup";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@/constants/emailRegex";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupValues>({
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const router = useRouter();
  const { user } = useAuth(false);

  const onSubmit: SubmitHandler<SignupValues> = async (data) => {
    let result;
    try {
      result = await axios.post("/auth/signUp", data);
    } catch (e) {}
    // NOTE - 회원가입 후 로그인 페이지로 이동
    router.push("/login");
  };

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={styles["input-container"]}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: EMAIL_REGEX,
                message: "잘못된 이메일 형식입니다.",
              },
            })}
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            className={`${styles.input} ${
              errors.email
                ? styles["error-border"]
                : styles["none-error-border"]
            }`}
          />
          {errors.email && (
            <p className={styles["error-message"]}>{errors.email.message}</p>
          )}
        </section>
        <section className={styles["input-container"]}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            {...register("nickname", { required: true })}
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            className={`${styles.input} ${
              errors.nickname
                ? styles["error-border"]
                : styles["none-error-border"]
            }`}
          />
          {errors.nickname && (
            <p className={styles["error-message"]}>닉네임을 작성해주세요</p>
          )}
        </section>
        <section className={styles["input-container"]}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <div>
            <input
              {...register("password", {
                required: "비밀번호를 작성해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="비밀번호를 입력해주세요"
              className={`${styles.input} ${
                errors.password
                  ? styles["error-border"]
                  : styles["none-error-border"]
              }`}
            />
            <Image
              alt="비밀번호 보이기"
              width={24}
              height={24}
              src={
                showPassword
                  ? "/assets/images/password-eye-on.svg"
                  : "/assets/images/password-eye-off.svg"
              }
              className={styles["password-eye"]}
              onClick={handleShowPassword}
            />
          </div>
          {errors.password && (
            <p className={styles["error-message"]}>{errors.password.message}</p>
          )}
        </section>
        <section className={styles["input-container"]}>
          <label htmlFor="passwordConfirmation" className={styles.label}>
            비밀번호 확인
          </label>
          <div>
            <input
              {...register("passwordConfirmation", {
                required: "비밀번호를 다시 작성해주세요",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              type={showPasswordConfirmation ? "text" : "password"}
              id="passwordConfirmation"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={`${styles.input} ${
                errors.passwordConfirmation
                  ? styles["error-border"]
                  : styles["none-error-border"]
              }`}
            />
            <Image
              alt="비밀번호 보이기"
              width={24}
              height={24}
              src={
                showPasswordConfirmation
                  ? "/assets/images/password-eye-on.svg"
                  : "/assets/images/password-eye-off.svg"
              }
              className={styles["password-eye"]}
              onClick={handleShowPasswordConfirmation}
            />
          </div>
          {errors.passwordConfirmation && (
            <p className={styles["error-message"]}>
              {errors.passwordConfirmation.message}
            </p>
          )}
        </section>
        <button
          type="submit"
          className={`${styles["signup-button"]} ${
            isValid && styles["able-button"]
          }`}
          disabled={!isValid}
        >
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
