import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TasacionModel } from 'src/app/modelos/tasacion.model';
import { TasacionService } from 'src/app/shared/tasacion.service';
import { PdfComponent } from '../pdf/pdf.component';

@Component({
  selector: 'app-tasaciones',
  templateUrl: './tasaciones.component.html',
  styleUrls: ['./tasaciones.component.css']
})
export class TasacionesComponent implements OnInit {

  tasacion: TasacionModel[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','nombreCliente','fecha','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey:string;

  constructor(private router: Router, private toastr: ToastrService, private tscApi: TasacionService, private pdf: PdfComponent) { }

  ngOnInit() {
    this.loadData();
  }

  onCreate(){
    this.router.navigate(['agregar-tasacion']);
  }

  onDelete(id){
    if(confirm('¿Esta seguro que desea eliminar esta tasación?')){
      return this.tscApi.deleteTasacion(id).
      subscribe(res=>{
        this.toastr.warning('Tasación eliminada exitosamente','Tasación.Eliminado');
        this.loadData();
      });
    }
  }

  loadData(){
    this.tscApi.getTasacions().subscribe(res =>{
      this.tasacion = res;
      this.dataSource = new MatTableDataSource(this.tasacion);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    }, err =>{
      console.log(err);
    });
  }

}
