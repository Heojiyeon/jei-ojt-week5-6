type ProfileProp = {
  name: string;
};

const Profile = ({ name }: ProfileProp) => {
  return (
    <div>
      <img src="/images/poi.png" alt="포이 이미지" />
      <div>
        안녕하세요, <br />
        {name}님
      </div>
    </div>
  );
};

export default Profile;
