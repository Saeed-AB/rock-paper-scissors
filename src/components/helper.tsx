import RockIcon from "../images/icon-rock.svg";
import PaperIcon from "../images/icon-paper.svg";
import ScissorsIcon from "../images/icon-scissors.svg";
import LizardIcon from "../images/icon-lizard.svg";
import SpockIcon from "../images/icon-spock.svg";

export type BeatType = {
  scissors: string[];
  paper: string[];
  rock: string[];
  lizard: string[];
  spock: string[];
};
export type ItemsType = {
  bgColor: string;
  key: keyof BeatType;
  gridPosition: string;
  icon: any;
};

export const bonusItems: ItemsType[] = [
  {
    key: "scissors",
    icon: <ScissorsIcon />,
    bgColor: "bg-[#eaa422]",
    gridPosition: "col-start-3",
  },
  {
    key: "paper",
    icon: <PaperIcon />,
    bgColor: "bg-[#4d6cf6]",
    gridPosition: "col-start-2 row-start-2",
  },
  {
    key: "rock",
    icon: <RockIcon />,
    bgColor: "bg-[#de3957]",
    gridPosition: "col-start-4 row-start-2",
  },
  {
    key: "lizard",
    icon: <LizardIcon />,
    bgColor: "bg-[#8955e5]",
    gridPosition: "col-start-2 row-start-3",
  },
  {
    key: "spock",
    icon: <SpockIcon />,
    bgColor: "bg-[#45b8ce]",
    gridPosition: "col-start-4 row-start-3",
  },
];

export const originItems: ItemsType[] = [
  {
    key: "paper",
    icon: <PaperIcon />,
    bgColor: "bg-[#4d6cf6]",
    gridPosition: "col-start-2",
  },
  {
    key: "scissors",
    icon: <ScissorsIcon />,
    bgColor: "bg-[#eaa422]",
    gridPosition: "col-start-4",
  },
  {
    key: "rock",
    icon: <RockIcon />,
    bgColor: "bg-[#de3957]",
    gridPosition: "col-start-3 row-start-3",
  },
];

export const beatItems: BeatType = {
  scissors: ["paper", "lizard"],
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};
