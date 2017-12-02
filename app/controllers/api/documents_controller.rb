class Api::DocumentsController < ApplicationController
  before_action :require_logged_in

  def index
    @documents = Document.all
  end

  def show
    @document = Document.find(params[:id])
  end

  def create

    # @document = Document.new(document_params)
    @document = Document.new(owner_id: current_user.id) # Owner id is set in controller, not on front end to prevent users from creating docs with other owner_ids
    # assign_attrs(@document)
    document_params.each { |k, v| @document[k] = v }
    @document['instructions'] = '' unless document_params['instructions']
    unless document_params['problems']
      @document['problems'] = {
        "0" => {
          "textPieces" => {
            "0" => {
              "text" => "Here is your first problem and",
              "blank" => "false"
            },
            "1" => {
              "text" => "blank",
              "blank" => "true"
            },
            "2" => {
              "text" => "-- feel free to edit!",
              "blank" => "false"
            }
          }
        }
      }
    end
    if @document.save
      render :show
    else
      @document.save! # Since #save returned false, #save! will record error to then return.
      render json: @document.errors.full_messages, status: 422
    end

  end

  def update
    @document = Document.find(params[:id])

    if @document.update(document_params)
      render :show
    else
      @document.update!(document_params)
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
      :course_id,
      problems: {},
    ) # owner_id not permitted -- must be current_user.id
  end

  # def assign_attrs(doc)
  #   document_params.each{ |k, v| @document[k] = v }
  #   if !document.params.instructions
  # end

end
