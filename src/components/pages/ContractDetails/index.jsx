import { useEffect, useState } from 'react';
import { userDataStore } from '../../../stores';
import { useLocation } from 'react-router-dom';
import { retrieveContractDetails, retrieveToken } from './logic';
import { ContractList } from './children';
export default function ContractDetails() {
  const { token, changeToken } = userDataStore();
  const [contractDetails, setDetails] = useState(undefined);
  const location = useLocation();
  const [openPaymentsList, setOpenPaymentsList] = useState(false);
  const [openDeliverablesList, setOpenDeliverablesList] = useState(false);
  const { contractId } = location.state;
  useEffect(() => {
    if (!token) {
      retrieveToken('AMD0101', changeToken);
    }
  });

  useEffect(() => {
    if (token && contractId) {
      retrieveContractDetails(token, contractId, setDetails);
    }
  }, [token]);
  console.log(contractDetails);
  return (
    <div>
      {ContractList(
        contractDetails,
        { setOpenDeliverablesList, setOpenPaymentsList },
        { openDeliverablesList, openPaymentsList }
      )}
    </div>
  );
}
