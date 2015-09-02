//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////  Declare Shared Values //////////////////////

var hlweight = 6, 			//weight of highlighted feature outline
	hlColor = "#EFA06A";	//color of point, outline and line highlights


// required variables DO NOT REMOVE
var polyLayer= [],layersearch, props, header, content, titleName, headerClass;

////////////////////////////////////////////////////
//Individual Feature actions /////////////////////	
//Note: attribute names in the .json files cannot begin with an integer - you'll get an error
//  layer 1
function highlightLayer1(e) {
    initializeHL(e);
	header = '&nbsp;',
    content = "<div id='baseInfo'>\
		<div class='labelfield'>Project Name:</div>\
		<div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
		<div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
		<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
		<div id='needpadding' class='datafield'>" + props.AREA + "</div>\
		<div id='indactorInfo'>\
			<ul class='nav nav-tabs'><!--tabs for indicators-->\
				<li class='active'><a href='#Fun' data-toggle='tab'>Funding</a></li>\
				<li><a href='#Des' data-toggle='tab'>Description</a></li>\
			</ul>\
			<div id='indicator' class='tab-content'><!--tab panes-->\
				<div class='tab-pane active' id='Fun'>\
					<table class='table table-hover' >\
						<tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FYSIX_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.FYNINE_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.TOT * 1000).format('$0,0[.]00') + "</td></tr>\
					</table>\
				</div>\
				<div class='tab-pane' id='Des'>\
					<div class='descWrapper'>\
						<div class='datafield'>" + props.DESCRIPTIO + "</div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class='labelfield source'>Source: 2015 Wilmapco</div>\
	</div>",
    layerName = 'layer1';
    contentPush(header, content, layerName, titleName, headerClass);       
};
//  layer 2
function highlightLayer2(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
		<div class='labelfield'>Project Name:</div>\
		<div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
		<div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
		<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
		<div id='needpadding' class='datafield'>" + props.AREA + "</div>\
		<div id='indactorInfo'>\
			<ul class='nav nav-tabs'><!--tabs for indicators-->\
				<li class='active'><a href='#Fun' data-toggle='tab'>Funding</a></li>\
				<li><a href='#Des' data-toggle='tab'>Description</a></li>\
			</ul>\
			<div id='indicator' class='tab-content'><!--tab panes-->\
				<div class='tab-pane active' id='Fun'>\
					<table class='table table-hover' >\
						<tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FYSIX_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.FYNINE_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.TOT * 1000).format('$0,0[.]00') + "</td></tr>\
					</table>\
				</div>\
				<div class='tab-pane' id='Des'>\
					<div class='descWrapper'>\
						<div class='datafield'>" + props.DESCRIPTIO + "</div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class='labelfield source'>Source: 2015 Wilmapco</div>\
	</div>",
    layerName = 'layer2';
    contentPush(header, content, layerName, titleName, headerClass);
};  
// layer 3
function highlightLayer3(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
		<div class='labelfield'>Project Name:</div>\
		<div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
		<div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
		<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
		<div id='needpadding' class='datafield'>" + props.AREA + "</div>\
		<div id='indactorInfo'>\
			<ul class='nav nav-tabs'><!--tabs for indicators-->\
				<li class='active'><a href='#Fun' data-toggle='tab'>Funding</a></li>\
				<li><a href='#Des' data-toggle='tab'>Description</a></li>\
			</ul>\
			<div id='indicator' class='tab-content'><!--tab panes-->\
				<div class='tab-pane active' id='Fun'>\
					<table class='table table-hover' >\
						<tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FYSIX_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.FYSEVEN_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.FYEIGHT_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.FYNINE_TOT * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.TOT * 1000).format('$0,0[.]00') + "</td></tr>\
					</table>\
				</div>\
				<div class='tab-pane' id='Des'>\
					<div class='descWrapper'>\
						<div class='datafield'>" + props.DESCRIPTIO + "</div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class='labelfield source'>Source: 2015 Wilmapco</div>\
	</div>",
    layerName = 'layer3';
    contentPush(header, content, layerName, titleName, headerClass);
};  
// layer 4
function highlightLayer4(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
		<div class='labelfield'>Project Name:</div>\
		<div class='datafield'>" + props.PROJECT + "</div><div class='labelfield'>Phase:</div>\
		<div id='needpadding' class='datafield'>" + props.PHASE + "</div>\
		<div id='indactorInfo'>\
			<ul class='nav nav-tabs'><!--tabs for indicators-->\
				<li class='active'><a href='#Fun' data-toggle='tab'>Funding</a></li>\
				<li><a href='#Des' data-toggle='tab'>Description</a></li>\
			</ul>\
			<div id='indicator' class='tab-content'><!--tab panes-->\
				<div class='tab-pane active' id='Fun'>\
					<table class='table table-hover' >\
						<tr><td><div class='labelfield'>2016 Funding:</div></td><td>" + numeral(props.FY_SIXTEEN * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2017 Funding:</div></td><td>" + numeral(props.SEVENTEEN * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2018 Funding:</div></td><td>" + numeral(props.EIGHTEEN * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>2019 Funding:</div></td><td>" + numeral(props.NINETEEN * 1000).format('$0,0[.]00') + "</td></tr>\
						<tr><td><div class='labelfield'>Total Funding (2016-2019):</div></td><td>" + numeral(props.NINE_TOTAL * 1000).format('$0,0[.]00') + "</td></tr>\
					</table>\
				</div>\
				<div class='tab-pane' id='Des'>\
					<div class='descWrapper'>\
						<div class='datafield'>The Highway Safety Improvement Program identifies areas with high concentrations of crashes and develops recommendations to improve identified safety concerns.</div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class='labelfield source'>Source: 2015 Wilmapco</div\
	</div>",
    layerName = 'layer4';
    contentPush(header, content, layerName, titleName, headerClass);
};  
// layer 5
function highlightLayer5(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
		<div class='labelfield'>Project Name:</div>\
		<div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
		<div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
		<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
		<div class='datafield'>" + props.AREA + "</div><div class='labelfield'>Funding:</div>\
		<div class='datafield'>Unfunded</div><div class='labelfield'>Description:</div>\
		<div class='descWrapper'>\
			<div class='datafield'>" + props.DESCRIPTIO + "</div>\
		</div>\
		<div class='labelfield source'>Source: 2015 Wilmapco</div>\
	</div>",
    layerName = 'layer5';
    contentPush(header, content, layerName, titleName, headerClass);
};  
// layer 6
function highlightLayer6(e) {
    initializeHL(e);
    header = '&nbsp;',
    content = "<div id='baseInfo'>\
		<div class='labelfield'>Project Name:</div>\
		<div class='datafield'>" + props.NAME + "</div><div class='labelfield'>Category:</div>\
		<div class='datafield'>" + props.CATEGORY0 + "</div><div class='labelfield'>Mode:</div>\
		<div class='datafield'>" + props.MODE + "</div><div class='labelfield'>Investment Area:</div>\
		<div class='datafield'>" + props.AREA + "</div><div class='labelfield'>Funding:</div>\
		<div class='datafield'>Unfunded</div><div class='labelfield'>Description:</div>\
		<div class='descWrapper'>\
			<div class='datafield'>" + props.DESCRIPTIO + "</div>\
		</div>\
		<div class='labelfield source'>Source: 2015 Wilmapco</div>\
	</div>",
    layerName = 'layer6';
    contentPush(header, content, layerName, titleName, headerClass);
};  