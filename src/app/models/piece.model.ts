import { ColorEnum, PiecesEnum } from "../enum";

export class PieceModel{
  constructor(
    public type: PiecesEnum,
    public color: ColorEnum
  ){}
}