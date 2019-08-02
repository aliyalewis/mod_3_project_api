class TripsController < ApplicationController

  def index
    trips = Trip.all
    render json: trips
  end

  def create
    trip = Trip.create(id: params[:id], name: params[:name], status: params[:status], likes: 0, review: "", user_id: params[:user_id], country_id: params[:country_id])
    render json: trip
  end

  def update
    trip = Trip.find(params[:id])
    trip.update(status: params[:status], likes: params[:likes], review: params[:review])
    render json: trip
  end

  def destroy
    trip = Trip.find(params[:id])
    trip.delete
  end



end
