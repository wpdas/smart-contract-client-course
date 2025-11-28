import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import naxios, { Network } from "@wpdas/naxios";

import { CONTRACT_ID, NETWORK } from "@/constants/envs";

// Naxios (Contract/Wallet) Instance
export const naxiosInstance = new naxios({
  contractId: CONTRACT_ID,
  network: NETWORK as Network,
  walletSelectorModules: [setupMyNearWallet()],
});

/**
 * NEAR Wallet API
 */
export const walletApi = naxiosInstance.walletApi();

/**
 * Near You Contract API
 */
export const contractApi = naxiosInstance.contractApi({
  contractId: CONTRACT_ID,
});
