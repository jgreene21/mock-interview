class Api::ItemsController < ApplicationController
  before_action :set_item, only: [:show, :update]
  
  def index 
    render json: Item.all 
  end 

  def show 
    render json: @item
  end 

  def create 
    item = Item.new(item_params)
      if item.save
        render json: item 
      else  
        render json: item.errors, status: 422
      end 
  end
  
  private 

  def set_item 
    @item = Item.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :image, :description, :likes)
  end 
  
end
