class Country < ApplicationRecord
  has_many :trips
  has_many :users, through: :trips

  def trips
    @trips = Trip.all.select{ |trip| trip.country_id == self.id }
  end

  def reviews
    arr = []
    self.trips.each do |t|
        arr << t.review
    end
    return arr
  end
end
