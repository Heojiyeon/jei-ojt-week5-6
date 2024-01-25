import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-60">
      <img src="/images/no-result.png" alt="포이 이미지" />
      <div className="text-[24px] text-[#A5A5A5] mt-8">잘못된 페이지에요..</div>
      <Button
        id="login"
        content="처음으로 돌아가기"
        size="w-64 h-10 mt-16"
        onClick={() => navigate('/')}
      />
    </div>
  );
};

export default NotFoundPage;
