import { Component, OnInit, ViewChild } from '@angular/core';
import { TemaForo } from 'src/app/modelos/TemaForo.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TemasforosService } from 'src/app/services/temasforos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-temasforos',
  templateUrl: './temasforos.component.html',
  styleUrls: ['./temasforos.component.css']
})
export class TemasforosComponent implements OnInit {
  temas: TemaForo[];
  dataTable: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','name','description','actions'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private temaForoApi: TemasforosService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();
  }

  onCreate(){
    this.router.navigate(['Categorias Foro'])
  }
  onEdit(row){
    this.router.navigate(['editar-categoria/'+row.temaID]);
  }

  onDelete(id){
    if(confirm('¿Esta seguro que desea eliminar este servicio?')){
      return this.temaForoApi.deleteTemaForo(id).
      subscribe(res=>{
        this.toastr.warning('Tema de foro eliminado exitosamente','Servicio.Eliminado');
        this.loadData();
      });
    }
  }

  loadData() {
    return this.temaForoApi.getTemasForos()
    .subscribe(res => {
    this.temas = res;
    this.dataSource = new MatTableDataSource(this.temas);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('this.temas :', this.temas);
    
    }, err => {
      console.log(err);
    
    });
  }

}
