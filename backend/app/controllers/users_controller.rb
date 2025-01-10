class UsersController < ApplicationController
  before_action :authenticate_user! # Ensure the user is authenticated

  def me
    if current_user
      render json: current_user, status: :ok
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end
end
