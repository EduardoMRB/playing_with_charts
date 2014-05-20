require 'spec_helper'

describe PhoneCount do
  describe ".db" do
    it "should return an instance of MongoClient" do
      PhoneCount.db.should 
        be_an_instance_of(Mongo::MongoClient)
    end
  end
end

describe PhoneCount::Event do
  before :each do
    time = Time.now.utc
    allow(Time).to receive(:now) { time }
    params = { "quantity" => 2, "date" => -> () { Time.now }.() } 
    @event = PhoneCount::Event.new(params)
  end

  it "should instantiate by hash" do
    @event.should
      be_an_instance_of(PhoneCount::Event)
  end

  it "should retrieve right attributes" do
    @event.quantity.should == 2
    @event.date.should == Time.now
  end

  it "should return hash with attributes" do
    expected = { quantity: 2, date: Time.now }
    @event.to_hash.should == expected
  end
end

describe PhoneCount::EventDataMapper do
  before :each do
    @db = Mongo::MongoClient.new("localhost").db("phone_count_test")
    @event_coll = @db.collection("event")
    params = { "quantity" => 2, "date" => -> () { Time.now }.() } 
    @event = PhoneCount::Event.new(params)

    @mapper = PhoneCount::EventDataMapper.new(@event_coll)
  end

  after :each do
    @db.collection("event").drop
  end

  describe "#find_by_date" do
    it "should find event by date" do
      Timecop.freeze(Chronic.parse('now')) do
        @mapper.insert(@event)
        event = @mapper.find_by_date(Time.now)
      end
    end
  end

  describe "#insert" do
    it "should insert event correclty" do
      @mapper.insert(@event)
      @event_coll.find_one.should have(3).items
      @event_coll.find.should have(1).item
    end

    context "it has an event registered for the same day" do
      it "should return 2 events" do
        @mapper.insert(@event)
        @mapper.insert(@event)
        events = @mapper.find_by_date(Time.now)
        events.should have(2).items
      end
    end
  end

  describe "#find_all" do
    it "'s items should be an instance of Event" do
      @mapper.insert(@event)
      @mapper.insert(@event)
      @mapper.insert(@event)

      @mapper.find_all.each do |event|
        event.should be_an_instance_of(PhoneCount::Event)
      end
    end

    it "should retrieve all inserted events" do
      @mapper.insert(@event)
      @mapper.insert(@event)
      @mapper.insert(@event)

      @mapper.find_all.should have(3).items
    end
  end
end
