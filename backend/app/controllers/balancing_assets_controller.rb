# app/controllers/assets_controller.rb
class BalancingAssetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_balancing
  before_action :set_balancing_asset, only: [:show, :update, :destroy]

  def index
    render json: @balancing.balancing_assets
  end

  def create
    @asset = @balancing.balancing_assets.build(asset_params)
    if @asset.save
      render json: @asset, status: :created
    else
      render json: { errors: @asset.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @asset.update(asset_params)
      render json: @asset
    else
      render json: { errors: @asset.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @asset.destroy!
    head :no_content
  end

  private

  def set_balancing
    @balancing = current_user.balancings.find(params[:balancing_id])
  end

  def set_asset
    @asset = @balancing.balancing_assets.find(params[:id])
  end

  def asset_params
    params.require(:asset).permit(
      :balancing_id,
      :asset_type, :current_value, :current_percentage,
      :desired_percentage, :updated_value
    )
  end
end
