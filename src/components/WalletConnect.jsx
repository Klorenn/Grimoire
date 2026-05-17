import React from 'react';
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowRight } from '../../icons.jsx';

/**
 * Grimoire-styled wallet connect button.
 * Reuses RainbowKit's ConnectButton with custom styling to match the gold pill design.
 */
export function WalletConnect({ className = '', onDark = false }) {
  return (
    <RKConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        if (!mounted) return <button className={`btn-gold !py-2 !px-5 text-sm ${className}`} type="button">Connect <ArrowRight size={14} /></button>;
        return (
          <button
            onClick={openConnectModal}
            className={`btn-gold !py-2 !px-5 text-sm ${className}`}
            type="button"
          >
            {connected ? account.displayName : 'Connect'} <ArrowRight size={14} />
          </button>
        );
      }}
    </RKConnectButton.Custom>
  );
}

/**
 * Simple wallet display for the Hero section.
 */
export function HeroWalletConnect() {
  return (
    <RKConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        if (!mounted) return <span className="btn-gold !py-2 !px-5 text-sm shrink-0">Begin <ArrowRight size={14} /></span>;
        return (
          <button
            onClick={openConnectModal}
            className="btn-gold !py-2 !px-5 text-sm shrink-0"
            type="button"
          >
            {connected ? account.displayName : 'Begin'} <ArrowRight size={14} />
          </button>
        );
      }}
    </RKConnectButton.Custom>
  );
}
