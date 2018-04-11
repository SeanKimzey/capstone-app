require 'unirest'

response = Unirest.post("localhost:3000/users",
  parameters: {
    first_name: "Mary Kate",
    last_name: "Carrick",
    email: "mk@mk.com",
    password: "password",
    password_confirmation: "password"
  }
)

user = response.body

p response.body









