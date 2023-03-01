import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0ZW91MTI5NyIsImEiOiJjbDVraXBwdnAwOG9hM3FvNXBvejRiOGRrIn0.hItQX3dADSIOor8lYVn0OQ';

if (!navigator.geolocation) {
  throw new Error('Navegador no soporta la Geolocalización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
