import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ApiService } from 'src/app/shared/api.service';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: ProyectoComponent[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','project','enddate','address','image','caractherictis','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey:string;
  constructor(private apiServiceProyects: ApiService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }
  onCreate(){
    this.router.navigate(['Agregar Proyecto']);
  }

  onDelete(id){
    if(confirm('¿Esta seguro que desea eliminar este proyecto?, tambien se borraran los inmuebles y caracteristicas existentes asignados a este proyecto.')){
      return this.apiServiceProyects.deleteProject(id).
      subscribe(res=>{
        this.toastr.warning('Proyecto eliminado exitosamente','Proyecto.Eliminado');
        this.loadData();
      });
    }
  }
  onEdit(row){
    let id = row.proyectoID;
    window.localStorage.removeItem("editUserID");
    window.localStorage.setItem("editUserID", String(id));
    this.router.navigate(['editar-proyecto']);
  }

  loadData(){
    this.apiServiceProyects.getProjects().subscribe(res =>{
      this.proyectos = res;
      this.dataSource = new MatTableDataSource(this.proyectos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    }, err =>{
      console.log(err);
    });
  }
}
