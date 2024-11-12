import { IUser } from "@/interfaces/user";
import React, { useState } from "react";
import { Label } from "../ui/label";
import ProfileItemContainer from "./ProfileItemContainer";

interface ProfileContainerProps {
  user?: IUser;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ user }) => {
  const [userData, setUserData] = useState(user);

  return (
    <div className=" ">
      <h1>Profile</h1>
      <div>
        <ProfileItemContainer />
      </div>
    </div>
  );
};

export default ProfileContainer;
