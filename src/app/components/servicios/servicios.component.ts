import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ServicioService } from 'src/app/shared/servicio.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicios: ServicioModel[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','service','description','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private serviciosApi: ServicioService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  onCreate(){
    this.router.navigate(['Agregar Servicio']);
  }

  onEdit(row){
    window.localStorage.removeItem("editUserID");
    window.localStorage.setItem("editUserID", String(row.servicioID));
    this.router.navigate(['editar-servicio']);
  }

  onDelete(id){
    if(confirm('¿Esta seguro que desea eliminar este servicio?')){
      return this.serviciosApi.deleteService(id).
      subscribe(res=>{
        this.toastr.warning('Servicio eliminado exitosamente','Servicio.Eliminado');
        this.loadData();
      });
    }
  }

  loadData(){
    return this.serviciosApi.getServices()
    .subscribe(res => {
    this.servicios = res;
    this.dataSource = new MatTableDataSource(this.servicios);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('this.inmuebles :', this.servicios);
    
    }, err => {
      console.log(err);
    
    });
  }
}
