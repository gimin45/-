import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Shield, ExternalLink, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { siteConfig, isAdminAuthenticated, openAdminModal } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (siteConfig.navigation && siteConfig.navigation.filter(item => item.visible !== false)) || [
    { id: 'nav-highlights', label: 'HIGHLIGHTS', href: '#highlights', num: '01' },
    { id: 'nav-profile', label: 'PROFILE', href: '#profile', num: '02' },
    { id: 'nav-experience', label: 'EXPERIENCE', href: '#experience', num: '03' },
    { id: 'nav-work', label: 'WORK', href: '#work', num: '04' },
    { id: 'nav-contact', label: 'CONTACT', href: '#contact', num: '05' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F3EF]/90 backdrop-blur-md border-b border-[#E5E3DC] py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          id="header-brand-link"
          href="#"
          className="group flex flex-col items-start gap-0.5 tracking-tight"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-lg sm:text-xl text-[#111111] tracking-tight group-hover:text-[#07732C] transition-colors">
              {siteConfig.name}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#07732C]"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#07732C] uppercase hidden sm:inline-block">
              {siteConfig.roleTitle}
            </span>
          </div>
          <span className="text-[11px] text-[#71716A] tracking-wider font-mono">
            PORTFOLIO & CASE STUDIES
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              className="text-xs font-mono font-semibold text-[#555550] hover:text-[#07732C] tracking-wider transition-colors flex items-center gap-1.5 py-1 group/nav"
            >
              <span className="text-[#07732C] text-[11px] font-bold group-hover/nav:underline">{link.num}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls & Admin */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div
            id="status-indicator-badge"
            className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] border border-[#07732C]/30 text-[11px] font-mono text-[#07732C] font-bold shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#07732C] animate-pulse"></span>
            <span>AVAILABLE 2026</span>
          </div>

          {/* Admin Button */}
          <button
            id="open-admin-trigger-btn"
            onClick={openAdminModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
              isAdminAuthenticated
                ? 'bg-[#07732C] text-[#F4F3EF] hover:bg-[#055822] shadow-xs'
                : 'bg-[#E5E3DC] text-[#444440] hover:bg-[#07732C] hover:text-white'
            }`}
            title="포트폴리오 관리자 모드"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAdminAuthenticated ? 'ADMIN ACTIVE' : 'ADMIN'}
            </span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-[#E5E3DC] text-[#111111] hover:bg-[#D5D3CC]"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden fixed inset-x-0 top-[60px] bg-[#F4F3EF] border-b border-[#E5E3DC] px-6 py-6 shadow-xl space-y-4"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-mono font-bold text-[#111111] hover:text-[#07732C] py-2 border-b border-[#E5E3DC]/60"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#07732C] font-bold">{link.num}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#71716A]">
            <span>STATUS</span>
            <span className="text-[#07732C] font-bold">● ACTIVE & READY</span>
          </div>
        </div>
      )}
    </header>
  );
};
