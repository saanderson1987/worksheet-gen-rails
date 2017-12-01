class Api::CoursesController < ApplicationController
  before_action :require_logged_in

  def index
    if params[:admined]
      @courses = Course.where(admin_id: current_user.id)
    end
  end

  def show
    @course = Course.find(params[:id])
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      render :show
    else
      @course.save!
      render json: @document.errors.full_messsages, status: 422
    end
  end

  def update
    @course = Course.find(params[:id])
    if @course.update(course_params)
      render :show
    else
      render json: @course.errors.full_messages, status: 422
    end
  end

  def destroy
    @course = Course.find(params[:id])
    if @course.destroy
      render :show
    else
      render json: @course.error.full_messages, status: 422
    end
  end

  private

  def course_params
    params.require(:course).permit(:name, :admin_id)
  end
end
