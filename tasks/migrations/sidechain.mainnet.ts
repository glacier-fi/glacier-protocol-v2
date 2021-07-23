import { task } from 'hardhat/config';
import { checkVerification } from '../../helpers/etherscan-verification';
import { ConfigNames } from '../../helpers/configuration';
import { printContracts } from '../../helpers/misc-utils';
import { eNetwork, ePolygonNetwork } from '../../helpers/types';
import { getLendingPoolAddressesProvider } from '../../helpers/contracts-getters';

task('sidechain:mainnet', 'Deploy market at sidechain')
  .addParam('pool', `Market pool configuration, one of ${Object.keys(ConfigNames)}`)
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addFlag('skipRegistry', 'Skip addresses provider registration at Addresses Provider Registry')
  .setAction(async ({ verify, pool, skipRegistry }, DRE) => {
    const POOL_NAME = pool;
    await DRE.run('set-DRE');

    // Prevent loss of gas verifying all the needed ENVs for Etherscan verification
    if (verify) {
      checkVerification();
    }

    console.log('Migration started\n');

    console.log('1. Deploy address provider');
    await DRE.run('full:deploy-address-provider', { pool: POOL_NAME, skipRegistry });

    console.log('2. Deploy lending pool');
    await DRE.run('full:deploy-lending-pool', { pool: POOL_NAME });

    if (<eNetwork>DRE.network.name == ePolygonNetwork.mumbai) {
      console.log('3. Deploy Mock Oracle');
      const addressesProvider = await getLendingPoolAddressesProvider();

      await DRE.run('dev:deploy-glacier-oracle', {
        pool: POOL_NAME,
        addressesprovider: addressesProvider.address,
      });

    } else {
      console.log('3. Deploy oracles');
      await DRE.run('full:deploy-oracles', { pool: POOL_NAME });
    }

    console.log('4. Deploy Data Provider');
    await DRE.run('full:data-provider', { pool: POOL_NAME });

    console.log('5. Initialize lending pool');
    await DRE.run('full:initialize-lending-pool', { pool: POOL_NAME });


    console.log('\nFinished migrations');
    printContracts();
  });
