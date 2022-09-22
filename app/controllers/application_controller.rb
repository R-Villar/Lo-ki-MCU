class ApplicationController < ActionController::API
	include ActionController::Cookies
	before_action :authenticate_user

	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

	private

	def current_user 
	  @current_user ||= User.find_by_id(session[:user_id]) # memoization: caching experience
	end 

	def authenticate_user 
	  render json: { errors: {User: "Not Authorized"} }, status: :unauthorized unless current_user
	end

	def render_not_found_response(not_found)
		render json: { error: "#{not_found.model} not found" }, status: :not_found
	end

	def render_unprocessable_entity_response(invalid)
		render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
	end

end
