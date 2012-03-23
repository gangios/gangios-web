require 'digest/sha1'

class User
	include Mongoid::Document
	include Mongoid::Timestamps

	attr_protected :salt
	
	validates_length_of :username, :within => 3..40
	validates_length_of :password, :within => 5..40
	validates_presence_of :password_confirmation, :group_id
	validates_uniqueness_of :username
	validates_confirmation_of :password

	before_save :save_hashed_password

	field :username, type: String
	field :password, type: String
	field :salt, type: String
	field :status, type: Integer, default: 0
	field :description, type: String

	belongs_to :group


  def self.authenticate(username, password)
    u = find(:first, conditions: {username: username})
	  return nil if u.nil?
	  return u if User.encrypt(password, u.salt) == u.password
	  nil
  end

	protected

	def save_hashed_password
		self.salt = User.random_string(10) if !self.salt?
		self.password = User.encrypt(self.password, self.salt)
	end

	def groupname=(groupname)
		g = Group.find(:first, conditions: {groupname: groupname})
		if g.nil? then
			self.errors.add :groupname, "is not valid"
			self.group_id = nil
		else
			self.group_id = g._id
		end
	end

	def self.random_string(len)
		# generate a random password consisting of strings and digits
		chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a

		newpass = ""
		len.times do |i|
			newpass << chars[rand(chars.size-1)]
		end

		return newpass
	end

	def self.encrypt(pass, salt)
		Digest::SHA1.hexdigest(pass+salt)
	end

end
