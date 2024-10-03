import {Core} from 'components';
import Layout from 'components/shared/Layout';
import NoSSR from 'react-no-ssr';
import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.CORE);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;

  return (
    <NoSSR>
      <Layout markdown={markdown} chain={chain}>
        <Core />
      </Layout>
    </NoSSR>
  );
};

export default Protocol;
