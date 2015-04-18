db = db.getSiblingDB("vacayplanner");
db.products.drop();

db.products.save(
	{
	"type":"property",
	"category":"Hotels",
	"name":"Eagleton - The Golf Resort",
	"description":"Resort @ Bangalore",
	"emailAddress":"resv@eagletonindia.com",
	"is_active":true,
	"addresses":[],
	"phoneNumbers":[],
	"tariffs":[],
	"amenities":[],
	"termsAndConditions":[]

}
	);