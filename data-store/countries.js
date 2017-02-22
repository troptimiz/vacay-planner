db = db.getSiblingDB("vacayplanner");
db.countries.drop();

db.countries.save({
    "countryName":"India",
    "countryCode":"IN"
});

db.countries.save({
    "countryName":"United States",
    "countryCode":"US"
});

db.countries.save({
    "countryName":"United Kingdom",
    "countryCode":"UK"
});