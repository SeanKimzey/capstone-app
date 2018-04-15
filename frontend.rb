require 'unirest'


# create a new user 

# response = Unirest.post("localhost:3000/users",
#   parameters: {
#     first_name: "Charles",
#     last_name: "Sob",
#     email: "charles@s.com",
#     password: "password",
#     password_confirmation: "password"
#   }
# )

# user = response.body
# p response.body


response = Unirest.post(
  "http://localhost:3000/user_token",
  parameters: {
    auth: {
      email: "charles@s.com",
      password: "password"
    }
  }

  )

jwt = response.body["jwt"]

Unirest.default_header("Authorization", "Bearer #{jwt}")

p "*" * 50
p response.body
p "*" * 50





# add a sample to your cart

response = Unirest.post("localhost:3000/carted_samples",
  parameters: {
    sample_id: 5,
    quantity: 1
  }
)

p response.body



# show current users carted samples 

response = Unirest.get("localhost:3000/carted_samples")

p response.body








