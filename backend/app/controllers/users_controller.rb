class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[ me ]
  allow_unauthenticated_access only: %i[ create ]

  def create
    user = User.new(email_address: params[:email_address], password: params[:password])

    if !user.save
      render json: { error: user.errors.full_messages }, status: :bad_request
      return
    end

    render json: user, status: :created
  end

  def me
    if current_user
      render json: current_user, status: :ok
    else
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end
end
