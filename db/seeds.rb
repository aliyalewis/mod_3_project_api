user1 = User.create(name: "Aliya")
user2 = User.create(name: "Jason")
user3 = User.create(name: "Karen")
user4 = User.create(name: "Claire")
user5 = User.create(name: "Philip")


country1 = Country.create(name: "Monaco", location: "Europe", description: "I challenge you to find it on a map", likes: 0)
country2 = Country.create(name: "Singapore", location: "Asia", description: "Don't try to smuggle drugs here (ever seen Midnight Express?)", likes: 1)
country3 = Country.create(name: "Hong Kong", location: "Asia", description: "Great place to buy a suit", likes: 0)
country4 = Country.create(name: "Vatican City", location: "Europe", description: "Steeped in art and history?  Is the Pope catholic?", likes: 1)
country5 = Country.create(name: "Switzerland", location: "Europe", description: "Really hard to lose track of time here", likes: 0)
country6 = Country.create(name: "Germany", location: "Europe", description: "Whatever you do, don't mention Hitler", likes: -2)
country7 = Country.create(name: "France", location: "Europe", description: "Eat, drink and be merry.  Just don't be the ugly American", likes: 3)
country8 = Country.create(name: "Bolivia", location: "South America", description: "Top notch coke!", likes: 47)
country9 = Country.create(name: "Mexico", location: "North America", description: "It's true what they say about the water", likes: 0)
country10 = Country.create(name: "India", location: "Asia", description: "Beautiful!  Only drawback is that it's hard to get a cheeseburger")
country11 = Country.create(name: "Canada", location: "North America", description: "Too many Canadians")
country12 = Country.create(name: "Panama", location: "South America", description: "A man.  A plan.  A canal.  Panama!")



trip1 = Trip.create(name: "Monaco", status: "Travel Log", user_id: 1, country_id: 1, likes: 0, review: "")
trip2 = Trip.create(name: "Singapore", status: "Bucket List", user_id: 1, country_id: 2, likes: 0, review: "I got my broken by a Singaporean girl.")
trip3 = Trip.create(name: "Germany", status: "Bucket List", user_id: 4, country_id: 6, likes: 0, review: "")
trip4 = Trip.create(name: "Bolivia", status: "Travel Log", user_id: 5, country_id: 8, likes: 0, review: "")

