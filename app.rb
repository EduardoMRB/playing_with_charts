require 'sinatra'
require 'json'
require_relative 'lib/phone_count'

before do
  content_type :json
  headers 'Access-Control-Allow-Origin' => '*'
end

options '/event' do

end

post '/event' do
  event = Event.new({ 
    quantity: params[:quantity],
    date: params[:date]
  })

  EventDataMapper.insert(event)
end
