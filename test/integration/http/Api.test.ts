import axios from "axios";

import { createCellcoinFacade } from "../../utils/createFacade";

let token: string;

beforeAll(async () => {
  const cellcoinFacade = await createCellcoinFacade();
  token = `Bearer ${cellcoinFacade.token}`;
});

test("Must authorize through the api", async function () {
  const response = await axios({
    url: "http://localhost:3000/authorize",
    method: "post",
    data: {
      id: "41b44ab9a56440.teste.celcoinapi.v5",
      cpf: "",
    },
  });
  const { data } = response;
  expect(data).toHaveProperty("token");
});

test("Must consult available countries through the api", async function () {
  const response = await axios({
    url: "http://localhost:3000/consult/internationalRecharge/availableCountries",
    method: "get",
    params: {
      page: 1,
    },
    headers: {
      Authorization: token,
    },
  });
  const { data } = response;
  expect(data).toHaveProperty("countries");
});
