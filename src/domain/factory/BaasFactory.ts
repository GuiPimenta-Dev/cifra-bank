import BaasFacadeInterface from "../facade/BaasFacade";

export default interface BaasFactoryInterface {
  createCellcoinBaas(): BaasFacadeInterface;
}
