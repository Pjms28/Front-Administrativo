import { Component, EventEmitter,Output, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
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
  @Output() Notify = new EventEmitter<any>();

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  notify() {
    
  }
  clearPlace(){
    this.searchControl.reset();
  }
  ngOnInit() {
    this.zoom = 8;
    this.latitude =  18.501193;
    this.longitude = -69.924145

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
