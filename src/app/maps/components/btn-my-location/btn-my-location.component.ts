import { Component } from '@angular/core';
import { MapService } from '../../services';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent {

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) { }

  goToMyLocation(): void {

    if(!this.mapService.isMapReady) throw Error('No hay mapa disponible');
    if(!this.placesService.isUserLocationReady) throw Error('No hay ubicación de usuario');

    this.mapService.flyTo(this.placesService.useLocation!);
  }

}
