class Group
  include Mongoid::Document

  field :groupname,   :type => String
  field :permission,  :type => Hash
  field :status,      :type => Integer, default: 0
  field :description, :type => String
  
  include Mongoid::Timestamps

  has_many :users
  
  validates_presence_of   :groupname
  validates_uniqueness_of :groupname
  validates_length_of     :groupname, :within => 3..20, allow_blank: true
end