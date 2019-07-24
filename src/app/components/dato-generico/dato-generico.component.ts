import { Component, OnInit } from '@angular/core';
import { GenericDataService } from "../../services/generic-data.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-dato-generico',
  templateUrl: './dato-generico.component.html',
  styleUrls: ['./dato-generico.component.css']
})
export class DatoGenericoComponent implements OnInit {

  constructor(public genericDataService: GenericDataService, private matDialogRef: MatDialogRef<DatoGenericoComponent>) { }


  ngOnInit() {
   
  }

  onSubmit(){
    /* console.log('object :', this.genericDataService.form.value); */
    if(this.genericDataService.form.valid){
      if(!this.genericDataService.form.get('id').value)
      {
        this.genericDataService.addGenericData(this.genericDataService.form.value)
        .subscribe(data =>{

        });
        this.genericDataService.form.reset();
        this.onClose();
      }
      else
      {
        this.genericDataService.updateGenericData(this.genericDataService.form.value)
        .subscribe(data =>{
          
        });
        this.genericDataService.form.reset();
        this.onClose();
      }
      
      
    }
  }

  onClose(){
    this.genericDataService.form.reset();
    this.genericDataService.initializeFormGroup()
    this.matDialogRef.close();
  }
}
