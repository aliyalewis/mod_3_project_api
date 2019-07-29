class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.find_by(name: params[:name])
    if !(User.all.include?(@user))
      @newUser = User.create(name: params[:name])
      redirect_to @newUser
    else
      redirect_to @user
    end
  end

  def show
    @user = User.find(params[:id].to_i)
    render json: @user
  end

end
