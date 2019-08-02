class CountriesController < ApplicationController

  def index
    @countries = Country.all
    render json: @countries
  end

  def show
    @country = Country.find_by(id: params[:id])
    render json: @country
  end

  def reviews
    country = Country.find(params[:id])
    render json: country.reviews
  end

end
