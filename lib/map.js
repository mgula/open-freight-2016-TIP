//declare boundary of region
var oLat = 39.5675, oLng = -75.5651, zLevel = 10, mZoom = 16;             //adjust lat-lon coordinates to center on your region


//declare basemaps
// Basemap Layers
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
	maxZoom: mZoom
});

var Esri_transportation = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
	maxZoom: mZoom
});

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: mZoom
});


//create map instance
var map = L.map("mapDIV", {
    minZoom: 1,
    zoomControl: false,
    layers: [Esri_transportation]
}).setView([oLat, oLng],zLevel);

//add Layer Control to map
var baseLayers = {
    "Satellite": Esri_WorldImagery,      
    "Grey": Esri_WorldGrayCanvas,
	"Detailed": Esri_transportation
};
L.control.layers(baseLayers).addTo(map);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////      Declare Data Layers Here        ///////////////////
//////////////////////////////////////////////////////////////////

//define Icon Set and Marker Types 
var IconPresets = {iconSet:'dynico', markerSet: 'open-freight', mapMarker: 'circle-cm', legendMarker: 'circle-md'};
 
//declare Base Info for layers
var layer1icon = L.OpenFreightMarkers.icon({
        icon: 'bridge', markerColor: 'blue', layer:'layer1', title: 'Bridge/Intersection Projects'}, IconPresets),
    layer2icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'purple', layer:'layer2', title: 'Road/Rail/Trail Projects'}, IconPresets),
	layer3icon = L.OpenFreightMarkers.icon({
        icon: 'community', markerColor: 'teal', layer:'layer3', title: 'Areawide Projects'}, IconPresets),
	layer4icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'red', layer:'layer4', title: 'HSIP'}, IconPresets),
	layer5icon = L.OpenFreightMarkers.icon({
        icon: 'bridge', markerColor: 'blue', layer:'layer5', title: 'Bridge/Intersection Projects'}, IconPresets),
	layer6icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'purple', layer:'layer6', title: 'Road/Rail/Trail Projects'}, IconPresets);
	

//define search groups for each layer that will be searchable
var layer1Search = [], layer2Search = [], layer3Search = [], layer4Search = [], layer5Search = [], layer6Search = [],  LayerStyle = [];

//layer 1 (point)
var layer1 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer1icon});	
        },
    onEachFeature: function (feature, layer){			
        layer.on({											
            click: highlightLayer1,					//click function handling specific to data type (one for point and one for polygon)	--> created in actions.js								
            dblclick: zoomToPoint								
        });
		layer1Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.NAME,			//search name/field
            source: "Layer 1",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]						
        });
    }
});  
$.getJSON("data/TIP2016point.json", function (data) {
	layer1.addData(data);
});

//layer 2 (poly - lines)
var layer2 = L.geoJson(null, {
    style: {weight:4, color:"#9854c9 ", opacity:.75},    
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer2,
            dblclick: zoomToFeature
        });
        layer2Search.push({
            name: layer.feature.properties.NAME,
            source: "Layer 2",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
$.getJSON("data/TIP2016poly.json", function (data) {
    layer2.addData(data);
});
polyLayer.push('layer2');

//layer 3 (poly)
var layer3 = L.geoJson(null, {
    style: {fillColor: "#76f4f0", fillOpacity:.50, weight:3, color:"#38c7c2 ", opacity:.75},    
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer3,
            dblclick: zoomToFeature
        });
        layer3Search.push({
            name: layer.feature.properties.NAME,
            source: "Layer 3",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
$.getJSON("data/TIP2016reg.json", function (data) {
    layer3.addData(data);
});
polyLayer.push('layer3');

//layer 4 (pt-poly combo)
var layer4pt = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer4icon});	
        },
    onEachFeature: function (feature, layer){			
        layer.on({											
            click: highlightLayer4,							
            dblclick: zoomToPoint								
        });
		layer4Search.push({
            name: layer.feature.properties.PROJECT,
            source: "Layer 4",
			type: 'point',
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]						
        });
    }
});  
$.getJSON("data/HSIP2016point.json", function (data) {
	layer4pt.addData(data);
});

