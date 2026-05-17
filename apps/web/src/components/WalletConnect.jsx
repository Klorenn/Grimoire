'use client';
import React from 'react';
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowRight } from '../app/icons.jsx';

export function WalletConnect({ className = '', onDark = false, label = 'Connect' }) {
  return (
    <RKConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        if (!mounted) return <button className={`btn-gold !py-2 !px-5 text-sm ${className}`} type="button">{label} <ArrowRight size={14} /></button>;
        if (!connected) return (
          <button onClick={openConnectModal} className={`btn-gold !py-2 !px-5 text-sm ${className}`} type="button">
            {label} <ArrowRight size={14} />
          </button>
        );
        return (
          <a href="#/vault" className={`btn-gold !py-2 !px-5 text-sm ${className}`} style={{ textDecoration: 'none' }}>
            {account.displayName} <ArrowRight size={14} />
          </a>
        );
      }}
    </RKConnectButton.Custom>
  );
}

export function HeroWalletConnect({ label = 'Begin' }) {
  return (
    <RKConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        if (!mounted) return <span className="btn-gold !py-3 !px-6 text-base">{label} <ArrowRight size={16} /></span>;
        if (!connected) return (
          <button onClick={openConnectModal} className="btn-gold !py-3 !px-6 text-base" type="button">
            {label} <ArrowRight size={16} />
          </button>
        );
        return (
          <a href="#/vault" className="btn-gold !py-3 !px-6 text-base" style={{ textDecoration: 'none' }}>
            {label} <ArrowRight size={16} />
          </a>
        );
      }}
    </RKConnectButton.Custom>
  );
}
