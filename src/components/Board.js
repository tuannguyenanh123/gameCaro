import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const style = {
  width: "300px",
  height: "300px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
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
  for (let [a, b, c] of winRule) {
    // let [a, b, c] = winRule[i]
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
};
const isDraw = (board) => {
  //check cell empty?
  return board.filter((cell) => cell === "").length === 0;
};
const Board = () => {
  const [state, setState] = useState({
    player: "X",
    point: {
      X: 0,
      O: 1,
    },
    data: Array(9).fill(""),
    isStopGame: false,
    noti: "",
  });
  console.log(state.data);
  useEffect(() => {
    localStorage.setItem("point", JSON.stringify(state.point));
    const data = JSON.parse(localStorage.getItem("point"));
    // alert(
    //   `người chơi X đã có ${data.X} ván thắng và người chơi O đã có ${data.O} ván thắng`
    // );
    if (state.noti !== "") {
      alert(state.noti);
    }
    // set lại state.point lấy từ localstorage
    return () => {
      setState({
        player: "X",
        point: {
          ...data,
        },
        data: Array(9).fill(""),
        isStopGame: false,
        noti: "",
      });
    };
  }, [state.noti]);
  const handleClick = (index) => {
    if (state.isStopGame) {
      return;
    }
    if (state.data[index] === "") {
      state.data[index] = state.player;
      setState({
        ...state,
        player: state.player === "X" ? "O" : "X",
        data: state.data,
      });
    }
    if (isWin(state.data)) {
      setState({
        ...state,
        isStopGame: true,
        noti: `Người chơi hệ ${state.player} đã chiến thắng`,
        point:
          state.player === "X"
            ? {
                ...JSON.parse(localStorage.getItem("point")),
                X: state.point.X + 1,
              }
            : {
                ...JSON.parse(localStorage.getItem("point")),
                O: state.point.O + 1,
              },
      });
      localStorage.setItem("point", JSON.stringify(state.point));
    }
    if (!isWin(state.data) && isDraw(state.data)) {
      setState({
        ...state,
        isStopGame: true,
        noti: "Trận đấu hòa",
      });
      console.log(">>>>>");
    }
  };
  localStorage.setItem("point", JSON.stringify(state.point));

  return (
    <div style={style}>
      {[...Array(9)].map((cell, index) => (
        <Cell
          key={index}
          data={state.data}
          index={index}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Board;
