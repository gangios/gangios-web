require 'yaml'

config = {}

filepath = File.join(File.dirname(__FILE__), "..", "*.yml")
Dir.glob(filepath).each do |file|
	title = File.basename file, ".yml"
	config[title] = YAML::load open file
end

GangiosConfig = config