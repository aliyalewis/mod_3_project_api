class TripsController < ApplicationController

  def index
    @trips = Trip.all
    render json: @trips
  end

  def create
   @trip = Trip.create(id: params[:id], name: params[:name], status: params[:status], user_id: params[:user_id], country_id: params[:country_id])
   render json: @trip
 end

end
