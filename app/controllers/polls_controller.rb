class PollsController < ApplicationController
    # before_action :authenticate_user_using_x_auth_token
    attr_accessor :poll
    before_action :load_task, only: %i[show update destroy vote]

    def index
        @polls = Poll.all
        if @polls
            render status: :ok, json: { polls: @polls }
        else
            render status: :unprocessable_entity, json: {
              errors: @polls.errors.full_messages.to_sentence
            }
        end
    end

    def create
        @polls = Poll.new(poll_params)
        poll_hash =  {@polls.option1 => 0,@polls.option2 => 0,@polls.option3 => 0,@polls.option4 => 0}
        @polls.polls = poll_hash
        if @polls.save
            render status: :ok, json: { notice: 'Poll created!', poll: @polls  }
        else
            render status: :unprocessable_entity, json: {
            errors: @polls.errors.full_messages.to_sentence
            }
        end
    end
    
    def poll_params
        params.require(:poll).permit(:title, :option1, :option2, :option3, :option4)
    end

    private

    def load_task
        puts params[:id]
        @poll = Poll.find(params[:id])
        rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors}
    end
  
end
