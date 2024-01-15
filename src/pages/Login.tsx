import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.replace('/main');
    console.log('clicked login button');
  };
  return (
    <div>
      <label htmlFor="id">아이디</label>
      <Input id="id" type="text" size="w-64 h-10" />
      <label htmlFor="password">비밀번호</label>
      <Input id="password" type="password" size="w-64 h-10" />
      <Button content="로그인" onClick={handleLogin} />
    </div>
  );
};

export default LoginPage;
