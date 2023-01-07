import React from "react";
import {
  bonusItems,
  ItemsType,
  originItems,
  BeatType,
  beatItems,
} from "./helper";
import Avatar from "./Avatar";
import { useRouter } from "next/router";

const itemsList: { original: ItemsType[]; bonus: ItemsType[] } = {
  original: originItems,
  bonus: bonusItems,
};

const labels: { human: string; house: string; equal: string } = {
  human: "YOU WIN",
  house: "YOU LOSE",
  equal: "EQUAL",
};

const GameRender = ({ type }: { type: "original" | "bonus" }) => {
  const items = itemsList[type];
  const router = useRouter();

  const [winner, setWinner] = React.useState<
    "human" | "house" | "equal" | null
  >(null);
  const [showWinner, setShowWinner] = React.useState<boolean>(false);
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [picked, setPicked] = React.useState<{
    human?: keyof BeatType;
    house?: keyof BeatType;
  }>({});

  function handleWinner() {
    const { human, house } = picked;

    if (human && house) {
      const isHumanWinner = beatItems[human].includes(house);
      const isHouseWinner = beatItems[house].includes(human);
      const isEqual = house === human;

      if (isHumanWinner) {
        const score = router.query.score || 0;
        const newScore = +score + 1;
        router.push(`?score=${newScore}`);
        setWinner("human");
      }

      if (isHouseWinner) {
        setWinner("house");
      }

      if (isEqual) {
        setWinner("equal");
      }
    } else {
      setWinner(null);
    }
  }

  function handlePlayAgain() {
    setShowWinner(false);
    setShowResult(false);
    setPicked({});
  }

  function handlePick(humanPick: keyof BeatType) {
    setShowResult(true);
    setPicked({
      human: humanPick,
    });
    generateHousePick(humanPick);
  }

  function randomPickIndex(index: number): number {
    const maxIndex = type === "original" ? 3 : 5;
    const randomIndex = Math.floor(Math.random() * maxIndex);
    if (randomIndex === index) {
      return randomPickIndex(index);
    }

    return randomIndex;
  }

  function generateHousePick(humanPick: keyof BeatType) {
    let index = 100;

    const randomAvatar = setInterval(() => {
      index = randomPickIndex(index);

      const avatarKey = items[index].key;
      setPicked({
        human: humanPick,
        house: avatarKey,
      });
    }, 200);

    setTimeout(() => {
      clearInterval(randomAvatar);
      setShowWinner(true);
    }, 2000);
  }

  React.useEffect(() => {
    handleWinner();
  }, [showWinner]);

  if (showResult) {
    return (
      <div className="grid gap-8 items-center">
        <div className="flex flex-col-reverse gap-10 items-center md:flex-col md:col-start-1 md:row-start-1">
          <h1 className="text-xs font-medium text-white md:text-2xl">
            YOU PICKED
          </h1>
          <Avatar size="large" avatarType={picked.human} />
        </div>
        {showWinner && (
          <div className="flex flex-col gap-5 col-start-1 col-end-3 row-start-2 md:row-start-1 md:col-start-2">
            <h1 className="text-white font-extrabold text-5xl text-center">
              {winner && labels[winner]}
            </h1>
            <button className="btn-secondary" onClick={handlePlayAgain}>
              PLAY AGAIN
            </button>
          </div>
        )}
        <div className="flex flex-col-reverse gap-10 items-center md:flex-col md:col-start-3 md:row-start-1">
          <h1 className="text-xs font-medium text-white md:text-2xl">
            THE HOUSE PICKED
          </h1>
          <div>
            <Avatar size="large" avatarType={picked.house} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 w-1/2 gap-5">
      {items.map((item) => {
        return (
          <div
            key={item.key}
            className={item.gridPosition}
            onClick={() => handlePick(item.key)}
          >
            <Avatar avatarType={item.key} />
          </div>
        );
      })}
    </div>
  );
};

export default GameRender;
