import { PieceModel } from "./piece.model";

export class ChessModel{
  constructor(
    public id: string,
    public piece: PieceModel | null,
    public className: string | null
  ){}
}