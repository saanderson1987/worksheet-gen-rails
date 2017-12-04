class Api::CourseSubscriptionsController < ApplicationController
  before_action :require_logged_in

  def index
    @course_subscriptions = CourseSubscription.all
  end

  def show
    @course_subscription = CourseSubscription.find(params[:id])
  end

  def create
    @course_subscription = CourseSubscription.new(course_subscription_params)
    if @course_subscription.save
      render :show
    else
      @course_subscription.save!
      render json: @course_subscription.errors.full_messsages, status: 422
    end
  end

  def update
    @course_subscription = CourseSubscription.find(params[:id])
    if @course_subscription.update(course_subscription_params)
      render :show
    else
      render json: @course_subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @course_subscription = CourseSubscription.find(params[:id])
    if @course_subscription.destroy
      render :show
    else
      render json: @course_subscription.error.full_messages, status: 422
    end
  end

  private

  def course_subscription_params
    params.require(:course_subscription).permit(:user_id, :course_id)
  end

end
