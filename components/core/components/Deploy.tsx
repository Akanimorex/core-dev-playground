import {PoweroffOutlined} from '@ant-design/icons';
import {Alert, Button, Col, Input, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import Confetti from 'react-confetti';

import {deploy} from 'components/core/challenges';
import {useGlobalState} from 'context';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Deploy = () => {
  const {state, dispatch} = useGlobalState();
  const {contractId} = getInnerState(state);

  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [address, setAddress] = useState<string | undefined>(contractId);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isDeployed) {
      dispatch({
        type: 'SetInnerState',
        values: [
          {
            [PROTOCOL_INNER_STATES_ID.CONTRACT_ID]: address,
          },
        ],
        isCompleted: true,
      });
    }
  }, [isDeployed, setIsDeployed]);

  const checkDeployment = async () => {
    setFetching(true);
    setIsDeployed(false);
    setError(undefined);
    const {error, status} = await deploy(address as string);
    if (error) {
      setError(error);
    } else {
      setIsDeployed(status as boolean);
    }
    setFetching(false);
  };

  return (
    <Col>
      {isDeployed && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <Text style={{color: 'white'}}>
          Paste the{' '}
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            contract address
          </Text>{' '}
          generated after the deployment:
        </Text>
        <Input
          placeholder="Enter the program address"
          onChange={(e) => setAddress(e.target.value)}
          style={{width: '500px'}}
          //disabled={!!contractId}
          defaultValue={contractId as string}
        />
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={checkDeployment}
          loading={fetching}
          size="large"
          //disabled={!!contractId}
        >
          Check deployment
        </Button>
        {isDeployed ? (
          <>
            <Alert
              message={<Text strong>We found a deployed contract! 🎉</Text>}
              description={
                <Space direction="vertical">
                  <div>The time is come to collect the fruits of our work.</div>
                  <div>
                    Now let&apos;s query the contract to display some revelant
                    information about it&apos;s state. Let&apos;s go do the next
                    step!
                  </div>
                </Space>
              }
              type="success"
              showIcon
            />
          </>
        ) : error ? (
          <Alert
            message={<Text strong>We couldn&apos;t find a contract 😢</Text>}
            description={
              <Space direction="vertical">
                <Text>Are you sure the contract was deployed?</Text>
                <Text code>{error}</Text>
              </Space>
            }
            type="error"
            showIcon
          />
        ) : null}
      </Space>
    </Col>
  );
};

export default Deploy;
