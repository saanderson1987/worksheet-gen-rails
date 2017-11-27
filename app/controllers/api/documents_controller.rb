class Api::DocumentsController < ApplicationController
  before_action :require_logged_in

  def index
    if params[:owned]
      @documents = Document.where(owner_id: current_user.id)
    end
    # @documents = Document.all
  end

  def show
    @document = Document.find(params[:id])
  end

  def create
    @document = Document.new(document_params)
    if @document.save
      render :show
    else
      render json: @document.errors.full_messages, status: 422
    end

  end

  def update
    @document = Document.find(params[:id])

    if @document.update(document_params)
      render :show
    else
      render json: @document.errors.full_messages, status: 422
    end

  end

  def destroy
    @document = Document.find(params[:id])

    if @document.destroy
      render :show
    else
      render json: @document.errors.full_messages, status: 422
    end

  end

  private

  def document_params
    params.require(:doc).permit(
      :title,
      :doc_type,
      :instructions,
      :owner_id,
      problems: {},
    )
  end

end
