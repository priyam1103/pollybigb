class CreatePoll < ActiveRecord::Migration[6.1]
  def change
    create_table :polls do |t|
      t.string :title, null:false
      t.string :option1, null:false
      t.string :option2, null:false
      t.string :option3, null:false
      t.string :option4, null:false
      t.string :polls
      t.timestamps
    end
  end
end
