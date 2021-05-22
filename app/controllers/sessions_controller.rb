class SessionsController < ApplicationController
    def create
        user = User.find_by(email: login_params[:email].downcase)
        puts user
        if user.present? && user.authenticate(login_params[:password])
            render status: :ok, json: { auth_token: user.authentication_token, userId: user.id, firstname: user.name, lastname: user.lastname  }
        else
            render status: :unauthorized, json: {
              notice: 'Incorrect credentials, try again.'
            }
        end
    end

    private
    def login_params
      params.require(:login).permit(:email, :password)
    end
end