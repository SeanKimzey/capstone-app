require 'unirest'

# response = Unirest.post("localhost:3000/users",
#   parameters: {
#     first_name: "Bob",
#     last_name: "Bob",
#     email: "bob@mk.com",
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
      email: "bob@mk.com",
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
    sample_id: 2,
    quantity: 1
  }
)

p response.body



response = Unirest.get("localhost:3000/carted_samples")

p response.body








