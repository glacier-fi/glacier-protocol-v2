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
      gCLP: '0x4444C8eB3b1D00034812a6b2C58E4082e596e459',
      gETH: '0x69f14358CE529d642F1FC25d3f80Fe7587131943',
    },
    [ePolygonNetwork.mumbai]: {
      // replace for local deployment
      gCLP: '0x09635F643e140090A9A8Dcd712eD6285858ceBef',
      gETH: '0x851356ae760d987E095750cCeb3bC6014560891C',
    },
  },
};

export default GlacierConfig;
