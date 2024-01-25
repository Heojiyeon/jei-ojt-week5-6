import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('userPassword', userPassword);

    try {
      const response: AxiosResponse = await axios.post('/login', formData);

      if (response.status === 200) {
        window.location.replace('/main');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('에러 발생:', error.message);
      } else {
        console.error('알 수 없는 에러:', error);
      }
      alert('로그인 실패');

      setUserId('');
      setUserPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center mt-40">
      <div className="flex flex-col items-center">
        <div className="text-[#E5001A] text-[50px] font-bold">JEI</div>
        <div className="text-[30px] font-bold">학습서비스</div>
      </div>
      <div className="flex flex-col m-12">
        <label htmlFor="id">아이디</label>
        <Input
          id="id"
          type="text"
          size="w-64 h-10"
          value={userId}
          onChange={setUserId}
        />
        <label htmlFor="password" className="mt-4">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          size="w-64 h-10"
          value={userPassword}
          onChange={setUserPassword}
        />
      </div>
      <Button
        id="login"
        content="로그인"
        size="w-64 h-10"
        onClick={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
