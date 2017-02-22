/*
 * An example of how to use a Google Map overlay to display a label on top of marker.
 * This is a slight re-work of http://www.tdmarketing.co.nz/blog/2011/03/09/create-marker-with-custom-labels-in-google-maps-api-v3/
 * I suggest you rather view that blog post, this code is pasted here purely for my own personal reference.
 */

var
	point = {
		lat: 37.8478115,
		long: 15.2934327
	},
	marker = {
		icon: {
			url: 'images/icon-map-pin.png',
			size: { x: 24, y: 39 }
		},
		shadow: {
			url: 'images/icon-map-ping-shadow.png',
			size: { x: 38, y: 47 }
		}
	},
	markerIcon = new google.maps.MarkerImage(
		marker.icon.url,
		new google.maps.Size(marker.icon.size.x, marker.icon.size.y),
		new google.maps.Point(0, 0)
	),
	markerShadow = new google.maps.MarkerImage(
		marker.shadow.url,
		new google.maps.Size(marker.shadow.size.x, marker.shadow.size.y),
		new google.maps.Point(0, 0),
		new google.maps.Point(7, 40)
	);

// Our Custom Marker
var Marker = function(options){

	google.maps.Marker.apply(this, arguments);

	if (options.label) {
		this.MarkerLabel = new MarkerLabel({
			map: this.map,
			marker: this,
			text: options.label
		});
		this.MarkerLabel.bindTo('position', this, 'position');
	}
};

Marker.prototype = $.extend(new google.maps.Marker(), {
	// If we're adding/removing the marker from the map, we need to do the same for the marker label overlay
	setMap: function(){
		google.maps.Marker.prototype.setMap.apply(this, arguments);
		(this.MarkerLabel) && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments);
	}
});

// Our custom marker label overlay
var MarkerLabel = function(options) {

	var self = this;

	this.setValues(options);

	// Create the label container
	this.div = document.createElement('div');
	this.div.className = 'map-marker-label';

	// Trigger the marker click handler if clicking on the label
	google.maps.event.addDomListener(this.div, 'click', function(e){
		(e.stopPropagation) && e.stopPropagation();
		google.maps.event.trigger(self.marker, 'click');
	});
};

MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
	onAdd: function() {
		this.getPanes().overlayImage.appendChild(this.div);

		// Ensures the label is redrawn if the text or position is changed.
		var self = this;
		this.listeners = [
			google.maps.event.addListener(this, 'position_changed', function() { self.draw(); }),
			google.maps.event.addListener(this, 'text_changed', function() { self.draw(); }),
			google.maps.event.addListener(this, 'zindex_changed', function() { self.draw(); })
		];
	},
	onRemove: function() {
		this.div.parentNode.removeChild(this.div);
		// Label is removed from the map, stop updating its position/text
		for (var i = 0, l = this.listeners.length; i < l; ++i) {
			google.maps.event.removeListener(this.listeners[i]);
		}
	},
	draw: function() {
		var
			text = String(this.get('text')),
			markerSize = marker.icon.size,
			position = this.getProjection().fromLatLngToDivPixel(this.get('position'));

		this.div.innerHTML = text;
		this.div.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 'px';
		this.div.style.top = (position.y - markerSize.y) + 'px';
	}
});

// Create the custom marker
var MyMarker = new Marker({
	map: gMapInstance,
	position: new google.maps.LatLng(point.lat, point.long),
	icon: markerIcon,
	shadow: markerShadow,
	label: 'Label text'
});