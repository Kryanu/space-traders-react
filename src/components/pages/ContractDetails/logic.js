import { API } from "../../../api/service";
import { filterRecordByHandle } from "../../../api/pocketbase";
export const retrieveContractDetails = async (token, contractId, setDetails) => {
    const data = await API.getContract(token, contractId);
    setDetails(data)
}
export const retrieveToken = async (handle, changeToken) => {
    const data = await filterRecordByHandle(handle);
    changeToken(data?.items[0]?.token);
  };