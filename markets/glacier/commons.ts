import BigNumber from 'bignumber.js';
import {
  oneEther,
  oneRay,
  oneFiat,
  RAY,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
} from '../../helpers/constants';
import { ICommonConfiguration, ePolygonNetwork } from '../../helpers/types';

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ATokenNamePrefix: 'Glacier Fiat Market',
  StableDebtTokenNamePrefix: 'Glacier Fiat Market stable debt',
  VariableDebtTokenNamePrefix: 'Glacier Fiat Market variable debt',
  SymbolPrefix: '',
  ProviderId: 0, // Overriden in index.ts
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '5848466240000000',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96',
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    AaveReferral: '0',
  },

  // ----------------
  // COMMON PROTOCOL PARAMS ACROSS POOLS AND NETWORKS
  // ----------------

  Mocks: {
    AllAssetsInitialPrices: {
      AAVE: oneEther.multipliedBy('0.003620948469').toFixed(),
      BAT: oneEther.multipliedBy('0.00137893825230').toFixed(),
      BUSD: oneEther.multipliedBy('0.00736484').toFixed(),
      DAI: oneEther.multipliedBy('0.00369068412860').toFixed(),
      ENJ: oneEther.multipliedBy('0.00029560').toFixed(),
      KNC: oneEther.multipliedBy('0.001072').toFixed(),
      LINK: oneEther.multipliedBy('0.009955').toFixed(),
      MANA: oneEther.multipliedBy('0.000158').toFixed(),
      MKR: oneEther.multipliedBy('2.508581').toFixed(),
      REN: oneEther.multipliedBy('0.00065133').toFixed(),
      SNX: oneEther.multipliedBy('0.00442616').toFixed(),
      SUSD: oneEther.multipliedBy('0.00364714136416').toFixed(),
      TUSD: oneEther.multipliedBy('0.00364714136416').toFixed(),
      UNI: oneEther.multipliedBy('0.00536479').toFixed(),
      USDC: oneEther.multipliedBy('0.00367714136416').toFixed(),
      USDT: oneEther.multipliedBy('0.00369068412860').toFixed(),
      WETH: oneEther.toFixed(),
      WBTC: oneEther.multipliedBy('47.332685').toFixed(),
      YFI: oneEther.multipliedBy('22.407436').toFixed(),
      ZRX: oneEther.multipliedBy('0.001151').toFixed(),
      UniDAIWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniWBTCWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniAAVEWETH: oneEther.multipliedBy('0.003620948469').toFixed(),
      UniBATWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniDAIUSDC: oneEther.multipliedBy('22.407436').toFixed(),
      UniCRVWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniLINKWETH: oneEther.multipliedBy('0.009955').toFixed(),
      UniMKRWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniRENWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniSNXWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniUNIWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniUSDCWETH: oneEther.multipliedBy('22.407436').toFixed(),
      UniWBTCUSDC: oneEther.multipliedBy('22.407436').toFixed(),
      UniYFIWETH: oneEther.multipliedBy('22.407436').toFixed(),
      BptWBTCWETH: oneEther.multipliedBy('22.407436').toFixed(),
      BptBALWETH: oneEther.multipliedBy('22.407436').toFixed(),
      WMATIC: oneEther.multipliedBy('0.003620948469').toFixed(),
      STAKE: oneEther.multipliedBy('0.003620948469').toFixed(),
      xSUSHI: oneEther.multipliedBy('0.00913428586').toFixed(),
      USD: '5848466240000000',
      // currently CLP/ETH is not supported by Chainlink instead we use CLP/USD
      // GlacierOracle calculate gCLP/ETH using the pair ETH/USD
      // This price is expressed in fiat terms
      gETH: oneFiat.multipliedBy('1809.67804543').toFixed(),
      gCLP: oneFiat.multipliedBy('0.001319').toFixed(),
    },
  },
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    gCLP: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    gETH: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [ePolygonNetwork.mumbai]: undefined,
    [ePolygonNetwork.matic]: undefined,
  },
  PoolAdminIndex: 0,
  EmergencyAdminIndex: 0,
  EmergencyAdmin: {
    [ePolygonNetwork.mumbai]: undefined,
    [ePolygonNetwork.matic]: undefined,
  },
  LendingPool: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingPoolConfigurator: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  ProviderRegistry: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  ProviderRegistryOwner: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingRateOracle: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  LendingPoolCollateralManager: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  TokenDistributor: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  WethGateway: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  AaveOracle: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  FallbackOracle: {
    [ePolygonNetwork.mumbai]: ZERO_ADDRESS,
    [ePolygonNetwork.matic]: ZERO_ADDRESS,
  },
  ChainlinkAggregator: {
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
  ReserveAssets: {
    [ePolygonNetwork.matic]: {},
    [ePolygonNetwork.mumbai]: {},
  },
  ReservesConfig: {},
  ATokenDomainSeparator: {
    [ePolygonNetwork.mumbai]: '',
    [ePolygonNetwork.matic]: '',
  },
  WETH: {
    [ePolygonNetwork.mumbai]: '0xe2dEB456E0Fd8EF80E398d54152a5262D46a3cb8', // replace for local deployment
    [ePolygonNetwork.matic]: ZERO_ADDRESS,
  },
  WrappedNativeToken: {
    [ePolygonNetwork.mumbai]: ZERO_ADDRESS,
    [ePolygonNetwork.matic]: ZERO_ADDRESS,
  },
  ReserveFactorTreasuryAddress: {
    [ePolygonNetwork.mumbai]: '0x334D7A6A8a874464BAAd71cEb98C7f16C8B6a720', // replace for local deployment
    [ePolygonNetwork.matic]: ZERO_ADDRESS,
  },
  IncentivesController: {
    [ePolygonNetwork.mumbai]: ZERO_ADDRESS,
    [ePolygonNetwork.matic]: ZERO_ADDRESS,
  },
};
