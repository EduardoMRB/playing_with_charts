require 'yaml'
require 'mongo'
require 'json'

module PhoneCount
  include Mongo

  CONFIG_PATH = File.join(
    File.dirname(__FILE__), 
    '../config/database.yml'
  )

  def self.db
    db = YAML.load_file(CONFIG_PATH)
    MongoClient.new(db["database"]["host"])
      .db(db["database"]["database"])
  end

  class Event
    attr_reader :quantity, :date
    def initialize(params)
      @quantity = params["quantity"]
      @date = params["date"]
    end

    def to_hash
      { quantity: @quantity, date: @date }
    end
  end

  class EventDataMapper
    def initialize(collection=PhoneCount.db["event"])
      @collection = collection
    end

    def insert(event)
      @collection.insert(event.to_hash)
    end

    def find_by_date(timestamp)
      start, end_date = date_range_from_timestamp(timestamp)
      events = @collection.find({ date: { "$gte" => start, "$lt" => end_date }}).to_a

      events.map { |event| Event.new(event) } unless events.empty?
    end

    private 
      
      def date_range_from_timestamp(timestamp)
        start = Time.new(timestamp.year, timestamp.month, timestamp.day)
        end_date = Time.new(timestamp.year, timestamp.month, timestamp.day + 1)
        [start, end_date]
      end
  end
end
