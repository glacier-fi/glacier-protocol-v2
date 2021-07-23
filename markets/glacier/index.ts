import { ZERO_ADDRESS } from '../../helpers/constants';
import { IGlacierConfiguration, ePolygonNetwork } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyGCLP,
  strategyGETH,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const GlacierConfig: IGlacierConfiguration = {
  ...CommonsConfig,
  MarketId: 'Glacier Market',
  ProviderId: 4,
  ReservesConfig: {
    gCLP: strategyGCLP,
    gETH: strategyGETH,
  },
  ReserveAssets: {
    [ePolygonNetwork.matic]: {
      gCLP: ZERO_ADDRESS,
      gETH: ZERO_ADDRESS,
    },
    [ePolygonNetwork.mumbai]: {
      // replace for local deployment
      gCLP: '0x233ecA53C91A72Ac76EDf2fcE0840D36f7221084',
      gETH: '0xe2dEB456E0Fd8EF80E398d54152a5262D46a3cb8',
    },
  },
};

export default GlacierConfig;
