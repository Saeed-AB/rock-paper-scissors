import { Modal } from "@/components";
import Link from "next/link";
import React, { FC, useState } from "react";
import GameRender from "./GameRender";
import CloseIcon from "../images/icon-close.svg";

type WrapperTypes = {
  type: "original" | "bonus";
};

const ruleImages = {
  original: 'bg-[url("../images/image-rules.svg")]',
  bonus: 'bg-[url("../images/image-rules-bonus.svg")]',
};
const linkRef = {
  original: "/bonus",
  bonus: "/",
};

const Wrapper: FC<WrapperTypes> = ({ type }) => {
  const ruleImage = ruleImages[type];
  const [score, setScore] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function resetGame() {
    setScore(0);
    window.localStorage.setItem(`${type}_score`, "0");
  }

  function getInitialScore() {
    const initScore = window.localStorage.getItem(`${type}_score`) || 0;
    setScore(+initScore);
  }

  React.useEffect(() => {
    getInitialScore();
  });

  return (
    <div className=" flex flex-col p-6 justify-between items-center w-full h-screen min-w-[375px]">
      {/* Score */}
      <div className="flex justify-between w-full  max-w-2xl border-2 border-[#54607b] rounded-xl p-4">
        <div
          className={`[&>h1]:text-white [&>h1]:font-extrabold [&>h1]:uppercase [&>h1]:!leading-none ${
            type === "bonus"
              ? "[&>h1]:text-xs md:[&>h1]:text-lg"
              : "[&>h1]:text-xl md:[&>h1]:text-3xl"
          }`}
        >
          <h1>Rock</h1>
          <h1>Paper</h1>
          <h1>Scissors</h1>
          {type === "bonus" && (
            <>
              <h1>Lizard</h1>
              <h1>Spock</h1>
            </>
          )}
        </div>
        <div className="flex flex-col p-2 items-center bg-white w-28 h-full rounded-md">
          <h6 className="text-[#5a6bac] font-medium text-xs md:text-sm">
            SCORE
          </h6>
          <p className="leading-none font-extrabold text-[28px] text-[#555264] md:text-[54px]">
            {score}
          </p>
        </div>
      </div>

      <GameRender type={type} score={score} setScore={setScore} />

      {/* Footer */}
      <div className="flex gap-4 flex-col justify-center md:flex-row">
        <Link
          href={linkRef[type]}
          className="btn-primary uppercase text-center"
        >
          {type === "bonus" ? "original" : "bonus"}
        </Link>
        <button className="btn-primary" onClick={handleOpenModal}>
          RULES
        </button>
        <button className="btn-primary" onClick={resetGame}>
          RESET
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div
          className={`flex flex-col gap-7 justify-center w-[304px] ${
            type === "original" ? "w-[304px]" : "w-[340px]"
          }`}
        >
          <div className="flex justify-between">
            <h1 className="text-[#54596f] text-3xl font-extrabold">RULES</h1>
            <CloseIcon className="cursor-pointer" onClick={handleCloseModal} />
          </div>
          <div
            className={`relative w-full ${
              type === "original" ? "h-[270px]" : "h-[330px]"
            } ${ruleImage}`}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Wrapper;
