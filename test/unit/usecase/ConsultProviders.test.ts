import ConsultProviders from "../../../src/application/usecase/consult_providers/ConsultProviders";
import FakeConsultProvidersRequester from "../../fake/FakeConsultProvidersRequester";

test("It should be able to consult providers", async () => {
  const fakeConsultProvidersRequester = new FakeConsultProvidersRequester();
  const consultProviders = new ConsultProviders(fakeConsultProvidersRequester);
  const response = await consultProviders.execute("12345678910", 13);
  const expectedResults = {
    providers: [
      {
        category: 1,
        name: "Correios",
        providerId: 2130,
        RegionaisnameProvider: [],
        TipoRecarganameProvider: 2,
        maxValue: 0.0,
        minValue: 0.0,
      },
      {
        category: 1,
        name: "Embratel",
        providerId: 2090,
        RegionaisnameProvider: [],
        TipoRecarganameProvider: 1,
        maxValue: 0.0,
        minValue: 0.0,
      },
    ],
  };
  expect(response).toEqual(expectedResults);
});
