import { API } from '../../../api/service';

export const retrieveContractDetails = async (token, contractId, hooks) => {
  const { setDetails, setIsAccepted, setIsLoading } = hooks;
  setIsLoading(true);
  const data = await API.getContract(token, contractId);
  setDetails(data);
  setIsLoading(false);
  if (data?.accepted) {
    setIsAccepted(true);
  }
};

export const acceptContract = async ({ token, contractId, setIsAccepted }) => {
  try {
    await API.acceptContract(token, contractId);
    setIsAccepted(true);
  } catch (ex) {
    if (setIsAccepted) {
      setIsAccepted(false);
    }
  }
};
