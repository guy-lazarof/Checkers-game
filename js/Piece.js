class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  createImage() {
    let id = `${this.row}_${this.col}`;
    const image = document.createElement("img");
    image.src = "images/" + this.player + "/" + this.type + ".png";
    document.getElementById(id).appendChild(image);
  }
  removeImage() {
    let id = `${this.row}_${this.col}`;
    document
      .getElementById(id)
      .removeChild(document.getElementById(id).lastElementChild);
  }

  getOpponent() {
    if (this.player === GameDefinision.WHITE_PLAYER) {
      return GameDefinision.BLACK_PLAYER;
    }
    {
      return GameDefinision.WHITE_PLAYER;
    }
  }

  getPossibleMoves() {
    this.absoluteMoves = [];
    this.filteredMoves = [];
    if (game.currentPlayer !== this.player || game.winner !== undefined) {
      return [];
    }
    if (this.type === GameDefinision.PAWN) {
      if (this.player === `white`) {
        this.absoluteMoves.push([this.row - 1, this.col - 1]);
        this.absoluteMoves.push([this.row - 1, this.col + 1]);
      } else {
        this.absoluteMoves.push([this.row + 1, this.col - 1]);
        this.absoluteMoves.push([this.row + 1, this.col + 1]);
      }
    }

    // filter the possible moves by the limits of the board size
    for (const onBoard of this.absoluteMoves) {
      const absoluteRow = onBoard[0];
      const absoluteCol = onBoard[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        if (
          //check if the cell after my opponent it empty
          boardManager.Board[absoluteRow][absoluteCol] !== undefined &&
          boardManager.Board[absoluteRow][absoluteCol].player ===
            this.getOpponent() &&
          2 * (absoluteRow - this.row) + this.row >= 0 &&
          2 * (absoluteRow - this.row) + this.row <= 7 &&
          2 * (absoluteCol - this.col) + this.col >= 0 &&
          2 * (absoluteCol - this.col) + this.col <= 7 &&
          boardManager.Board[2 * (absoluteRow - this.row) + this.row][
            2 * (absoluteCol - this.col) + this.col
          ] === undefined
        ) {
          this.filteredMoves.push([
            2 * (absoluteRow - this.row) + this.row,
            2 * (absoluteCol - this.col) + this.col,
          ]);
        } else if (
          boardManager.Board[absoluteRow][absoluteCol] !== undefined &&
          boardManager.Board[absoluteRow][absoluteCol].player === this.player
        ) {
          continue;
        } else if (boardManager.Board[absoluteRow][absoluteCol] === undefined) {
          this.filteredMoves.push(onBoard);
        }
      }
    }

    return this.filteredMoves;
  }
  Trans_To_Id_Cells(arrayToId) {
    let result = [];
    for (const filterID of arrayToId) {
      result.push(`${filterID[0]}_${filterID[1]}`);
    }
    return result;
  }
}
