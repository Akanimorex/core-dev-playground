import {LoadingOutlined, PoweroffOutlined} from '@ant-design/icons';
import {Alert, Button, Col, Space, Statistic} from 'antd';
import {useEffect, useState} from 'react';

import {getValue} from 'components/core/challenges';
import {useGlobalState} from 'context';
import {getInnerState} from 'utils/context';

const Getter = () => {
  const {state, dispatch} = useGlobalState();
  const {contractId} = getInnerState(state);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [contractNumber, setContractNumber] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (contractNumber) {
      dispatch({
        type: 'SetIsCompleted',
      });
    }
  }, [contractNumber, setContractNumber]);

  const getContractValue = async () => {
    setFetching(true);
    setError(undefined);
    setContractNumber(undefined);
    const {error, value} = await getValue(contractId);
    if (error) {
      setError(error);
    } else {
      setContractNumber(value);
    }
    setFetching(false);
  };

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={getContractValue}
          loading={fetching}
          size="large"
        >
          Get Value
        </Button>
        {fetching && <LoadingOutlined style={{fontSize: 24}} spin />}
        {!fetching && (
          <Alert
            showIcon
            type="success"
            message={<Statistic value={contractNumber as string} />}
          />
        )}
        {error && <Alert message={error} type="error" showIcon />}
      </Space>
    </Col>
  );
};

export default Getter;
