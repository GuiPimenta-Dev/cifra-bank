import Broker from "../../../src/infra/broker/Broker";
import FakeDomainEvent from "./fake/FakeDomainEvent";
import FakeHandler from "./fake/FakeHandler";

let broker: Broker;

beforeEach(function () {
  broker = new Broker();
});

test("Broker must be created with empty list of handlers", () => {
  expect(broker.handlers).toHaveLength(0);
});

test("Broker should be able to register a new handler", () => {
  const fakeHandler = new FakeHandler();
  broker.register(fakeHandler);
  expect(broker.handlers).toHaveLength(1);
  expect(broker.handlers[0].name).toEqual("FakeDomainEvent");
});

test("Broker should be able to publish a new domain event", () => {
  const fakeHandler = new FakeHandler();
  broker.register(fakeHandler);
  const fakeDomainEvent = new FakeDomainEvent();
  broker.publish(fakeDomainEvent);
  expect(fakeHandler.fakeRepository).toHaveLength(1);
  expect(fakeHandler.fakeRepository[0].name).toBe("FakeDomainEvent");
});
