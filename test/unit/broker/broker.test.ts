import Broker from "../../../src/infra/broker/Broker";
import FakeDomainEvent from "../../utils/fake/broker/FakeDomainEvent";
import FakeHandler from "../../utils/fake/broker/FakeHandler";

let broker: Broker;

beforeEach(function () {
  broker = new Broker();
});

test("Broker must be created with empty list of handlers", () => {
  expect(broker.handlers).toHaveLength(0);
});

test("Broker should be able to register a new handler", () => {
  const fakeHandler = new FakeHandler();
  fakeHandler.setName("FakeDomainEventHappened");
  broker.register(fakeHandler);
  expect(broker.handlers).toHaveLength(1);
  expect(broker.handlers[0].name).toEqual("FakeDomainEventHappened");
});

test("Broker should be able to publish a domain event", () => {
  const fakeHandler = new FakeHandler();
  fakeHandler.setName("FakeDomainEventHappened");
  broker.register(fakeHandler);
  broker.publish(new FakeDomainEvent());
  expect(fakeHandler.fakeRepository).toHaveLength(1);
  expect(fakeHandler.fakeRepository[0].name).toBe("FakeDomainEventHappened");
});
