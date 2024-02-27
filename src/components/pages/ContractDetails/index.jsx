import { useEffect, useState } from 'react';
import { userDataStore } from '../../../stores';
import { useLocation } from 'react-router-dom';
import { retrieveContractDetails, acceptContract } from './logic';
import { ContractList } from './children';
import { NavigateButton } from '../../atoms';
import { NavBar } from '../../Layouts';
export default function ContractDetails() {
  const location = useLocation();
  const { token } = userDataStore();
  const { contractId } = location.state;
  const [contractDetails, setDetails] = useState(undefined);
  const [openPaymentsList, setOpenPaymentsList] = useState(false);
  const [openDeliverablesList, setOpenDeliverablesList] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (token && contractId) {
      retrieveContractDetails(token, contractId, {
        setDetails,
        setIsLoading,
        setIsAccepted,
      });
    }
  }, [token]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <NavBar route={'/console'} />
      {ContractList(
        contractDetails,
        { setOpenDeliverablesList, setOpenPaymentsList },
        { openDeliverablesList, openPaymentsList }
      )}
      <NavigateButton
        isRendered={!isAccepted}
        text={'Accept Contract'}
        callBack={acceptContract}
        callBackProps={{ token, contractId }}
        route={'/console'}
      />
    </div>
  );
}
