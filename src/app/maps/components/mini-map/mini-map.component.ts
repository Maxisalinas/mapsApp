import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
    selector: 'map-mini-map',
    templateUrl: './mini-map.component.html',
    styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {

    @Input()
    public lngLat?: [number, number];


    @ViewChild('map') divMapRef?: ElementRef;

    ngAfterViewInit(): void {
        if (!this.divMapRef) throw 'No funciona el <div> del mapa'
        if (!this.lngLat) throw 'lngLat no puede ser null'

        const map = new Map({
            container: this.divMapRef?.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: this.lngLat,
            zoom: 14, // starting zoom
            interactive: false,
        });

        const marker = new Marker({ color:'rgb(220, 35, 35)'}).setLngLat(this.lngLat).addTo(map);

       

    }


}




