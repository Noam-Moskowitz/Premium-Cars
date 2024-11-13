import { IUser } from "@/interfaces/user";
import React, { useEffect, useState } from "react";
import ProfileItemContainer from "./ProfileItemContainer";

interface ProfileContainerProps {
  user?: IUser;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ user }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isEditable, setisEditable] = useState(false);

  const handleChange = <K extends keyof IUser>(value: IUser[K], key: K) => {
    if (!userData) return;

    const newUser = { ...userData, [key]: value };

    setUserData(newUser);
  };

  useEffect(() => {
    if (!user) return;

    delete user?._id;
    delete user?.isAdmin;
    delete user?.__v;

    setUserData(user);
  }, [user]);

  return (
    <div className=" size-full border-2 p-10">
      <h1 onClick={() => setisEditable(!isEditable)}>Profile</h1>
      <div className="w-[30%]">
        {Object.entries(userData || []).map((entry, i) => (
          <ProfileItemContainer
            onValueChange={(val) => handleChange(val, entry[0])}
            editable={isEditable}
            title={entry[0]}
            value={entry[1]}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileContainer;
