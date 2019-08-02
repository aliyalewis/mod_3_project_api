class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :country

  def mycountry
    countries = Country.all
    countries.each do |country|
      if self.country_id == country.id
        return country
      end
    end
  end
end
