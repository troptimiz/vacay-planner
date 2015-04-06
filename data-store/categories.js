db = db.getSiblingDB("vacayplanner");
db.categories.drop();

db.categories.save(
	{"name":"Hotels","description":"Hotels Category","imageUrl":"images/hotels.png","is_active":true}
	);
db.categories.save(
	{"name":"Resorts","description":"Resorts Category","imageUrl":"images/resorts.png","is_active":true}
	);
db.categories.save(
	{"name":"Spa","description":"Spa Category","imageUrl":"images/spa.png","is_active":true}
	);
db.categories.save(
	{"name":"Movies-Entertainment","description":"Movies Entertainment Category","imageUrl":"images/movies.png","is_active":true}
	);
db.categories.save(
{"name":"Travel-Air","description":"Travel Air Category","imageUrl":"images/travel-air.png","is_active":true}
	);
db.categories.save(
{"name":"Travel-Car","description":"Travel Car Category","imageUrl":"images/travel-car.png","is_active":true}
	);