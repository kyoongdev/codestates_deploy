import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoRegister } from "../../../../api/Auth";
import qs from "query-string";
import styles from "./register.module.scss";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const emailReg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailReg.test(form.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    const search = qs.parse(location.search);

    const response = await kakaoRegister({
      email: form.email,
      name: form.name,
      token: search.token,
    });

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    }
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <h1>소셜 회원가입</h1>
        <form id="loginForm" className={styles.loginForm} onSubmit={onSubmit}>
          <label className={styles.inputWrapper}>
            <p>이름</p>
            <input
              placeholder="이름을 입력해주세요."
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </label>
          <label className={styles.inputWrapper}>
            <p>이메일</p>
            <input
              placeholder="이메일을 입력해주세요."
              name="email"
              autoComplete="off"
              value={form.email}
              onChange={onChange}
            />
          </label>
          <button
            className={styles.submitButton}
            type="submit"
            form="loginForm"
          >
            로그인
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
