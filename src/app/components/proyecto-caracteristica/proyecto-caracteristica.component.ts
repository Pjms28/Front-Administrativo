import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaracteristicaService } from 'src/app/shared/caracteristica.service';
import { CaracteristicaModel } from 'src/app/modelos/caracteristicas.model';
import { CaracteristicaProyectoModel } from 'src/app/modelos/caracteristicaproyecto.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proyecto-caracteristica',
  templateUrl: './proyecto-caracteristica.component.html',
  styleUrls: ['./proyecto-caracteristica.component.css']
})
export class ProyectoCaracteristicaComponent implements OnInit {

  ID: any;
  checkboxD:any [] = [];
  checkboxA:any [] = [];
  checkboxS: any [] = [];
  checkboxDG: any [] = [];
  checkboxDA: any [] = [];
  checkboxO: any [] = [];
  caracteristicasD: CaracteristicaModel [] = [];
  caracteristicasA: CaracteristicaModel [] = [];
  caracteristicasS: CaracteristicaModel [] = [];
  caracteristicasDG: CaracteristicaModel [] = [];
  caracteristicasDA: CaracteristicaModel [] = [];
  caracteristicaO: CaracteristicaModel [] = [];
  exist: boolean = true;
  caracteristicaproyecto: CaracteristicaProyectoModel [] = [];
  addForm: FormGroup;
  constructor(private actvRoute: ActivatedRoute, private carApi: CaracteristicaService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    this.carApi.getCaracteristicasP().subscribe(res => {
      this.caracteristicasD = res.distribucion;
      this.caracteristicasA = res.amenidades;
      this.caracteristicasS = res.seguridad;
      this.caracteristicasDG = res.descripcionG;
      this.caracteristicasDA = res.descripcionA;
      this.caracteristicaO = res.otros;
    })

    this.carApi.getCaracteristicasProyecto(this.ID).subscribe(res => {
      
      if(res.distribucion != ""){
        this.checkInitial(res.distribucion, this.checkboxD, this.caracteristicasD);
      }
      else{
        this.caracteristicasD.forEach(element => {
          var obj: Object ={
            caracteristicaID: element.caracteristicaID,
            carNombre: element.carNombre,
            tipoCarProyecto: element.tipoCarProyecto,
            selected: false
          }
  
          this.checkboxD.push(obj);
        });
      }
      if(res.amenidades != ""){
        this.checkInitial(res.distribucion, this.checkboxA, this.caracteristicasA);
      }
      else{
        this.caracteristicasA.forEach(element => {
          var obj: Object ={
            caracteristicaID: element.caracteristicaID,
            carNombre: element.carNombre,
            tipoCarProyecto: element.tipoCarProyecto,
            selected: false
          }
  
          this.checkboxA.push(obj);
        });
      }
      
      if(res.seguridad != ""){
        this.checkInitial(res.seguridad, this.checkboxS,this.caracteristicasS);
      }
      else{
        this.caracteristicasS.forEach(element => {
          var obj: Object ={
            caracteristicaID: element.caracteristicaID,
            carNombre: element.carNombre,
            tipoCarProyecto: element.tipoCarProyecto,
            selected: false
          }
  
          this.checkboxS.push(obj);
        });
      }
      if(res.descripcionG != ""){
        this.checkInitial(res.descripcionG, this.checkboxDG, this.caracteristicasDG);
      }
      else{
        this.caracteristicasDG.forEach(element => {
          var obj: Object ={
            caracteristicaID: element.caracteristicaID,
            carNombre: element.carNombre,
            tipoCarProyecto: element.tipoCarProyecto,
            selected: false
          }
  
          this.checkboxDG.push(obj);
        });
      }
      if(res.descripcionA != ""){
        this.checkInitial(res.descripcionA, this.checkboxDA, this.caracteristicasDA);
      }
      else{
        this.caracteristicasDA.forEach(element => {
          var obj: Object ={
            caracteristicaID: element.caracteristicaID,
            carNombre: element.carNombre,
            tipoCarProyecto: element.tipoCarProyecto,
            selected: false
          }
  
          this.checkboxDA.push(obj);
        });
      }
      if(res.otros != ""){
        this.checkInitial(res.otros, this.checkboxO, this.caracteristicaO);
      }
      else{
        this.caracteristicaO.forEach(element => {
          var obj: Object ={
            caracteristicaID: element.caracteristicaID,
            carNombre: element.carNombre,
            tipoCarProyecto: element.tipoCarProyecto,
            selected: false
          }
  
          this.checkboxO.push(obj);
        });
      }
      /*if(res.length > 0){
        this.exist = true;
        this.caraceristicas = res;
        this.checkInitial();
      }
      else{
        this.carApi.getCaracteristicasP().subscribe(res => {
          res.forEach(element => {
            var obj: Object ={
              caracteristicaID: element.caracteristicaID,
              carNombre: element.carNombre,
              selected: false
            }
    
            this.checkbox.push(obj);
          });
        })
    }*/
    })
  }

