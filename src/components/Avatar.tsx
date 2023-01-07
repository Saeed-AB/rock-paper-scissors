import React, { FC } from "react";
import clsx from "clsx";

import RockIcon from "../images/icon-rock.svg";
import PaperIcon from "../images/icon-paper.svg";
import ScissorsIcon from "../images/icon-scissors.svg";
import LizardIcon from "../images/icon-lizard.svg";
import SpockIcon from "../images/icon-spock.svg";
import { BeatType, ItemsType } from "./helper";

type ListTypes = Omit<ItemsType, "gridPosition">;

export const items: ListTypes[] = [
  {
    key: "scissors",
    icon: <ScissorsIcon />,
    bgColor: "bg-[#eaa422]",
  },
  {
    key: "paper",
    icon: <PaperIcon />,
    bgColor: "bg-[#4d6cf6]",
  },
  {
    key: "rock",
    icon: <RockIcon />,
    bgColor: "bg-[#de3957]",
  },
  {
    key: "lizard",
    icon: <LizardIcon />,
    bgColor: "bg-[#8955e5]",
  },
  {
    key: "spock",
    icon: <SpockIcon />,
    bgColor: "bg-[#45b8ce]",
  },
];

const sizeClasses: { small: string; medium: string; large: string } = {
  small: "w-[100px] h-[100px]",
  medium: "w-[125px] h-[125px] p-5",
  large:
    "w-[150px] h-[150px] p-8 [&>div>svg]:w-[100px] [&>div>svg]:h-[100px] md:w-[250px] md:h-[250px]",
};

type AvatarTypes = {
  size?: "small" | "large";
  avatarType?: keyof BeatType;
};

const Avatar: FC<AvatarTypes> = ({ avatarType, size }) => {
  const selectedAvatar = items.find(({ key }) => key === avatarType);
  let activeSize = sizeClasses["medium"];

  if (size) {
    activeSize = sizeClasses[size];
  }

  return (
    <div
      className={clsx(
        "rounded-full cursor-pointer",
        selectedAvatar?.bgColor,
        activeSize
      )}
    >
      <div
        className={clsx(
          "flex justify-center items-center bg-white w-full h-full rounded-full",
          !selectedAvatar?.icon && "!bg-[#00000038]"
        )}
      >
        {selectedAvatar?.icon}
      </div>
    </div>
  );
};

export default Avatar;
