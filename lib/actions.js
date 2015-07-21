//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////  Declare Shared Values //////////////////////

var hlweight = 6, 			//weight of highlighted feature outline
	hlColor = "#EFA06A";	//color of point, outline and line highlights


// required variables DO NOT REMOVE
var polyLayer= [],layersearch, props, header, content, titleName, headerClass;

////////////////////////////////////////////////////
//Individual Feature actions /////////////////////	
//Edited most attributes in the .json files that began with numbers - the attribute apparently cannot begin with a number (ex. props.19_TOT yielded an error)
//  layer1
function highlightLayer1(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>\
	</div><div class='labelfield'>Type:</div>\
    <div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Distance:</div>\
    <div class='datafield'>" + props.DISTANCE + " miles" + "</div><!--close baseInfo-->",
    layerName = 'layer1';
    contentPush(header, content, layerName, titleName, headerClass);
};
//  layer2
function highlightLayer2(e) {
    initializeHL(e);
    header = '<p>' + props.FRGHTCRRDR + '</p>',
    content = "<div id='baseInfo'>\
	</div><div class='labelfield'>Thru Lanes:</div>\
    <div class='datafield'>" + props.THRULANES + "</div><div class='labelfield'>Distance:</div>\
    <div class='datafield'>" + props.MILES + " miles" + "</div><!--close baseInfo-->",
    layerName = 'layer2';
    contentPush(header, content, layerName, titleName, headerClass);     
};
//old display
/*
content = "<div id='baseInfo'>\
</div><div class='labelfield'>Project Name:</div>\
<div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
<div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
<div class='datafield'>" + props.AREA + "</div><div class='labelfield'>2016 Funding:</div>\
<div class='datafield'>" + numeral(props.FYSIX_TOT * 1000).format('$0,0.00') + "</div><div class='labelfield'>2017 Funding:</div>\
<div class='datafield'>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0.00') + "</div><div class='labelfield'>2018 Funding:</div>\
<div class='datafield'>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0.00') + "</div><div class='labelfield'>2019 Funding:</div>\
<div class='datafield'>" + numeral(props.FYNINE_TOT * 1000).format('$0,0.00') + "</div><div class='labelfield'>Total Funding (2016-2019):</div>\
<div class='datafield'>" + numeral(props.TOT * 1000).format('$0,0.00') + "</div><!--close baseInfo-->",
*/
//  layer3
function highlightLayer3(e) {
    initializeHL(e);
	header = '&nbsp;',
    content = "<div id='baseInfo'>\
	</div><div class='labelfield'>Project Name:</div>\
    <div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
    <div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
	<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
	<div class='datafield'>" + props.AREA + "</div><div class='infoDivider'></div>\
    <div id='indactorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Fun' data-toggle='tab' style='color: #000000'>Funding</a></li><li><a href='#Des' data-toggle='tab' style='color: #000000'>Description</a></li></ul></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Fun'>\
        <table class='table table-hover' style='color: #000000'>\
        <tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FYSIX_TOT * 1000).format('$0,0.00') + "</td></tr>\
        <tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.FYNINE_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.TOT * 1000).format('$0,0.00') + "</td></tr>\
        </table>\
    </div>\
    <div class='tab-pane' id='Des'>\
        <table class='table table-hover' style='color: #000000'>\
        <tr>" + props.DESCRIPTIO + "</tr>\
        </table>\
    </div></div>",
    layerName = 'layer3';
    contentPush(header, content, layerName, titleName, headerClass);       
};
//  layer4
function highlightLayer4(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
	</div><div class='labelfield'>Project Name:</div>\
    <div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
    <div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
	<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
	<div class='datafield'>" + props.AREA + "</div><div class='infoDivider'></div>\
    <div id='indactorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Fun' data-toggle='tab' style='color: #000000'>Funding</a></li><li><a href='#Des' data-toggle='tab' style='color: #000000'>Description</a></li></ul></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Fun'>\
        <table class='table table-hover' style='color: #000000'>\
        <tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FYSIX_TOT * 1000).format('$0,0.00') + "</td></tr>\
        <tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.FYNINE_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.TOT * 1000).format('$0,0.00') + "</td></tr>\
        </table>\
    </div>\
    <div class='tab-pane' id='Des'>\
        <table class='table table-hover' style='color: #000000'>\
        <tr>" + props.DESCRIPTIO + "</tr>\
        </table>\
    </div></div>",
    layerName = 'layer4';
    contentPush(header, content, layerName, titleName, headerClass);
};  
// layer 5
function highlightLayer5(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
	</div><div class='labelfield'>Project Name:</div>\
    <div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
    <div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
	<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
	<div class='datafield'>" + props.AREA + "</div><div class='infoDivider'></div>\
    <div id='indactorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Fun' data-toggle='tab' style='color: #000000'>Funding</a></li><li><a href='#Des' data-toggle='tab' style='color: #000000'>Description</a></li></ul></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Fun'>\
        <table class='table table-hover' style='color: #000000'>\
        <tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FYSIX_TOT * 1000).format('$0,0.00') + "</td></tr>\
        <tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.FYNINE_TOT * 1000).format('$0,0.00') + "</td></tr>\
		<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.TOT * 1000).format('$0,0.00') + "</td></tr>\
        </table>\
    </div>\
    <div class='tab-pane' id='Des'>\
        <table class='table table-hover' style='color: #000000'>\
        <tr>" + props.DESCRIPTIO + "</tr>\
        </table>\
    </div></div>",
    layerName = 'layer5';
    contentPush(header, content, layerName, titleName, headerClass);
};  