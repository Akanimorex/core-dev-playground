import Head from 'next/head';

import {useGlobalState} from 'context';
import {getChainLabel} from 'utils/context';

export default function HeadLayout() {
  const {state} = useGlobalState();
  const label = getChainLabel(state);
  return (
    <Head>
      <title>{`Core Developer Playground`}</title>
      <meta name="description" content="Core Web3 Education Courses" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
