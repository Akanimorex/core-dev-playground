import {Col, Row} from 'antd';
import {ReactElement, useEffect, useReducer} from 'react';
import styled from 'styled-components';

import {GlobalContext, globalStateReducer, initGlobalState} from 'context';
import {useLocalStorage} from 'hooks';
import {FOOTER_HEIGHT, GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import {ChainType, LocalStorageStateT, MarkdownForChainIdT} from 'types';
import {colors} from 'utils/colors';
import {
  getChainId,
  isOneColumnStep,
  prepareGlobalState,
  prepareGlobalStateForStorage,
} from 'utils/context';
import Footer from './Footer';
import Head from './Head';
import Nav from './Nav';
import Sidebar from './Sidebar';

type LayoutPropT = {
  children: ReactElement;
  chain: ChainType;
  markdown: MarkdownForChainIdT;
};

const Layout = ({children, chain, markdown}: LayoutPropT) => {
  const [storageState, setStorageState] =
    useLocalStorage<LocalStorageStateT>('figment');
  const newGlobalState = prepareGlobalState(
    storageState,
    initGlobalState,
    chain.id,
  );
  const [state, dispatch] = useReducer(globalStateReducer, newGlobalState);

  useEffect(() => {
    setStorageState(prepareGlobalStateForStorage(state));
  }, [state, dispatch]);

  const isStepOneColumn = isOneColumnStep(state);
  const currentStepId = getChainId(state);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <Head />
      <Col>
        <Nav />
        <BelowNav>
          <LeftPanel
            span={isStepOneColumn ? 24 : GRID_LAYOUT[0]}
            key={currentStepId}
          >
            <Sidebar markdown={markdown} />
          </LeftPanel>
          {!isStepOneColumn && (
            <RightPanel span={GRID_LAYOUT[1]}>{children}</RightPanel>
          )}
        </BelowNav>
        <Footer />
      </Col>
    </GlobalContext.Provider>
  );
};

const heightOffset = `${FOOTER_HEIGHT + HEADER_HEIGHT}px`;

const BelowNav = styled(Row)`
  margin-top: ${HEADER_HEIGHT}px;
  position: fixed;
  width: 100vw;
  background: ${colors.darkBackground};
`;

const LeftPanel = styled(Col)`
  position: relative;
  padding: 40px;
  background: ${colors.darkBackground};
  overflow: scroll;
  height: calc(100vh - ${heightOffset});
`;

const RightPanel = styled(Col)`
  overflow: scroll;
  height: calc(100vh - 170px);
  padding: 120px 60px 20px 60px;
  border-left: 0.5px solid white;
`;

export default Layout;
