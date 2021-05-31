require 'test_helper'

class UserTest < ActiveSupport::TestCase
  attr_accessor :user
  def setup
    @user = User.new(name: 'Jhon Doe',
                     email: 'jhon@gmail.com',
                     password: 'welcome',
                     password_confirmation: 'welcome')
  end

  def test_user_should_be_not_be_valid_without_name
    user.name = ''
    assert_not user.valid?
    assert_equal ["Name can't be blank"], user.errors.full_messages
  end

  def test_user_password_and_confirm_password_to_be_same
    user.password = 'welcome'
    user.password_confirmation = 'wel'
    assert_not user.valid?
    assert_equal ["Password confirmation doesn't match Password"], user.errors.full_messages
  end

  def test_user_should_have_a_mail_id
    user.email = ''
    assert_not user.valid?
    assert_equal ["Email can't be blank", "Email is invalid"], user.errors.full_messages
  end

  def test_valid_user
    user.name = 'Jhon Doe'
    user.email = 'jhon@gmail.com'
    user.password = 'welcome'
    user.password_confirmation = 'welcome'
    assert_not_nil user.name
    assert user.valid?
  end
  
end