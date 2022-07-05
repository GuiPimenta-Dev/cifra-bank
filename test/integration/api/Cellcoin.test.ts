import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import app from "../../../src/main";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}/v1`;

let httpClient: AxiosAdapter;
let server: any;

beforeAll(() => {
  server = app.listen(PORT);
  httpClient = new AxiosAdapter();
});

test("It should be able to get token", async () => {
  const response = await httpClient.post(BASE_URL + "/authorize", {
    id: "41b44ab9a56440.teste.celcoinapi.v5",
    document: "35914746817",
  });
  expect(response).toHaveProperty("token");
});

afterAll(() => {
  server.close();
});
