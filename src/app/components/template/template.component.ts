import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  // styles: [
  //   `
  //     .ng-invalid.ng-touched:not(form) {
  //       border: 1px solid red;
  //     }
  //   `,
  // ],
})
export class TemplateComponent {
  usuario: any = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: 'Hombre',
    acepta: false,
  };

  paises = [
    {
      codigo: 'MX',
      nombre: 'México',
    },
    {
      codigo: 'ESP',
      nombre: 'España',
    },
  ];
  sexos: string[] = ['Hombre', 'Mujer', 'Sin definir'];

  constructor() {}

  guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('NgForm', forma);
    console.log('Valor', forma.value);
  }
}
