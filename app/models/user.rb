class User < ApplicationRecord
  has_many :trips
  has_many :countries, through: :trips
  validates :name, uniqueness: true
end
