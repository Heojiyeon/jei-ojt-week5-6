type ProfileProp = {
  name: string;
};

const Profile = ({ name }: ProfileProp) => {
  return (
    <div>
      <img src="/images/poi.png" alt="포이 이미지" width={120} />
      <div className="flex flex-col items-center text-[20px] mt-4 mb-8">
        <div>안녕하세요,</div>
        <div>{name}님</div>
      </div>
    </div>
  );
};

export default Profile;
