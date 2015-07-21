//declare boundary of region
var oLat = 39.5675, oLng = -75.5651, zLevel = 10;             //adjust lat-lon coordinates to center on your region


//declare basemaps
// Basemap Layers
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_transportation = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
        minZoom: 8,
        maxZoom: 18
});

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});


//create map instance
var map = L.map("mapDIV", {
    minZoom: 1,
    zoomControl: false,
    layers: [Esri_WorldGrayCanvas]
}).setView([oLat, oLng],zLevel);

//add Layer Control to map
var baseLayers = {
    "Satellite": Esri_WorldImagery,      
    "Street Map": Esri_WorldGrayCanvas
};
L.control.layers(baseLayers).addTo(map);

//advanced handling of street labels on aerial
//Base and Overlay Handling
var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
function addStreetLabels(){ 
    var topLayer = (Esri_transportation).addTo(map);
    topPane.appendChild(topLayer.getContainer());
    topLayer.setZIndex(2);
};
map.on('moveend', function () {
    if (map.getZoom() > 13 && map.hasLayer(Esri_WorldImagery)){
        addStreetLabels();
               
    };
    if (map.getZoom() <= 13 ){
        map.removeLayer(Esri_transportation);        
    };
}); 
map.on('baselayerchange', function () {
    if (map.getZoom() > 13 && map.hasLayer(Acetate_all)){
           map.removeLayer(Esri_transportation);       
        };
    if (map.getZoom() > 13 && map.hasLayer(Esri_WorldImagery)){
           addStreetLabels();
       };
});



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////      Declare Data Layers Here        ///////////////////
//////////////////////////////////////////////////////////////////

//define Icon Set and Marker Types 
var IconPresets = {iconSet:'dynico', markerSet: 'open-freight', mapMarker: 'circle-cm', legendMarker: 'circle-md'};
 
//declare Base Info for layers
var layer1icon = L.OpenFreightMarkers.icon({
        icon: 'rail', markerColor: 'blue', layer:'layer1', title: 'New Castle County Rail', onLoad: 'no'}, IconPresets),
    layer2icon = L.OpenFreightMarkers.icon({
        icon: 'rail', markerColor: 'blue', layer:'layer2', title: 'Freight Plan Corridors', onLoad: 'no'}, IconPresets),
    layer3icon = L.OpenFreightMarkers.icon({
        icon: 'bridge', markerColor: 'blue', layer:'layer3', title: 'Bridge/Intersection'}, IconPresets),
    layer4icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'purple', layer:'layer4', title: 'Road/Rail/Trail'}, IconPresets),
	layer5icon = L.OpenFreightMarkers.icon({
        icon: 'community', markerColor: 'teal', layer:'layer5', title: 'Area-wide Projects'}, IconPresets);

//define search groups for each layer that will be searchable
var layer1Search = [], layer2Search = [], layer3Search = [], layer4Search = [], layer5Search = [], LayerStyle = [];

//layer 1 (polygon - lines)
var layer1 = L.geoJson(null, {
    style: {weight:2, color:"#0f11ff ", opacity:.75},  
    onEachFeature: function (feature, layer){		//defines actions to be applied of each feature of layer
        layer.on({										//Event handler on each feature
            click: highlightLayer1,							//action on click --> function to be created in actions.js
            dblclick: zoomToFeature 						//action on double click  --> zoom to polygon function in action.js
        });
        layer1Search.push({							//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 1",								//layer source
            id: L.stamp(layer),								//leaflet id
            bounds: layer.getBounds()						//geometric bounds declaration for polygon
        });
    }
});
$.getJSON("data/NCCRail.json", function (data) {		//get data from json source
	layer1.addData(data);
});
polyLayer.push('layer1');

//layer 2 (polygon - lines)
var layer2 = L.geoJson(null, {
    style: {weight:2, color:"#2e5eff ", opacity:.75},  
    onEachFeature: function (feature, layer){		//defines actions to be applied of each feature of layer
        layer.on({										//Event handler on each feature
            click: highlightLayer2,							//action on click --> function to be created in actions.js
            dblclick: zoomToFeature 						//action on double click  --> zoom to polygon function in action.js
        });
        layer2Search.push({							//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 2",								//layer source
            id: L.stamp(layer),								//leaflet id
            bounds: layer.getBounds()						//geometric bounds declaration for polygon
        });
    }
});
$.getJSON("data/FreightPlanCorridors.json", function (data) {		//get data from json source
	layer2.addData(data);
});
polyLayer.push('layer2');

//layer 3 (point)
var layer3 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer3icon});	
        },
    onEachFeature: function (feature, layer){			
        layer.on({											
            click: highlightLayer3,					//click function handling specific to data type (one for point and one for polygon)	--> created in actions.js								
            dblclick: zoomToPoint								
        });
    }
});  
$.getJSON("data/2016TIPpt.json", function (data) {
	layer3.addData(data);
});

