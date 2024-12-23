import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiUser } from "react-icons/fi";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { IDropDown } from "@/interfaces/nav";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/store/userSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BOOKING_QUERY_KEY,
  BOOKINGS_BY_STATUS_KEY,
  BOOKINGS_BY_USER_KEY,
  USER_QUERY_KEY,
} from "@/consts/reactQuery";
import { useQueryClient } from "@tanstack/react-query";

const UserDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const userInfo = useSelector((state: any) => state.user);

  const initials = `${userInfo?.first?.charAt(0)}${userInfo?.last?.charAt(0)}`;

  const logUserOut = async () => {
    dispatch(removeUser(`logOut`));

    const keysToInvalidate = [
      BOOKING_QUERY_KEY,
      BOOKINGS_BY_USER_KEY + userInfo._id,
      BOOKINGS_BY_STATUS_KEY + `active`,
      USER_QUERY_KEY,
    ];

    for (const key of keysToInvalidate) {
      await queryClient.invalidateQueries({ queryKey: [key] });
    }

    navigate(`/`);
  };

  const signedInMenu = [
    {
      label: `Profile`,
      icon: <HiOutlineUser size={18} />,
      action: () => navigate(`/user/edit/${userInfo._id}`),
    },
    {
      label: `Log Out`,
      icon: <HiMiniArrowLeftStartOnRectangle size={18} />,
      action: logUserOut,
    },
  ];
  const signedOutMenu = [
    {
      label: `Log In`,
      icon: <HiArrowRightEndOnRectangle size={18} />,
      action: () => navigate(`user/login/`),
    },
    {
      label: `Register`,
      icon: <HiOutlineUserPlus size={18} />,
      action: () => navigate("user/register"),
    },
  ];
  const [dropdownMenuContent, setDropdownMenuContent] = useState<IDropDown[]>(
    userInfo?._id ? signedInMenu : signedOutMenu
  );

  useEffect(() => {
    setDropdownMenuContent(userInfo._id ? signedInMenu : signedOutMenu);
  }, [userInfo]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-2 border-secondary  hover:bg-secondary group rounded-full cursor-pointer transition-all duration-300">
        {userInfo.first ? (
          <Avatar>
            <AvatarFallback className="capitalize">{initials}</AvatarFallback>
          </Avatar>
        ) : (
          <FiUser className="text-primary-foreground  text-4xl p-2 group-hover:text-secondary-foreground group-hover:scale-125 transition-all duration-300" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownMenuContent.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className="flex justify-between cursor-pointer"
            onClick={item.action}
          >
            <span>{item.label}</span>
            {item.icon}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
