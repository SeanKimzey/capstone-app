user = User.new(first_name: "sean", last_name: "kimzey", email: "sean.kimzey@gmail.com", password: 'foobar')

if user.save
	puts "User created"
else
	puts user.errors
end