class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :validatable, :token_authenticatable, :encryptable,
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  ## Database authenticatable
  field :username,           :type => String, :null => false, :default => ""
  field :encrypted_password, :type => String, :null => false, :default => ""

  ## Custom fields
  field :status,      :type => Integer, default: 0
  field :description, :type => String

  ## Timestamps create_at & update_at
  include Mongoid::Timestamps

  ## Recoverable
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time

  ## Rememberable
  field :remember_created_at, :type => Time

  ## Trackable
  field :sign_in_count,      :type => Integer, :default => 0
  field :current_sign_in_at, :type => Time
  field :last_sign_in_at,    :type => Time
  field :current_sign_in_ip, :type => String
  field :last_sign_in_ip,    :type => String

  belongs_to :group

  validates_presence_of     :username
  validates_presence_of     :password, on: :create
  # , :group_id
  validates_uniqueness_of   :username
  # validates_presence_of :password_confirmation
  validates_length_of       :username, :within => 3..20, allow_blank: true
  validates_length_of       :password, :minimum => 3, allow_blank: true, on: :create
  validates_confirmation_of :password
  validates_associated      :group

  ## Encryptable
  # field :password_salt, :type => String

  ## Confirmable
  # field :confirmation_token,   :type => String
  # field :confirmed_at,         :type => Time
  # field :confirmation_sent_at, :type => Time
  # field :unconfirmed_email,    :type => String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  # field :locked_at,       :type => Time

  ## Token authenticatable
  # field :authentication_token, :type => String
end
