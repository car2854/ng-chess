import { GameConfig } from "../config";
import { ColorEnum, PiecesEnum } from "../enum";
import { ChessModel, PieceModel } from "../models";



export const initChess = () => {

  const list: ChessModel[][] = [];
  for (let i = 0; i < GameConfig.boardSize; i++) {
    const row: ChessModel[] = [];
    for (let j = 0; j < GameConfig.boardSize; j++) {
      row.push(new ChessModel('',null, null))
    }
    list.push(row);
  }

  list[0][0].piece = new PieceModel(PiecesEnum.ROOK, ColorEnum.BLACK);
  list[0][1].piece = new PieceModel(PiecesEnum.KNIGHT, ColorEnum.BLACK);
  list[0][2].piece = new PieceModel(PiecesEnum.BISHOP, ColorEnum.BLACK);
  list[0][3].piece = new PieceModel(PiecesEnum.QUEEN, ColorEnum.BLACK);
  list[0][4].piece = new PieceModel(PiecesEnum.KING, ColorEnum.BLACK);
  list[0][5].piece = new PieceModel(PiecesEnum.BISHOP, ColorEnum.BLACK);
  list[0][6].piece = new PieceModel(PiecesEnum.KNIGHT, ColorEnum.BLACK);
  list[0][7].piece = new PieceModel(PiecesEnum.ROOK, ColorEnum.BLACK);

  list[1][0].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][1].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][2].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][3].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][4].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][5].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][6].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);
  list[1][7].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.BLACK);

  list[6][0].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][1].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][2].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][3].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][4].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][5].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][6].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);
  list[6][7].piece = new PieceModel(PiecesEnum.PAWN, ColorEnum.WHITE);

  list[7][0].piece = new PieceModel(PiecesEnum.ROOK, ColorEnum.WHITE);
  list[7][1].piece = new PieceModel(PiecesEnum.KNIGHT, ColorEnum.WHITE);
  list[7][2].piece = new PieceModel(PiecesEnum.BISHOP, ColorEnum.WHITE);
  list[7][3].piece = new PieceModel(PiecesEnum.QUEEN, ColorEnum.WHITE);
  list[7][4].piece = new PieceModel(PiecesEnum.KING, ColorEnum.WHITE);
  list[7][5].piece = new PieceModel(PiecesEnum.BISHOP, ColorEnum.WHITE);
  list[7][6].piece = new PieceModel(PiecesEnum.KNIGHT, ColorEnum.WHITE);
  list[7][7].piece = new PieceModel(PiecesEnum.ROOK, ColorEnum.WHITE);


  return list;
}