var layer4poly = L.geoJson(null, {
    style: {weight:4, color:"#d60004 ", opacity:.75},  
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer4,
            dblclick: zoomToFeature
        });
        layer4Search.push({
            name: layer.feature.properties.PROJECT,
            source: "Layer 4",
			type: 'poly',
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
$.getJSON("data/HSIP2016poly.json", function (data) {
    layer4poly.addData(data);
});
polyLayer.push('layer4poly');
//create layer group for Layer 4 point and polyline features
var layer4 = new L.FeatureGroup([layer4pt, layer4poly]);

//layer 5 (point)
var layer5 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer5icon});	
        },
    onEachFeature: function (feature, layer){			
        layer.on({											
            click: highlightLayer5,							
            dblclick: zoomToPoint								
        });
		layer5Search.push({
            name: layer.feature.properties.NAME,
            source: "Layer 5",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]						
        });
    }
});  
$.getJSON("data/TIP2016Upoint.json", function (data) {
	layer5.addData(data);
});

//layer 6 (poly - lines)
var layer6 = L.geoJson(null, {
    style: {weight:4, color:"#9854c9 ", opacity:.75},    
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer6,
            dblclick: zoomToFeature
        });
        layer6Search.push({
            name: layer.feature.properties.NAME,
            source: "Layer 6",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
$.getJSON("data/TIP2016Upoly.json", function (data) {
    layer6.addData(data);
});
polyLayer.push('layer6');
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
	var layer6BH = new Bloodhound({
        name: "Layer 6",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer6Search,
        limit: 10
    });
   //initialize 
    layer1BH.initialize();
    layer2BH.initialize();
    layer3BH.initialize();
	layer4BH.initialize();
	layer5BH.initialize();
	layer6BH.initialize();
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
            header: "<h5 class='typeahead-header'>Bridge/Intersection Projects</h5>"
        }
	},{
    	name: "Layer2data",
        displayKey: "name",
        source: layer2BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Road/Rail/Trail Projects</h5>"
        }
	},{
    	name: "Layer3data",
        displayKey: "name",
        source: layer3BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Areawide Projects</h5>"
        }
    },{
    	name: "Layer4data",
        displayKey: "name",
        source: layer4BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Highway Safety Improvement Program</h5>"
        }
    },{
    	name: "Layer5data",
        displayKey: "name",
        source: layer5BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Unfunded Bridge/Intersection Projects</h5>"
        }
    },{
    	name: "Layer6data",
        displayKey: "name",
        source: layer6BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'> Unfunded Road/Rail/Trail Projects</h5>"
        }
    }).on("typeahead:selected", function (obj, datum) {		//define action on selection of a search result
       if (datum.source === "Layer 1") {	
            if (!map.hasLayer(layer1)) {	
                map.addLayer(layer1);	
                $("#layer1").prop("checked", true);				 
            };
            map.setView([datum.lat, datum.lng], mZoom);			//zoom to selection based on point and zoom level (for point only results)			
            if (map._layers[datum.id]) {						
                map._layers[datum.id].fire("click");
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
            map.fitBounds(datum.bounds);						
            if (map._layers[datum.id]) {					
                map._layers[datum.id].fire("click");
            }; 
        };
		if (datum.source === "Layer 4") {	
            if (!map.hasLayer(layer4)) {	
                map.addLayer(layer4);	
                $("#layer4").prop("checked", true);				 
            };
            if(datum.type === 'point'){
                map.setView([datum.lat, datum.lng], mZoom);
            }else{
                map.fitBounds(datum.bounds);         
            } 						
            if (map._layers[datum.id]) {					
                map._layers[datum.id].fire("click");
            }; 
        };
		if (datum.source === "Layer 5") {	
            if (!map.hasLayer(layer5)) {	
                map.addLayer(layer5);	
                $("#layer5").prop("checked", true);				 
            };
            map.setView([datum.lat, datum.lng], mZoom);				
            if (map._layers[datum.id]) {						
                map._layers[datum.id].fire("click");
            }; 
        };
		if (datum.source === "Layer 6") {	
            if (!map.hasLayer(layer6)) {	
                map.addLayer(layer6);	
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

    
