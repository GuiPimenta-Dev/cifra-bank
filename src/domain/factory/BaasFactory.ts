import BaasFacadeInterface from "../facade/BaasFacade";

export default interface BaasFactoryInterface {
  createCellcoinFacade(): BaasFacadeInterface;
}
