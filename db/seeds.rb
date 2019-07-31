user1 = User.create(name: "Aliya")


country1 = Country.create(name: "Monaco", location: "Europe", description: "Super Fun Place", likes: 0)
country2 = Country.create(name: "Singapore", location: "Asia", description: "Highly recommend", likes: 1)
country3 = Country.create(name: "Hong Kong", location: "Asia", description: "Great food", likes: 0)
country4 = Country.create(name: "Vatican City", location: "Europe", description: "So much history", likes: 1)

trip1 = Trip.create(name: "Monaco", status: "Travel Log", user_id: 1, country_id: 1)
trip2 = Trip.create(name: "Singapore", status: "Bucket List", user_id: 1, country_id: 2)
