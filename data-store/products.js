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
	"addresses":[
		{
			"address1":"30th KM,Bangalore,Mysore Highway",
			"address2":"Shyamangala Cross",
			"city":"Bangalore",
			"state":"Karnataka",
			"postalCode":561231
		}
	],
	"phoneNumbers":[
		{
			"type":"LAN",
			"number":918022632222
		},
		{
			"type":"mobile",
			"number":919845691121
		}
	],
	"tariffs":[
		{
			"description":"All 3-Breakfast,Lunch,Dinner(Buffet Breakfast, Buffet Lunch, Evening Tea/Coffee with cookies and Buffet Dinner)",
			"cost":1650.00
		},
		{
			"description":"Only Dinner(Welcome Drink, Evening Tea/Coffee with cookies and Buffet Dinner)",
			"cost":1050.00
		}
	],
	"amenities":[
		{
			"description":"Multi Level Designer Swimming pool"
		},
		{
			"description":"Indoor Games:Squash,Badminton,Table Tennis"
		},
		{
			"description":"Outdoor Games:Volleyball,Cricket"	
		}
		
	],
	"termsAndConditions":[
		{
			"description":"The clients are strictly Not allowed to carry their liquor in the resort."
		},
		{
			"description":"Swimming Pool timings will be strictly followed (10AM to 5 PM only) and swimming pool dress code should be adhered too ie synthetic  shorts and T-Shirt( synthetic  shorts &amp; T-Shirts are available at the Pool reception."
		},
		{
			"description":"Resort day out package timing will be 8 am to 6 pm only."	
		}
	]

}
	);
db.products.save(
	{
	"type":"property",
	"category":"Hotels",
	"name":"Sample - The Golf Resort",
	"description":"Resort @ Mysore",
	"emailAddress":"resv@sampleresort.com",
	"is_active":true,
	"addresses":[
		{
			"address1":"30th KM,Bangalore,Mysore Highway",
			"address2":"Shyamangala Cross",
			"city":"Mysore",
			"state":"Karnataka",
			"postalCode":561266
		}
	],
	"phoneNumbers":[
		{
			"type":"LAN",
			"number":91802263221
		},
		{
			"type":"mobile",
			"number":919845691123
		}
	],
	"tariffs":[
		{
			"description":"All 3-Breakfast,Lunch,Dinner(Buffet Breakfast, Buffet Lunch, Evening Tea/Coffee with cookies and Buffet Dinner)",
			"cost":2050.00
		},
		{
			"description":"Only Dinner(Welcome Drink, Evening Tea/Coffee with cookies and Buffet Dinner)",
			"cost":1200.00
		}
	],
	"amenities":[
		{
			"description":"Multi Level Designer Swimming pool"
		},
		{
			"description":"Indoor Games:Squash,Badminton,Table Tennis"
		},
		{
			"description":"Outdoor Games:Volleyball,Cricket"	
		}
		
	],
	"termsAndConditions":[
		{
			"description":"The clients are strictly Not allowed to carry their liquor in the resort."
		},
		{
			"description":"Swimming Pool timings will be strictly followed (10AM to 5 PM only) and swimming pool dress code should be adhered too ie synthetic  shorts and T-Shirt( synthetic  shorts &amp; T-Shirts are available at the Pool reception."
		},
		{
			"description":"Resort day out package timing will be 8 am to 6 pm only."	
		}
	]

}
	);