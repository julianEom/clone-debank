import { utils } from 'ethers';
import styled from 'styled-components';

const HistoryEtherLogRow = ({
  value,
  send,
}: {
  value: string;
  send: Boolean;
}) => {
  const ethers = utils.formatEther(value);
  return (
    <StyledRow>
      <div>Ether</div>
      <div>{send && `- ${ethers} ETH`}</div>
      <div className='receive'>{!send && `+ ${ethers} ETH`}</div>
    </StyledRow>
  );
};
export default HistoryEtherLogRow;
const StyledRow = styled.section`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  div:nth-child(1) {
    max-width: 185px;
  }
  div:nth-child(2) {
    width: 155px;
  }
  div:nth-child(3) {
    width: 155px;
  }
  .receive {
    color: #00c087;
  }
`;
