require 'time'

task :post, :post do |t, args|
	now = Time.now.utc.iso8601()
	name = args['post'].sub!(" ", "_")
	File.open("posts/#{name}_#{now}.md", "w+") do |file| 
		file.write("[Insert Title Here](/post/#{args['post']})\n====================\n\nPost content goes here.") 
	end
end

task :rebut, :post, :rebuttal do |t, args|
	#TODO add rebuttal link to the end of existing post
end