require "test_helper"

class PollsControllerTest < ActionDispatch::IntegrationTest
  test "to_create_a_polll" do
    poll = Poll.new
    assert_not poll.save
    assert_equal ["Title can't be blank", "Option1 can't be blank", "Option2 can't be blank", "Option3 can't be blank", "Option4 can't be blank"], poll.errors.full_messages
  end
end
