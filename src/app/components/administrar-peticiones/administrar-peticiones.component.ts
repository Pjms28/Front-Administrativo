import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { PeticionService } from 'src/app/shared/peticion.service';
import { PeticionModel } from 'src/app/modelos/peticion.model';

@Component({
  selector: 'app-administrar-peticiones',
  templateUrl: './administrar-peticiones.component.html',
  styleUrls: ['./administrar-peticiones.component.css']
})
export class AdministrarPeticionesComponent implements OnInit {

  data: PeticionModel [] = [];
  data1: PeticionModel [] = [];

  constructor(private router: Router, private actvRouter: ActivatedRoute, private ptcApi: PeticionService) { }

  ngOnInit() {
    this.ptcApi.getPeticionesP().subscribe(res => {
      this.data = res;
    })

    this.ptcApi.getPeticionesA().subscribe(res =>{
      this.data1 = res;
    })
  }

}