//layer 4 (poly - lines)
var layer4 = L.geoJson(null, {
    style: {weight:4, color:"#9854c9 ", opacity:.75},    
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer4,
            dblclick: zoomToFeature
        });
        layer4Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 4",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
$.getJSON("data/2016TIPpoly.json", function (data) {
    layer4.addData(data);
});
polyLayer.push('layer4')

//layer 5 (poly)
var layer5 = L.geoJson(null, {
    style: {fillColor: "#76f4f0", fillOpacity:.50, weight:3, color:"#38c7c2 ", opacity:.75},    
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer5,
            dblclick: zoomToFeature
        });
        layer5Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 5",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
$.getJSON("data/2016TIPreg.json", function (data) {
    layer5.addData(data);
});
polyLayer.push('layer5');

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//  Create search functionality using Typeahead   ////
//////////////////////////////////////////////////////
 
$("#searchbox").click(function () {
    $(this).select();
});

// Typeahead search functionality
$(document).one("ajaxStop", function() {
    $("#loading").hide();
    //tokenize each search array using Bloodhound
    var layer1BH = new Bloodhound({
        name: "Layer 1",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer1Search,
        limit: 10
    });
    var layer2BH = new Bloodhound({
        name: "Layer 2",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer2Search,
        limit: 10
    });
   var layer3BH = new Bloodhound({
        name: "Layer 3",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer3Search,
        limit: 10
    });
    var layer4BH = new Bloodhound({
        name: "Layer 4",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
	var layer5BH = new Bloodhound({
        name: "Layer 5",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer5Search,
        limit: 10
    });
   //initialize 
    layer1BH.initialize();
    layer2BH.initialize();
    layer3BH.initialize();
    layer4BH.initialize();
    layer5BH.initialize();
    //activate Typeahead on Searchbox DOM element
    $("#searchbox").typeahead({
    	//define options (see Typeahead documentation)
    	minLength: 2,
        highlight: true,
        hint: false
    },{
    	name: "Layer1data",
        displayKey: "name",
        source: layer1BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 1</h5>"
        }
    },{
    	name: "Layer2data",
        displayKey: "name",
        source: layer2BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 2</h5>"
        }
    },{
    	name: "Layer3data",
        displayKey: "name",
        source: layer3BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 3</h5>"
        }
	},{
    	name: "Layer4data",
        displayKey: "name",
        source: layer4BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 4</h5>"
        }
	},{
    	name: "Layer5data",
        displayKey: "name",
        source: layer5BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 5</h5>"
        }
    }).on("typeahead:selected", function (obj, datum) {		//define action on selection of a search result
    	if (datum.source === "Layer 1") {						//action based on result source layer
            if (!map.hasLayer(layer1)) {						//Check if map has Layer visible
                map.addLayer(layer1);							//If not add layer
                $("#layer1").prop("checked", true);				//and change layer control item to checked 
            };
            map.fitBounds(datum.bounds);						//zoom to selection based on poly bounds (for polygon results)
            if (map._layers[datum.id]) {						//Apply action to selected result to fire a click event 
                map._layers[datum.id].fire("click");				// (this will fire the onClick event established for the layer and stored as a function in actions.js)
            }; 
        };
        if (datum.source === "Layer 2") {
            if (!map.hasLayer(layer2)) {
                map.addLayer(layer2);
                $("#layer2").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            }; 
        };
       if (datum.source === "Layer 3") {	
            if (!map.hasLayer(layer3)) {	
                map.addLayer(layer3);	
                $("#layer3").prop("checked", true);				 
            };
            map.setView([datum.lat, datum.lng], 17);			//zoom to selection based on point and zoom level (for point only results)			
            if (map._layers[datum.id]) {						
                map._layers[datum.id].fire("click");
            }; 
        };
        if (datum.source === "Layer 4") {	
            if (!map.hasLayer(layer4)) {	
                map.addLayer(layer4);	
                $("#layer4").prop("checked", true);				 
            };
            map.fitBounds(datum.bounds);						
            if (map._layers[datum.id]) {					
                map._layers[datum.id].fire("click");
            }; 
        };
		if (datum.source === "Layer 5") {	
            if (!map.hasLayer(layer5)) {	
                map.addLayer(layer5);	
                $("#layer6").prop("checked", true);				 
            };
            map.fitBounds(datum.bounds);						
            if (map._layers[datum.id]) {					
                map._layers[datum.id].fire("click");
            }; 
        };
    }).on("typeahead:opened", function () {
            $(".navbar-collapse.in").css("max-height", $(document).height()-$(".navbar-header").height());
            $(".navbar-collapse.in").css("height", $(document).height()-$(".navbar-header").height());
        }).on("typeahead:closed", function () {
            $(".navbar-collapse.in").css("max-height", "");
            $(".navbar-collapse.in").css("height", "");
        });
        $(".twitter-typeahead").css("position", "static");
        $(".twitter-typeahead").css("display", "block");
    });

    
