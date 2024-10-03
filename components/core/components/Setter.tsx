import {PoweroffOutlined} from '@ant-design/icons';
import {Alert, Button, Col, Input, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';

import {setValue} from 'components/core/challenges';
import {getCoreTxExplorerURL} from 'components/core/lib';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const {Text} = Typography;

const Setter = () => {
  const {state, dispatch} = useGlobalState();
  const {contractId} = getInnerState(state);

  const [inputGreet, setInputGreet] = useState<string>('Hello, World');
  const [fetching, setFetching] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (txHash) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [txHash, setTxHash]);

  const setContractValue = async () => {
    setFetching(true);
    setError(undefined);
    setTxHash(null);
    const {error, hash} = await setValue(contractId, inputGreet);
    if (error) {
      setError(error);
    } else {
      setTxHash(hash);
    }
    setFetching(false);
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal">
          <Input
            placeholder="Enter a Name to Greet"
            onChange={(e) => setInputGreet(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={setContractValue}
            loading={fetching}
            size="large"
          >
            Set Name to Greet
          </Button>
        </Space>
        {txHash ? (
          <Alert
            showIcon
            type="success"
            message={<Text strong>Transaction confirmed!</Text>}
            description={
              <a
                href={getCoreTxExplorerURL(txHash)}
                target="_blank"
                rel="noreferrer"
              >
                View on Core Scan
              </a>
            }
          />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : null}
      </Space>
    </Col>
  );
};

export default Setter;
