import Authorize from "../../../src/application/usecase/authorize/Authorize";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import app from "../../../src/infra/http/Router";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

let httpClient: AxiosAdapter;
let server: any;
let authorization: string;

beforeAll(() => {
  server = app.listen(PORT);
  process.on("uncaughtException", (error, origin) => {
    console.log(`\n${origin} signal received: \n${error}`);
  });

  process.on("unhandledRejection", (error) => {
    console.log(`\nunhandledRejection signal received: \n${error}`);
  });
  httpClient = new AxiosAdapter();
});

beforeEach(async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorizeFacade = baasFactory.createAuthorizeFacade();
  const authorize = new Authorize(authorizeFacade);
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "51680002000100");
  authorization = `Bearer ${data.token}`;
});

describe("Authorize", () => {
  test("It should be able to get token", async () => {
    const { statusCode } = await httpClient.post(BASE_URL + "/authorize", {
      id: "41b44ab9a56440.teste.celcoinapi.v5",
      document: "35914746817",
    });
    expect(statusCode).toBe(200);
  });

  test("It should be able to list available countries", async () => {
    const { statusCode } = await httpClient.get(
      BASE_URL + "/international/countries",
      {
        page: 1,
      },
      { authorization }
    );
    expect(statusCode).toBe(200);
  });

  test("It should be able to consult international values", async () => {
    const { statusCode } = await httpClient.get(
      BASE_URL + "/international/values",
      {
        countryCode: 509,
        phoneNumber: 48227030,
      },
      { authorization }
    );
    expect(statusCode).toBe(200);
  });

  test("It should be able to consult national providers", async () => {
    const { statusCode } = await httpClient.get(
      BASE_URL + "/national/providers",
      {
        stateCode: 13,
      },
      { authorization }
    );
    expect(statusCode).toBe(200);
  });

  test("It should be able to consult national values", async () => {
    const { statusCode } = await httpClient.get(
      BASE_URL + "/national/values",
      {
        stateCode: 11,
        providerId: 2125,
      },
      { authorization }
    );
    expect(statusCode).toBe(200);
  });

  test("It should be able to make a international recharge", async () => {
    const { statusCode } = await httpClient.post(
      BASE_URL + "/international/recharge",
      {
        value: 85.99,
        productId: 5,
        phone: {
          number: 48227030,
          countryCode: 509,
        },
      },
      { authorization }
    );
    expect(statusCode).toBe(200);
  });

  test("It should be able to make a national recharge", async () => {
    const { statusCode } = await httpClient.post(
      BASE_URL + "/national/recharge",
      {
        value: 85.99,
        providerId: 2125,
        phone: {
          stateCode: 15,
          number: 993134307,
          countryCode: 55,
        },
      },
      { authorization }
    );
    expect(statusCode).toBe(200);
  });
});

afterAll(() => {
  server.close();
});
