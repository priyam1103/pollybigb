require "test_helper"

class PollTest < ActiveSupport::TestCase
  attr_accessor :poll
  
  def setup
    @poll = Poll.new
  end

  def test_value_of_title_assigned
    poll = Poll.new(title: "Title assigned for testing")
    assert_equal "Title assigned for testing", poll.title
  end

  def test_user_poll_should_not_be_valid_without_options
    poll.title = 'What is your name?'
    assert_not poll.valid?
    assert_equal ["Option1 can't be blank", "Option2 can't be blank", "Option3 can't be blank", "Option4 can't be blank"], poll.errors.full_messages
  end

  def test_user_poll_should_not_be_valid_without_title
    poll.title = ''
    poll.option1 = "a"
    poll.option2 = "b"
    poll.option3 = "c"
    poll.option4 = "d"
    assert_not poll.valid?
    assert_equal ["Title can't be blank"], poll.errors.full_messages
  end

  def test_user_poll_should_not_be_valid
    poll.title = 'Title to test.'
    poll.option1 = "a"
    poll.option2 = "b"
    poll.option3 = "c"
    poll.option4 = "d"
    assert poll.valid?
  end

end