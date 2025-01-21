class TodosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo, only: %i[ show update destroy ]

  def index
    @todos = current_user.todos

    render json: @todos
  end

  def show
    render json: @todo
  end

  def create
    @todo = current_user.todos.build(todo_params)

    if @todo.save
      render json: @todo, status: :created, location: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy!
  end

  private
    def set_todo
      @todo = current_user.todos.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:name, :done)
    end
end
