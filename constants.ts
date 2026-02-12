
import { Package, PackageType, SiteSettings } from './types';

export const INITIAL_PACKAGES: Package[] = [
  // UID TOPUP - Market Rates (Approx)
  { id: 'uid-25', name: '25 Diamonds', amount: 25, price: 22, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-50', name: '50 Diamonds', amount: 50, price: 40, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-115', name: '115 Diamonds', amount: 115, price: 80, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-240', name: '240 Diamonds', amount: 240, price: 160, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-355', name: '355 Diamonds', amount: 355, price: 240, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-480', name: '480 Diamonds', amount: 480, price: 320, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-610', name: '610 Diamonds', amount: 610, price: 405, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-1240', name: '1240 Diamonds', amount: 1240, price: 810, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  { id: 'uid-2530', name: '2530 Diamonds', amount: 2530, price: 1620, type: PackageType.DIAMOND, deliveryTime: '5-10 Min' },
  
  // IN-GAME TOPUP (Cheaper but needs login)
  { id: 'ig-100', name: '100 Diamonds (In-Game)', amount: 100, price: 65, type: PackageType.IN_GAME, deliveryTime: '15-45 Min' },
  { id: 'ig-310', name: '310 Diamonds (In-Game)', amount: 310, price: 195, type: PackageType.IN_GAME, deliveryTime: '15-45 Min' },
  { id: 'ig-520', name: '520 Diamonds (In-Game)', amount: 520, price: 325, type: PackageType.IN_GAME, deliveryTime: '15-45 Min' },
  { id: 'ig-1060', name: '1060 Diamonds (In-Game)', amount: 1060, price: 640, type: PackageType.IN_GAME, deliveryTime: '15-45 Min' },

  // MEMBERSHIP
  { id: 'm-weekly', name: 'Weekly Membership', amount: 0, price: 155, type: PackageType.MEMBERSHIP, deliveryTime: '10-30 Min' },
  { id: 'm-monthly', name: 'Monthly Membership', amount: 0, price: 750, type: PackageType.MEMBERSHIP, deliveryTime: '10-30 Min' },
  { id: 'm-levelup', name: 'Level Up Pass', amount: 0, price: 185, type: PackageType.MEMBERSHIP, deliveryTime: '10-30 Min' },
  { id: 'm-combo', name: 'Weekly + Monthly Combo', amount: 0, price: 895, type: PackageType.MEMBERSHIP, deliveryTime: '10-30 Min' },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  bkashNumber: '01619789895',
  nagadNumber: '01619789895',
  binanceId: '1210169527',
  noticeText: 'EgyTopup স্টাইলে এখন আপনি পাচ্ছেন সবচেয়ে কম দামে ডায়মন্ড! আমাদের সাথে থাকার জন্য ধন্যবাদ। রিয়েল-টাইম ডেলিভারি নিশ্চিত করতে UID সঠিক দিন।',
  serviceChargePercent: 0,
  whatsapp: '8801619789895',
  telegram: 'freefiretopupstore'
};

export const ADMIN_UID = '7382970242';
