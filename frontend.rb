require 'unirest'

response = Unirest.delete("localhost:3000/samples/3")

puts JSON.pretty_generate(response.body)