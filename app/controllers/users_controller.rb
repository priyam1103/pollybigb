class UsersController < ApplicationController

    def create
      user = User.new(user_params)
      if user.save
        render status: :ok, json: { notice: 'User was successfully created!',auth_token: user.authentication_token, userId: user.id, firstname: user.name }
      else
        render status: :unprocessable_entity, json: {
          errors: user.errors.full_messages.to_sentence
        }
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :lastname)
    end

end