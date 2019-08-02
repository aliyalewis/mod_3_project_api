user1 = User.create(name: "Aliya")


country1 = Country.create(name: "Monaco", location: "Europe", description: "Super Fun Place", )
country2 = Country.create(name: "Singapore", location: "Asia")
country3 = Country.create(name: "Hong Kong", location: "Asia")
country4 = Country.create(name: "Vatican City", location: "Europe")

trip1 = Trip.create(name: "Monaco", status: "TL", user_id: 1, country_id: 1, likes: 0, review: "")
trip2 = Trip.create(name: "Singapore", status: "BL", user_id: 1, country_id: 2, likes: 0, review: "")
