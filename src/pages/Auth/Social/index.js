import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

const Social = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const result = qs.parse(location.search);

    //MEMO: 성공
    if (result.status === "200") {
      //TODO: 토큰 저장
      const { accessToken, refreshToken } = result;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      //TODO: 메인페이지로 이동
      navigate("/");
    }
    //MEMO: 실패
    else {
      navigate(`/social/register?token=${result.kakaoAccessToken}`);
    }
  }, [location]);
  return <div></div>;
};

export default Social;
