import { Component, inject, Signal, signal } from '@angular/core';
import { ChessModel, PieceModel } from '../../models';
import { initChess } from '../../data/initChess';
import { ColorEnum, PiecesEnum } from '../../enum';
import { ChessService } from '../../services/chess.service';

@Component({
  selector: 'app-two-player',
  standalone: true,
  imports: [],
  templateUrl: './two-player.component.html',
  styleUrl: './two-player.component.scss'
})
export class TwoPlayerComponent {
  
  private lostPieces = signal<PieceModel[]>([]);
  public chess = signal<ChessModel[][]>([]);

  public chessService = inject(ChessService);

  public turn = signal<ColorEnum>(ColorEnum.WHITE);

  constructor(){
    this.chess.set(initChess());
  }

  public onClick = (i: number, j: number) => {
    
    const {piece, className} = this.chess()[i][j];

    if (className === 'selected'){
      this.chess.set(this.chessService.deselect({i, j, chess: this.chess()}));
    }else if (className === 'possible'){
      this.chess.set(this.chessService.movePiece({i, j, chess: this.chess()}));
      this.turn.update((turn) => (turn === ColorEnum.BLACK) ? ColorEnum.WHITE : ColorEnum.BLACK);
    } else if (piece){
      if (className === 'enemy'){
        this.lostPieces.update((value) => [...value, this.chess()[i][j].piece!])
        this.chess.set(this.chessService.movePiece({i, j, chess: this.chess()}));
        this.turn.update((turn) => (turn === ColorEnum.BLACK) ? ColorEnum.WHITE : ColorEnum.BLACK);
      }else if (piece.color === this.turn()){
        this.chess.set(this.chessService.selectPiece({i, j, chess: this.chess()}));
      }

    }

  }

  public getLostPieces = (color: string) => {
    return this.lostPieces().filter((piece) => piece.color == color).map(_=>_);
  }
}
