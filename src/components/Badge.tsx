const Badge = () => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <img
          src="/images/high-score.png"
          alt="100점 이미지"
          width={150}
          height={150}
          style={{ margin: '1rem' }}
        />
        100점 획득!
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/images/welcome-badge.png"
          alt="100점 이미지"
          width={150}
          height={150}
          style={{ margin: '1rem' }}
        />
        환영해요!
      </div>
    </div>
  );
};

export default Badge;
