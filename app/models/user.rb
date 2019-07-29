class User < ApplicationRecord
  has_many :trips
  validates :name, uniqueness: true
end
