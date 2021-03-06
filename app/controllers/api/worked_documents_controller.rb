class Api::WorkedDocumentsController < ApplicationController
  before_action :require_logged_in

  def index
    @worked_documents = WorkedDocument.all
  end

  def show
    @worked_document = WorkedDocument.where(user_id: current_user.id, doc_id: params[:id]).first
    if !@worked_document
      @worked_document = WorkedDocument.new(user_id: current_user.id, doc_id: params[:id])
      save
    end
  end

  def create
    @worked_document = WorkedDocument.new(user_id: current_user.id, doc_id: worked_document_params[:doc_id])

    save
  end

  def update
    @worked_document = WorkedDocument.find(params[:id])
    if worked_document_params[:graded] == 'true'
      if @worked_document.update(worked_document_params)
        @worked_document.grade
        render :show
      end
    elsif worked_document_params[:reset]
      @worked_document.graded = false
      save
    else
      if @worked_document.update(worked_document_params)
        render :show
      else
        render json: @worked_document.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @worked_document = WorkedDocument.find(params[:id])
    if @worked_document.destroy
      render :show
    else
      render json: @worked_document.error.full_messages, status: 422
    end
  end

  private

  def worked_document_params
    params.require(:worked_document).permit(:doc_id, :graded, :score, :reset, problems: {})
  end

  def save
    @worked_document.set_problems
    if @worked_document.save
      render :show
    else
      @worked_document.save!
      render json: @worked_document.errors.full_messsages, status: 422
    end
  end

end
