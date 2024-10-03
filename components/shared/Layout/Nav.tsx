import {Row, Space} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

import {useGlobalState} from 'context';
import {HEADER_HEIGHT} from 'lib/constants';
import Image from 'next/image';
import logoPNG from 'public/core_logo_white.png';
import {getChainColors} from 'utils/colors';
import {getChainId, getChainLabel} from 'utils/context';

const Nav = () => {
  const {state} = useGlobalState();
  const currentChainId = getChainId(state);
  const chainLabel = getChainLabel(state);
  const {primaryColor, secondaryColor} = getChainColors(currentChainId);

  return (
    <StyledNav
      primary_color={primaryColor}
      align="middle"
      justify="space-between"
    >
      <Row align="middle">
        <ChainTitle direction="horizontal" secondary_color={secondaryColor}>
          <ImageWrapper>
            <Image
              src={logoPNG}
              alt="Core Developer Playground"
              height={65}
              width={70}
            />
          </ImageWrapper>
          <Link href="/">Core Developer Playground</Link>
        </ChainTitle>
      </Row>
    </StyledNav>
  );
};

const StyledNav = styled(Row)<{primary_color: string}>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 10;
  padding: 0 40px;
  background: ${({primary_color}) => primary_color};
  border-bottom: solid 2px black;
`;

const ChainTitle = styled(Space)<{secondary_color: string}>`
  display: flex;
  align-items: center; /* Center items vertically */
  color: ${({secondary_color}) => secondary_color};
  font-size: 24px;
  font-weight: 600;
  margin-left: 24px;

  a {
    color: black;
    opacity: 1;
    text-decoration: none;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center; /* Center the image vertically */
  margin-right: 2px; /* Optional: Add some space between the image and the text */
`;

export default Nav;
