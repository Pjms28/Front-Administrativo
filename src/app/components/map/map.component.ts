import { Component, EventEmitter,Output, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import {} from "googlemaps";
import { MapsAPILoader } from '@agm/core'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;


  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;

  @Output() Notify = new EventEmitter;
  @Input() Lat: number;
  @Input() Long: number;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

 
  clearPlace(){
    this.searchControl.reset();
  }

  pasarInfo(evento){
    console.log('desde el componente hijo: ',this.latitude);

    this.Notify.emit({latitude : this.latitude, longitude : this.longitude});
  }

  ngOnInit() {
    this.zoom = 8;

    this.searchControl = new FormControl();
    this.setCurrentPosition();


   

    this.mapsAPILoader.load().then(() => {
      const autoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types : [],
        componentRestrictions : {'country' : 'DO'}
      });

      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autoComplete.getPlace();
          if(place.geometry == undefined || place.geometry == null){
            return;
          }
        
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          const latlong = {
            latitude : this.latitude,
            longitude : this.longitude
          };
          
          this.Notify.emit(latlong);

        });
      });
    });
  }

  ngOnChanges(){
    this.latitude = parseFloat(localStorage.getItem('latitude'));
    this.longitude = parseFloat(localStorage.getItem('longitude'));
    //console.log('latitude :', localStorage.getItem('latitude'));
    //console.log('longitude :', localStorage.getItem('longitude'));
  }
  
  private setCurrentPosition(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }

}
