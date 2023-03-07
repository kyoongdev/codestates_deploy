import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import { KakaoLoginIcon } from "../../../assets/icon";
import { kakaoLogin } from "../../../api/Auth";
import config from "../../../config";

//MEMO: lodash => lodash-es
const Login = () => {
  // const { register, handleSubmit } = useForm();
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    // TODO: login API 연동
    // await loginApi({
    //   userId: form.userId,
    //   password: form.password,
    // });
  };

  const onClickKakao = async () => {
    // window.open(`${config.API_URL}/auth/kakao`, "_self");
    const response = await kakaoLogin();
    console.log(response);
    if (response.status === 200) {
      window.open(response.data.url, "_self");
    }
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <h1>로그인</h1>
        <form
          id="loginForm"
          className={styles.loginForm}
          // onSubmit={handleSubmit(onSubmitForReactForm)}
          onSubmit={onSubmit}
        >
          <label className={styles.inputWrapper}>
            <p>아이디</p>
            <input
              placeholder="아이디를 입력해주세요."
              name="userId"
              value={form.userId}
              onChange={onChange}
              // {...register("userId")}
            />
          </label>
          <label className={styles.inputWrapper}>
            <p>비밀번호</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              value={form.password}
              onChange={onChange}
              // {...register("password")}
            />
          </label>
          <button
            className={styles.submitButton}
            type="submit"
            form="loginForm"
          >
            로그인
          </button>
          <button
            className={styles.kakaoButton}
            type="button"
            onClick={onClickKakao}
          >
            <KakaoLoginIcon />
            카카오로 로그인하기
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
