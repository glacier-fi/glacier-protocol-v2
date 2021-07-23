import { utils } from 'ethers';
import { task } from 'hardhat/config';

import { ConfigNames, getWethAddress, loadPoolConfig } from '../../helpers/configuration';
import { ZERO_ADDRESS } from '../../helpers/constants';
import { deployGlacierOracle } from '../../helpers/contracts-deployments';
import {
  getAaveOracle,
  getLendingPoolAddressesProvider,
  getPairsTokenAggregator,
} from '../../helpers/contracts-getters';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { waitForTx } from '../../helpers/misc-utils';
import { getAllAggregatorsAddresses } from '../../helpers/mock-helpers';
import { deployAllMockAggregators } from '../../helpers/oracles-helpers';
import { eNetwork, ICommonConfiguration } from '../../helpers/types';

task('eth', 'Deploy oracles for dev enviroment')
  .addParam('oracle', 'Oracle')
  .addParam('asset', 'Asset')
  .setAction(async ({oracle,asset}, DRE) => {
    await DRE.run('set-DRE');
    const aaveOracle = await getAaveOracle(oracle);
    const price = await aaveOracle.getAssetPrice(asset);
    
    console.log(price.toString(), utils.formatUnits(price, 18));
  });

task('dev:deploy-glacier-oracle', 'Deploy oracles for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .addParam('addressesprovider', `Address of LendingPoolAddressProvider`)
  .setAction(async ({ verify, pool, addressesprovider }, DRE) => {
    await DRE.run('set-DRE');
    const network = <eNetwork>DRE.network.name;
    const poolConfig = loadPoolConfig(pool);
    const {
      Mocks: { AllAssetsInitialPrices },
      ReserveAssets,
    } = poolConfig as ICommonConfiguration;

    const reserveAssets = getParamPerNetwork(ReserveAssets, network);
    const addressesProvider = await getLendingPoolAddressesProvider(addressesprovider);

    Object.keys(AllAssetsInitialPrices).forEach(function (key) {
      if (!reserveAssets.hasOwnProperty(key)) {
        delete AllAssetsInitialPrices[key];
      }
    });

    const mockAggregators = await deployAllMockAggregators(AllAssetsInitialPrices, verify);

    const allAggregatorsAddresses = getAllAggregatorsAddresses(mockAggregators);

    const [tokens, aggregators] = getPairsTokenAggregator(reserveAssets, allAggregatorsAddresses);

    console.log(tokens, aggregators);

    const glacierOracle = await deployGlacierOracle(
      [tokens, aggregators, ZERO_ADDRESS, await getWethAddress(poolConfig)],
      verify
    );

    await waitForTx(await addressesProvider.setPriceOracle(glacierOracle.address));

  });
