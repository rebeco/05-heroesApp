import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
  pure: false,
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe, ...args: unknown[]): string {
    let urlImagen = 'assets/no-image.png';

    if (heroe.id) urlImagen = `assets/heroes/${heroe.id}.jpg`;
    else if (heroe.alt_img) urlImagen = heroe.alt_img;

    return urlImagen;
  }
}
