import axios from "axios";

test("Deve testar a API /orders (POST)", async function () {
  const response = await axios({
    url: "http://localhost:3000/authorize",
    method: "post",
    data: {
      id: "41b44ab9a56440.teste.celcoinapi.v5",
    },
  });
  const { data } = response;
  expect(data).toHaveProperty("token");
});
