import { Pipe, PipeTransform } from '@angular/core';
import { ColorEnum } from '../enum';

@Pipe({
  name: 'piece',
  standalone: true
})
export class PiecePipe implements PipeTransform {
  transform(value: ColorEnum): String {
    switch (value){
      case ColorEnum.BLACK:
        return 'Negras'
      case ColorEnum.WHITE:
        return 'Blancas'
    }
  }
}
