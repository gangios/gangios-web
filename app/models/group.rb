class Group
  include Mongoid::Document
  include Mongoid::Timestamps

	validates_length_of :groupname, :within => 3..40
	validates_uniqueness_of :groupname

  field :groupname, :type => String
  field :permission, :type => Hash
  field :status, :type => Integer, default: 0
  field :description, :type => String

  has_many :users
end
