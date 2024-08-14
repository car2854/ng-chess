import { Injectable, signal } from '@angular/core';
import { ChessModel } from '../models';
import { ColorEnum, PiecesEnum } from '../enum';
import { GameConfig } from '../config';

interface ChessInterface{
  i: number,
  j: number,
  chess: ChessModel[][]
}

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  private selectedPiecesPosition: number[] = [7,7];

  constructor() { }

  public selectPiece = ( {i, j, chess}: ChessInterface ) => {
    this.selectedPiecesPosition = [i,j];
    this.clearClassName(chess);
    chess[i][j].className = 'selected';
    this.possibleMoves(chess);
    return chess;
  }

  public deselect = ({i, j, chess}: ChessInterface) => {
    this.selectedPiecesPosition = [];
    this.clearClassName(chess);
    return chess;
  }

  public movePiece = ({chess, i, j}: ChessInterface) => {
    chess[i][j].piece = chess[this.selectedPiecesPosition[0]][this.selectedPiecesPosition[1]].piece;
    chess[this.selectedPiecesPosition[0]][this.selectedPiecesPosition[1]].piece = null;
    this.clearClassName(chess);
    return chess;
  }

  private clearClassName = (chess: ChessModel[][]) => {
    for (let i = 0; i < GameConfig.boardSize; i++) {
      for (let j = 0; j < GameConfig.boardSize; j++) {
        chess[i][j].className = '';
      }
    }
  }

  private possibleMoves = (chess: ChessModel[][]) => {

    const i = this.selectedPiecesPosition[0];
    const j = this.selectedPiecesPosition[1];

    const {type, color} = chess[i][j].piece!;
    
    switch (type) {
      case PiecesEnum.BISHOP:
        this.recursive(chess, i+1, j+1, +1, +1);
        this.recursive(chess, i+1, j-1, +1, -1);
        this.recursive(chess, i-1, j-1, -1, -1);
        this.recursive(chess, i-1, j+1, -1, +1);
        break;
    
      case PiecesEnum.KING:
        
        this.recursive(chess, i+1, j  , +1,  0, 1);
        this.recursive(chess, i-1, j  , -1,  0, 1);
        this.recursive(chess, i  , j-1,  0, -1, 1);
        this.recursive(chess, i  , j+1,  0, +1, 1);
        this.recursive(chess, i+1, j+1, +1, +1, 1);
        this.recursive(chess, i+1, j-1, +1, -1, 1);
        this.recursive(chess, i-1, j-1, -1, -1, 1);
        this.recursive(chess, i-1, j+1, -1, +1, 1);

        break;
    
      case PiecesEnum.KNIGHT:
        
        this.knightPosition(chess, i, j);

        break;
    
      case PiecesEnum.PAWN:
        
        this.pawnPosition(chess, i, j);

        break;
    
      case PiecesEnum.QUEEN:
        this.recursive(chess, i+1, j  , +1,  0);
        this.recursive(chess, i-1, j  , -1,  0);
        this.recursive(chess, i  , j-1,  0, -1);
        this.recursive(chess, i  , j+1,  0, +1);
        this.recursive(chess, i+1, j+1, +1, +1);
        this.recursive(chess, i+1, j-1, +1, -1);
        this.recursive(chess, i-1, j-1, -1, -1);
        this.recursive(chess, i-1, j+1, -1, +1);
        break;
    
      case PiecesEnum.ROOK:
        this.recursive(chess, i+1, j  , +1,  0);
        this.recursive(chess, i-1, j  , -1,  0);
        this.recursive(chess, i  , j-1,  0, -1);
        this.recursive(chess, i  , j+1,  0, +1);
        break;
    
      default:
        break;
    }

  }

  private pawnPosition = (chess: ChessModel[][], i: number, j: number) => {

    const {piece} = chess[i][j];
    
    if (piece?.color === ColorEnum.BLACK){

      if (i < GameConfig.boardSize-1){ // Mientras la posicion de la ficha sobrepase afuera del rango

        if (i === 1){
          if (!chess[i+1][j].piece){
            if (!chess[i+2][j].piece){
              chess[i+2][j].className = 'possible';  
            }
            chess[i+1][j].className = 'possible';  
          }
        }else{
          if (!chess[i+1][j].piece){
            chess[i+1][j].className = 'possible';  
          }
        }
  
        if (j > 0 && j < GameConfig.boardSize-1){
          if (chess[i+1][j+1].piece && chess[i+1][j+1].piece!.color != chess[i][j].piece!.color){
            chess[i+1][j+1].className = 'enemy';
          }
          if (chess[i+1][j-1].piece && chess[i+1][j-1].piece!.color != chess[i][j].piece!.color){
            chess[i+1][j-1].className = 'enemy';
          }
        } else if (j === 0){
          if (chess[i+1][j+1].piece && chess[i+1][j+1].piece!.color != chess[i][j].piece!.color){
            chess[i+1][j+1].className = 'enemy';
          }
        } else if(j === GameConfig.boardSize-1){
          if (chess[i+1][j-1].piece && chess[i+1][j-1].piece!.color != chess[i][j].piece!.color){
            chess[i+1][j-1].className = 'enemy';
          }
        }

      }

    }else{

      if (i > 0){  // Mientras la posicion de la ficha sobrepase afuera del rango
        if (i === 6){
          if (!chess[i-1][j].piece){
            if (!chess[i-2][j].piece){
              chess[i-2][j].className = 'possible';  
            }
            chess[i-1][j].className = 'possible';  
          }
          
        }else{
          if (!chess[i-1][j].piece){
            chess[i-1][j].className = 'possible';  
          }
        }

        if (j > 0 && j < GameConfig.boardSize-1){
          if (chess[i-1][j+1].piece && chess[i-1][j+1].piece!.color != chess[i][j].piece!.color){
            chess[i-1][j+1].className = 'enemy';
          }
          if (chess[i-1][j-1].piece && chess[i-1][j-1].piece!.color != chess[i][j].piece!.color){
            chess[i-1][j-1].className = 'enemy';
          }
        } else if (j === 0){
          if (chess[i-1][j+1].piece && chess[i-1][j+1].piece!.color != chess[i][j].piece!.color){
            chess[i-1][j+1].className = 'enemy';
          }
        } else if(j === GameConfig.boardSize-1){
          if (chess[i-1][j-1].piece && chess[i-1][j-1].piece!.color != chess[i][j].piece!.color){
            chess[i-1][j-1].className = 'enemy';
          }
        }
      }

    }

  }

  private knightPosition = (chess: ChessModel[][], i: number, j: number, ) => {

    if (i+2 < GameConfig.boardSize && j+1 < GameConfig.boardSize){
      if (chess[i+2][j+1].piece && chess[i][j].piece!.color != chess[i+2][j+1].piece!.color ){
        chess[i+2][j+1].className = 'enemy';
      }else if (!chess[i+2][j+1].piece){
        chess[i+2][j+1].className = 'possible';
      }
    } 
    if (i+1 < GameConfig.boardSize && j+2 < GameConfig.boardSize){
      if (chess[i+1][j+2].piece && chess[i][j].piece!.color != chess[i+1][j+2].piece!.color ){
        chess[i+1][j+2].className = 'enemy';
      }else if (!chess[i+1][j+2].piece){
        chess[i+1][j+2].className = 'possible';
      }
    } 
    if (i-1 >= 0 && j+2 < GameConfig.boardSize){
      if (chess[i-1][j+2].piece && chess[i][j].piece!.color != chess[i-1][j+2].piece!.color ){
        chess[i-1][j+2].className = 'enemy';
      }else if (!chess[i-1][j+2].piece){
        chess[i-1][j+2].className = 'possible';
      }
    } 
    if (i-2 >= 0 && j+1 < GameConfig.boardSize){
      if (chess[i-2][j+1].piece && chess[i][j].piece!.color != chess[i-2][j+1].piece!.color ){
        chess[i-2][j+1].className = 'enemy';
      }else if (!chess[i-2][j+1].piece){
        chess[i-2][j+1].className = 'possible';
      }
    } 
    if (i-2 >= 0 && j-1 >= 0){
      if (chess[i-2][j-1].piece && chess[i][j].piece!.color != chess[i-2][j-1].piece!.color ){
        chess[i-2][j-1].className = 'enemy';
      }else if (!chess[i-2][j-1].piece){
        chess[i-2][j-1].className = 'possible';
      }
    } 
    if (i-1 >= 0 && j-2 >= 0){
      if (chess[i-1][j-2].piece && chess[i][j].piece!.color != chess[i-1][j-2].piece!.color ){
        chess[i-1][j-2].className = 'enemy';
      }else if (!chess[i-1][j-2].piece){
        chess[i-1][j-2].className = 'possible';
      }
    } 
    if (i+1 < GameConfig.boardSize && j-2 >= 0){
      if (chess[i+1][j-2].piece && chess[i][j].piece!.color != chess[i+1][j-2].piece!.color ){
        chess[i+1][j-2].className = 'enemy';
      }else if (!chess[i+1][j-2].piece){
        chess[i+1][j-2].className = 'possible';
      }
    } 
    if (i+2 < GameConfig.boardSize && j-1 >= 0){
      if (chess[i+2][j-1].piece && chess[i][j].piece!.color != chess[i+2][j-1].piece!.color ){
        chess[i+2][j-1].className = 'enemy';
      }else if (!chess[i+2][j-1].piece){
        chess[i+2][j-1].className = 'possible';
      }
    } 

  }

  private recursive = (chess: ChessModel[][], i: number, j: number, iAdd: number, jAdd: number, limit = 8) => {

    if (limit===0){
      return;
    }else if (!(i>=0 && i<GameConfig.boardSize) || !(j>=0 && j<GameConfig.boardSize)){      
      return;
    }else if (chess[i][j].piece){
      if (chess[this.selectedPiecesPosition[0]][this.selectedPiecesPosition[1]].piece?.color != chess[i][j].piece?.color){
        chess[i][j].className = 'enemy';
      }
      return;
    }else{
      
      this.recursive(chess, i+iAdd, j+jAdd, iAdd, jAdd, limit-1);
      chess[i][j].className = 'possible';
      return;
    }

  }

}
