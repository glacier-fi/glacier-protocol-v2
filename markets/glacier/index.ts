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
      gCLP: ZERO_ADDRESS,
      gETH: ZERO_ADDRESS,
    },
  },
};

export default GlacierConfig;
