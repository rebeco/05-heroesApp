import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      // Editar
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((nuevoHeroe) => console.log(nuevoHeroe));
    } else {
      // Creación
      this.heroesService
        .agregarHeroe(this.heroe)
        .subscribe((nuevoHeroe) =>
          this.router.navigate(['/heroes/editar', nuevoHeroe.id])
        );
    }
  }
}
