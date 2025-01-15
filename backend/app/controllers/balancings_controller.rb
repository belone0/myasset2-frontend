class BalancingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_balancing, only: %i[ show update destroy ]

  def index
    @balancings = current_user.balancings.order(created_at: :desc)

    render json: @balancings, include: :balancing_assets
  end

  def show
    render json: @balancing, include: :balancing_assets
  end

  def create
    @balancing = current_user.balancings.build(balancing_params)

    if @balancing.save
      render json: @balancing, status: :created
    else
      render json: @balancing.errors, status: :unprocessable_entity
    end
  end

  def update
    if @balancing.update(balancing_params)
      render json: @balancing
    else
      render json: @balancing.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @balancing.destroy!
    head :no_content
  end

  private

  def set_balancing
    @balancing = current_user.balancings.find(params[:id])
  end

  def balancing_params
    params.require(:balancing).permit(
      :total_value,
      :user_id,
      balancing_assets_attributes: [
        :id,
        :asset_type,
        :current_value,
        :current_percentage,
        :desired_percentage,
        :updated_value,
        :_destroy
      ]
    )
  end
end
