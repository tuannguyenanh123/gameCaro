import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const winRule = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const isWin = (board) => {
  for (let i = 0; i < board.length; i++) {
    let [a, b, c] = winRule[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
};
const isDraw = (board) => {
  //check cell empty?
  return board.filter((cell) => !cell).length === 0;
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// func xác định vị trí cho người chơi thứ 2
function LocatePlayer2(board, player) {
  let randLocate = getRandomInt(0, 9);
  // lặp cho tới khi tìm dc vị trí còn trống từ 0->9 để gán cho randLocate
  while (board[randLocate]) {
    randLocate = getRandomInt(0, 9);
  }
  return randLocate;
}

function App() {
  // useEffect(() => {
  //   alert("ARE YOU READY !!!");
  // }, []);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isStopGame, setIsStopGame] = useState(false);
  const [noti, setNoti] = useState("");
  const [player, setPlayer] = useState("X");
  const handleClick = (index) => {
    if (isStopGame) {
      return;
    }
    if (board[index]) {
      return;
    }
    const boardNew1 = [...board];
    boardNew1[index] = player;
    setBoard(boardNew1);
    if (isWin(boardNew1)) {
      setIsStopGame(true);
      console.log(noti);
      setNoti(`${player} won`);
      console.log(noti);

      // alert(noti);
      return;
    }
    if (isDraw(boardNew1)) {
      setIsStopGame(true);
      setNoti("Draw");
      // alert(noti);
      return;
    }
    //player 2
    setTimeout(() => {
      console.log(">>>");
      setPlayer("O");
      const player2Index = LocatePlayer2(boardNew1, player);
      const boardNew2 = [...boardNew1];
      boardNew2[player2Index] = player;
      setBoard(boardNew2);
    }, 500);
  };

  return (
    <div className="App" style={style}>
      <Board value={board} handleClick={handleClick} />
    </div>
  );
}

export default App;
