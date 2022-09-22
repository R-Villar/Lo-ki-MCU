class SessionsController < ApplicationController
    skip_before_action :authenticate_user, except: :destroy

    def create 
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: { errors: ["Invalid Credentials"] }, status: :unauthorized
        end
    end


    # DELETE '/logout'
    def destroy
        session.delete(:user_id)
        head :no_content
    end
end
