class PollsController < ApplicationController
    before_action :authenticate_user_using_x_auth_token, only: %i[create update destroy vote]
    attr_accessor :poll
    before_action :load_task, only: %i[show update destroy vote]

    def index
        polls = Poll.all
        if polls
            render status: :ok, json: { polls: polls }
        else
            render status: :unprocessable_entity, json: {
              errors: polls.errors.full_messages.to_sentence
            }
        end
    end

    def create
        polls = Poll.new(poll_params)
        poll_hash =  {polls.option1 => 0,polls.option2 => 0,polls.option3 => 0,polls.option4 => 0}
        polls.polls = poll_hash
        if polls.save
            render status: :ok, json: { notice: 'Poll created!', poll: polls  }
        else
            render status: :unprocessable_entity, json: {
            errors: polls.errors.full_messages.to_sentence
            }
        end
    end

    def show
        if poll
            render status: :ok, json: { poll:poll }
        else
            render status: :unprocessable_entity, json: {
                errors:poll.errors.full_messages.to_sentence
            }
        end
    end

    def update
        if poll.update(poll_params)
            poll.polls =  {poll.option1 => 0,poll.option2 => 0,poll.option3 => 0,poll.option4 => 0}
            if poll.save
                render status: :ok, json: { notice: 'Successfully updated task.' }
            else
                render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
            end
        else
            render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
        end
    end

    def destroy
        if poll.destroy
            render status: :ok, json: { notice: 'Successfully deleted poll.' }
        else
            render status: :unprocessable_entity, json: { errors:
            poll.errors.full_messages }
        end
    end

    def vote
        if poll
            selected_option = params[:selected_option]
            update_poll(selected_option)
            render status: :ok, json: { poll: poll, updated_polls: eval(poll.polls) }
        else
            render status: :unprocessable_entity, json: {
                errors: poll.errors.full_messages.to_sentence
            }
        end
    end

    def update_poll(selected_option)
        poll_object =  eval(poll.polls)
        poll_object[selected_option] = poll_object[selected_option] + 1 
        poll.polls = poll_object
        poll.save
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
