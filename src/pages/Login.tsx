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
    <div>
      <label htmlFor="id">아이디</label>
      <Input
        id="id"
        type="text"
        size="w-64 h-10"
        value={userId}
        onChange={setUserId}
      />
      <label htmlFor="password">비밀번호</label>
      <Input
        id="password"
        type="password"
        size="w-64 h-10"
        value={userPassword}
        onChange={setUserPassword}
      />
      <Button content="로그인" onClick={handleLogin} />
    </div>
  );
};

export default LoginPage;
