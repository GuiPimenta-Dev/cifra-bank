import Broker from "./infra/broker/Broker";
import BaasFactory from "./infra/factory/BaasFactory";
import AxiosAdapter from "./infra/http/adapter/AxiosAdapter";
import ExpressAdapter from "./infra/http/adapter/ExpressAdapter";
import Router from "./infra/http/Router";

const app = new ExpressAdapter();
const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const broker = new Broker();
new Router(app, baasFactory, broker);
app.listen(3000);
