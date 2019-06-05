import { Component, OnInit, ViewChild } from '@angular/core';
import { InmuebleService } from 'src/app/shared/inmueble.service';
import { InmuebleModel } from 'src/app/modelos/inmueble.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  inmuebles: InmuebleModel[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','property','price','description','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey:string;

  constructor(private inmueblesApiService: InmuebleService, private router: Router,  private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  onCreate(){
    this.router.navigate(['Agregar Inmueble'])
    
  }

  onEdit(row){
    window.localStorage.removeItem("editUserID");
    window.localStorage.setItem("editUserID", String(row.inmuebleID));
    this.router.navigate(['editar-inmueble']);
  }

  onDelete(id){
    if(confirm('¿Esta seguro que desea eliminar este inmueble?')){
      return this.inmueblesApiService.deleteInmueble(id).
      subscribe(res=>{
        this.toastr.warning('Inmueble eliminado exitosamente','Inmueble.Eliminado');
        this.loadData();
      });
    }
  }

  loadData(){
    return this.inmueblesApiService.getInmuebles()
    .subscribe(res =>{
      this.inmuebles = res;
      this.dataSource = new MatTableDataSource(this.inmuebles);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log('this.inmuebles :', this.inmuebles);

    }, err =>{
      console.log(err);
    });
  }
}
