import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent {
  forma: any;
  usuario: Object = {
    nombreCompleto: {
      nombre: 'Albert',
      apellido: 'Santiago',
    },
    email: 'aj.santiago.00@gmail.com',
    pasatiempos: ['Correr', 'Dormir', 'Comer'],
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        apellido: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      pasatiempos: new FormArray([new FormControl('', Validators.required)]),
      username: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.existeUsuario],
      }),
      password1: new FormControl('', Validators.required),
      password2: new FormControl(),
    });
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma),
    ]);

    // this.forma.setValue(this.usuario);

    this.forma.controls['username'].valueChanges.subscribe((data: any) => {
      console.log(data);
    });
    this.forma.controls['username'].statusChanges.subscribe((data: any) => {
      console.log(data);
    });
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;

    if (control.value !== forma.controls['password1'].value) {
      return { noiguales: true };
    }
    return {};
  }

  // existeUsuario(control: FormControl): Promise<any> | Observable<any> {
  //   let promesa = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'strider') {
  //         resolve({ existe: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 3000);
  //   });
  //   return promesa;
  // }
  //Faltó comparar el input con la cadena 'strider' y que indique que ya existe el usuario
  existeUsuario(control: AbstractControl): Observable<any> {
    return of(control.value).pipe(
      map((control) => {
        control ? { existe: true } : null;
      })
    );
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  guardarCambios() {
    console.log(this.forma);
    console.log(this.forma.value);

    this.forma.reset({
      nombreCompleto: {
        nombre: '',
        apellido: '',
      },
      email: '',
    });
  }
}
