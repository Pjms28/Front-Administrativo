import { Component, OnInit, ViewChild } from '@angular/core';
import { CaracteristicaService } from 'src/app/shared/caracteristica.service';
import { CaracteristicaModel } from 'src/app/modelos/caracteristicas.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {
  caracteristicas: CaracteristicaModel[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','characteristic','description','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private caracteristicasApi: CaracteristicaService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  onCreate(){
    this.router.navigate(['Agregar Caracteristica']);
  }

  onEdit(row){
    window.localStorage.removeItem("editUserID");
    window.localStorage.setItem("editUserID", String(row.caracteristicaID));
    this.router.navigate(['editar-caracteristica']);
  }
  
  onDelete(id){
    if(confirm('¿Esta seguro que desea eliminar esta caracteristica?')){
      return this.caracteristicasApi.deleteCaracteristica(id).
      subscribe(res=>{
        this.toastr.warning('Caracteristica eliminado exitosamente','Caracteristica.Eliminada');
        this.loadData();
      });
    }
  }
  loadData(){
    return this.caracteristicasApi.getCaracteristicas()
        .subscribe(res =>{
          this.caracteristicas = res;
          this.dataSource = new MatTableDataSource(this.caracteristicas);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log('this.inmuebles :', this.caracteristicas);
        }, err =>{
          console.log(err);
        });
  }

}
