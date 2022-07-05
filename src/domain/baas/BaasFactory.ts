import BaasFacadeInterface from "./BaasFacade";

export default interface BaasFactoryInterface {
  createCellcoinFacade(): BaasFacadeInterface;
}