  onSubmit(){
    this.getSelected();
    if(this.caracteristicaproyecto.length > 0){
      if(this.exist == true){
        this.carApi.deleteCaracteristicaProyecto(this.ID).subscribe(res=>{
        });
      }
        this.caracteristicaproyecto.forEach(element => {
        this.carApi.addCaracteristicaProyecto(element).subscribe(res => {
        })
        this.router.navigate(['listar-contenido']);  
        });
          this.toastr.success('Caracteristicas registradas exitosamente');
        }
        else{
          this.toastr.error('Seleccione por lo menos 1 caracteristica','Caracteristica.Error');
        }

  }



  checkInitial(tipoCar: CaracteristicaModel[], checkbox: any[], caraceristicas: CaracteristicaModel[]){
    
        var exist = false;
          caraceristicas.forEach(element => {
            tipoCar.forEach(element2 => {
              if(element.caracteristicaID == element2.caracteristicaID){
  
               exist = true;
              }
          });
  
            if(exist == true){
              var obj: Object ={
                caracteristicaID: element.caracteristicaID,
                carNombre: element.carNombre,
                tipoCarProyecto: element.tipoCarProyecto,
                selected: true
              }
      
              checkbox.push(obj);
            }
            else{
              var obj: Object ={
                caracteristicaID: element.caracteristicaID,
                carNombre: element.carNombre,
                tipoCarProyecto: element.tipoCarProyecto,
                selected: false
              }
      
              checkbox.push(obj);
            }
            exist = false;
        });
      
  }

  public getSelected() {

    let distribucion = this.checkboxD.filter((c) => { return c.selected })
    .map((c) => { return c.caracteristicaID });
    this.enhance(distribucion);

    let amenidades = this.checkboxA.filter((c) => {return c.selected})
    .map((c) => {return c.caracteristicaID});

    let seguridad = this.checkboxS.filter((c) => {return c.selected})
    .map((c) => {return c.caracteristicaID});

    let descripcionG =  this.checkboxDG.filter((c) => {return c.selected})
    .map((c) => {return c.caracteristicaID});

    let descripcionA = this.checkboxDA.filter((c) => {return c.selected})
    .map((c) => {return c.caracteristicaID});

    let otros =  this.checkboxO.filter((c) => {return c.selected})
    .map((c) => {return c.caracteristicaID});
    
    if(distribucion.length > 0){
      this.enhance(distribucion);
    }
    if(amenidades.length > 0){
      this.enhance(amenidades);
    }
    if(seguridad.length > 0){
      this.enhance(seguridad);
    }
    if(descripcionG.length > 0){
      this.enhance(descripcionG)
    }
    if(descripcionA.length > 0){
      this.enhance(descripcionA)
    }
    if(otros.length > 0){
      this.enhance(otros)
    }
}

public enhance(result: any[]){
  result.forEach(element => {
    let obj: CaracteristicaProyectoModel = {
      caracteristicaID: element,
      proyectoID: this.ID
    }
    this.caracteristicaproyecto.push(obj);
  });
}
}
