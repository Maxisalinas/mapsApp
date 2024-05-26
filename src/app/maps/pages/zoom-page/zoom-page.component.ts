import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, LngLat } from 'mapbox-gl';


@Component({
  selector: 'zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {

  public zoom: number = 10;
  public map?: Map;
  public currentCenter = new LngLat(-74.5, 40);

  @ViewChild('map') divMapRef?: ElementRef;

  ngAfterViewInit(): void {
      this.map = new Map({
        container: this.divMapRef?.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.currentCenter, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });

    this.mapListeners();

  }

  ngOnDestroy(): void {
      this.map!.remove()
  }

  mapListeners() {
      if(!this.map) throw 'Mapa no inicializado';

      this.map.on('zoom', (ev) => {
          this.zoom = this.map!.getZoom();
      });

      this.map.on('zoomend', (ev) => {
         if( this.map!.getZoom() > 18 ) {
              this.map!.zoomTo(18);
        };
      })
      this.map.on('moveend', () => {  
          this.currentCenter = this.map!.getCenter();
          const { lng, lat } = this.currentCenter;
      })

    
  }

  zoomIn() {
    this.map?.zoomIn()
    
  };

  zoomOut() {
    this.map?.zoomOut()
  };

  zoomInputChanged( inputValue: string ) {

    this.zoom = Number(inputValue);
    this.map!.zoomTo( this.zoom );
 

    // const zoomValue = parseInt( inputValue );
    // this.map!.zoomTo( zoomValue );


  }






}
