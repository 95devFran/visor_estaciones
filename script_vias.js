const map = L.map('map', {
  center: [40.416407, -3.685728],
  zoom: 10,
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'topleft'
  }
});

function toggleFullscreen() {
  map.toggleFullscreen();
}

/*----------------------------------------
        MAPAS BASE CON ESTILOS MODERNOS
----------------------------------------*/                     

// Mapa oscuro tipo cibernético
const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
}).addTo(map);

const pnoaLayer = L.tileLayer('https://tms-pnoa-ma.idee.es/1.0.0/pnoa-ma/{z}/{x}/{-y}.jpeg', {
  maxZoom: 40,
  attribution: 'CC BY 4.0 scne.es'
});

// OSM
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 40,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Capa de Catastro
const catastroLayer = L.tileLayer.wms("http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?", {
  layers: 'Catastro',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: "DIRECCION GENERAL DEL CATASTRO",
  maxZoom: 40
});

// Estilos tecnológicos
const estiloEstaciones = {
  radius: 8,
  fillColor: "#0ff",
  color: "#0ff",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.8
};

const estiloVias = {
  color: "#ff0", // Amarillo neón
  weight: 3,
  opacity: 0.9
};

// Popups mejorados
const onEachEstacion = (feature, layer) => {
  const popupContent = `<b>${feature.properties.nombre}</b><br>
                        <b>Situación: </b>${feature.properties.situaciond}`;
  layer.bindPopup(popupContent);
};

const onEachVia = (feature, layer) => {
  const popupContent = `<b>${feature.properties.nombre}</b><br>
                        <b>Uso Predominante: </b>${feature.properties.uso_ppald}`;
  layer.bindPopup(popupContent);
};

// Capas de estaciones y vías con estilos aplicados
const vias_tren = L.geoJson(vias_madrid, {
  style: estiloVias,
  onEachFeature: onEachVia
}).addTo(map);

const estaciones = L.geoJson(estaciones_madrid, {
  pointToLayer: (feature, latlng) => L.circleMarker(latlng, estiloEstaciones),
  onEachFeature: onEachEstacion
}).addTo(map);

// Control de capas con opciones más modernas
const baseMaps = {
  "Fondo Oscuro": darkLayer,
  "Imagen satélite PNOA": pnoaLayer,
  "Open Street Map": osmLayer
};

const overlayMaps = {
  "Estaciones": estaciones,
  "Vías de Tren": vias_tren,
  "Catastro": catastroLayer
};

// Agregar control de capas
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false,
  position: "topright"
}).addTo(map);

/*------------------------------------------------------------
                    MEDIR DISTANCIAS
-------------------------------------------------------------*/
var measureAction = new L.MeasureAction(map, {
model: "distance",
});

L.control.measure({
  position: 'bottomleft'
}).addTo(map);



