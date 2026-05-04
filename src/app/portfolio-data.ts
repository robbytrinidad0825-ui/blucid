export interface PortfolioProject {
  id: string;
  category: string;
  title: string;
  location: string;
  client: string;
  completionDate: string;
  systemSize: string;
  energySaved: string;
  description: string;
  image: string;
  gallery: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'calamba-2kw-residential',
    category: 'SOLAR PV SYSTEM SUPPLY & INSTALLATION - RESIDENTIAL',
    title: '2kW Single-phase Grid-tie Solar PV System and 18W integrated Solar Streetlight',
    location: 'Calamba, Laguna',
    client: 'Residential Owner',
    completionDate: '2020',
    systemSize: '2kW Solar + 18W Streetlight',
    energySaved: '240 kWh/month',
    description: 'A comprehensive solar power solution including a 2kW grid-tie system synchronized with the local utility grid and an independent 18W integrated solar streetlight for nighttime outdoor security.',
    image: '/img/portfolio/Picture16.png',
    gallery: [
      '/img/portfolio/Picture16.png',
      '/img/portfolio/Picture17.png'
    ]
  },
  {
    
    id: 'burger-machine-52kw-commercial',
    category: 'SOLAR PV SYSTEM SUPPLY & INSTALLATION - COMMERCIAL',
    title: '52kW Three-phase Grid-tie Solar PV System',
    location: 'San Fernando, Pampanga',
    client: 'Burger Machine Commissary Plant',
    completionDate: '2020',
    systemSize: '52kWp',
    energySaved: '6,200 kWh/month',
    description: 'Burger Machine Commissary Plant Large-scale industrial solar installation for a food manufacturing facility. This project includes high-capacity grid-tied inverters and robust wiring infrastructure to support peak commissary operations.',    
    image: '/img/portfolio/Picture70.png',
    gallery: [
      '/img/portfolio/Picture70.png',
      '/img/portfolio/Picture70.png'
    ]
  },
  {
    id: 'hj-franklin-5kw-carport',
    category: 'Solar PV - Commercial',
    title: '5kW Single-phase Grid-tie Solar PV System - Carport',
    location: 'Las Piñas City',
    client: 'HJ Franklin Inc.',
    completionDate: '2020',
    systemSize: '5kWp',
    energySaved: '600 kWh/month',
    description: 'Innovative solar-integrated carport solution. This setup provides shaded parking for the client while generating clean energy directly consumed by the office building.',
    image: '/img/portfolio/Picture2.png',
    gallery: [
      '/img/portfolio/Picture2.png',
      '/img/portfolio/Picture69.png'
    ]
  },
  {
    id: 'sitio-buntog-10kw-offgrid',
    category: 'SOLAR PV SYSTEM SUPPLY & INSTALLATION',
    title: '10kW Single-phase Off-Grid Solar PV System',
    location: 'Sitio Buntog, Canlubang, Calamba',
    client: 'Elementary and National High School',
    completionDate: '2024',
    systemSize: '10kWp with Storage',
    energySaved: '1,200 kWh/month',
    description: 'Critical off-grid solar infrastructure for educational facilities. This system powers classrooms and equipment independently from the main grid, ensuring uninterrupted learning environment.',
    image: '/img/portfolio/Picture55.png',
    gallery: [
      '/img/portfolio/Picture55.png',
      '/img/portfolio/Picture56.png'
    ]
  },
  {
    id: 'batch-solor-streetlights',
    category: 'SOLAR LED STREETLIGHTS SUPPLY',
    title: '60W Integrated Solar LED Streetlight Supply',
    location: 'Pampanga and Cavite Economic Zones',
    client: 'Various PEZA Facilities',
    completionDate: '2021',
    systemSize: '60W per Unit',
    energySaved: 'N/A',
    description: 'Supply and installation of high-efficiency 60W integrated solar LED streetlights for economic zone perimeter lighting and road safety.',
    image: '/img/portfolio/Picture20.png',
    gallery: [
      '/img/portfolio/Picture21.png',
      '/img/portfolio/Picture22.png',
      '/img/portfolio/Picture23.png'
    ]
  },
  {
    id: 'trustlite-entrance-upgrade',
    category: 'Electrical Works',
    title: 'Trustlite Industry Service Entrance Upgrade',
    location: 'CPIP Batino, Calamba City',
    client: 'Trustlite Industry',
    completionDate: '2020',
    systemSize: 'Industrial Capacity Upgrade',
    energySaved: 'Optimized Distribution',
    description: 'Professional upgrade of the service entrance electrical infrastructure to support increased industrial load requirements at the CPIP enterprise zone.',
    image: '/img/portfolio/Picture25.png',
    gallery: [
      '/img/portfolio/Picture25.png',
      '/img/portfolio/Picture26.png'
    ]
  },
  {
    id: 'pldt-rectifier-battery',
    category: 'Telecoms & Battery',
    title: 'Rectifier Battery Wiring and Commissioning',
    location: 'PLDT Cavite & Bacoor',
    client: 'PLDT',
    completionDate: '2020',
    systemSize: 'Multi-rack DC Power',
    energySaved: 'N/A',
    description: 'Expert implementation of rectifier battery racks, busbar assembly, and DC wiring. Ensuring reliable power backup for critical telecommunication infrastructure.',
    image: '/img/portfolio/Picture33.png',
    gallery: [
      '/img/portfolio/Picture31.png',
      '/img/portfolio/Picture32.png'
    ]
  },
  {
    id: 'converge-bamacom-telco',
    category: 'Telecom Infrastructure',
    title: 'Pole Erection and Fiber Optic Cable Laying',
    location: 'Taguig, Zambales, Ilocos Sur',
    client: 'Converge / BAMACOM',
    completionDate: '2021',
    systemSize: 'Regional Expansion',
    energySaved: 'N/A',
    description: 'Extensive telecom infrastructure project involving pole erection, fiber optic cable laying, and fixing for the regional network expansion of leading telco providers.',
    image: '/img/portfolio/Picture35.png',
    gallery: [
      '/img/portfolio/Picture36.png',
      '/img/portfolio/Picture37.png',
      '/img/portfolio/Picture38.png',
      '/img/portfolio/Picture39.png'
    ]
  },
  {
    id: 'dito-telco-laguna',
    category: 'Telecom Infrastructure',
    title: 'Pole Erection, Fiber Optic Cable Laying & Fixing',
    location: 'San Pablo City, Laguna',
    client: 'DITO Telco Access Site',
    completionDate: '2021',
    systemSize: 'Access Site Setup',
    energySaved: 'N/A',
    description: 'Specialized telecom infrastructure works including pole erection and precise fiber optic cable fixing for the DITO community network expansion in Laguna.',
    image: '/img/portfolio/Picture41.png',
    gallery: [
      '/img/portfolio/Picture42.png',
      '/img/portfolio/Picture43.png',
'/img/portfolio/Picture44.png'
    ]
  },
  {
    id: 'calaca-5kw-solar',
    category: 'Solar PV - Residential',
    title: '5kW Single-phase Grid-tie Solar PV System',
    location: 'Calaca, Batangas',
    client: 'Residential Owner',
    completionDate: '2021',
    systemSize: '5kWp',
    energySaved: '600 kWh/month',
    description: 'High-performance residential solar array featuring Solis grid-tied inverters and tier-1 monocrystalline panels for maximum energy yield in Batangas.',
    image: '/img/portfolio/Picture61.png',
    gallery: [
      '/img/portfolio/Picture61.png',
      '/img/portfolio/Picture62.png'
    
    ]
  },
  {
    id: 'Solar Water Solutions',
    category: 'SOLAR PV SYSTEM SUPPLY & INSTALLATION',
    title: 'Self-sufficient and affordable drinking water supply',
    location: 'Calaca, Batangas',
    client: 'Residential Owner',
    completionDate: '2021',
    systemSize: '5kWp',
    energySaved: '600 kWh/month',
    description: 'Clean drinking water production from seawater 123 L/H and from brackish water 190 L/H. Easy to use system with low life-cycle cost.',
    image: '/img/portfolio/Picture53.png',
    gallery: [
      '/img/portfolio/Picture53.png',
      '/img/portfolio/Picture53.png'
    ]
  },
  {
  id: 'Solar Water Solutions',
  category: 'SOLAR PV SYSTEM SUPPLY & INSTALLATION',
  title: 'Self-sufficient and affordable drinking water supply',
  location: 'Tondo, Manila',
  client: 'Residential Owner',
  completionDate: '2021',
  systemSize: '3kW',
  energySaved: '----',
  description: '3kW Single -phase Grid-tie Solar PV System – Tondo, Manila ',
  image: '/img/portfolio/Picture56.png',
  gallery: [
    '/img/portfolio/Picture65.png',
    '/img/portfolio/Picture66.png'
  ]
},

{
  id: 'Solar Water Solutions',
  category: 'Hubert Samiano Motil Apt. – Landmark Subdivision',
  title: 'Hubert Samiano Motil Apt. – Landmark Subdivision',
  location: 'laguna',
  client: 'Residential Owner',
  completionDate: '2021',
  systemSize: '3kW',
  energySaved: '----',
  description: 'Hubert Samiano Motil Apt. – Landmark Subdivision',
  image: '/img/portfolio/Picture71.png',
  gallery: [
    '/img/portfolio/Picture71.png',
    '/img/portfolio/Picture71.png'
  ]
},
{
id: 'ELECTRICAL SUPPLY & INSTALLATION',
category: 'ELECTRICAL SUPPLY & INSTALLATION',
title: 'Hubert Samiano Motil Apt. – Landmark Subdivision',
location: 'San Fernandoi, Pampanga',
client: 'Residential Owner',
completionDate: '2021',
systemSize: '----',
energySaved: '----',
description: 'Main Panel installation for submersible pump (Pampanga Economic Zone Line Side 3phase step-down transformer and Load-side Solar inverter and MDP (Burger Machine Commissary Plant, San Fernando Pampanga',
image: '/img/portfolio/Picture74.png',
gallery: [
  '/img/portfolio/Picture75.png',
  '/img/portfolio/Picture75.png'
]
},
{
  id: 'AC / DC ELECTRICAL WIRINGS & BATTERY INSTALLATION',
  category: 'AC / DC ELECTRICAL WIRINGS & BATTERY INSTALLATION',
  title: 'Rectifier battery wiring and commissioning',
  location: 'Cavite-',
  client: 'Residential Owner',
  completionDate: '2021',
  systemSize: '----',
  energySaved: '----',
  description: 'Rectifier battery wiring and commissioning (PLDT, Cavite) Rectifier battery rack and busbar assembly (PLDT, Cavite)',
  image: '/img/portfolio/Picture76.png',
  gallery: [
    '/img/portfolio/Picture77.png',
    '/img/portfolio/Picture78.png',
    '/img/portfolio/Picture79.png'
  ]
  },
  {
    id: 'TELECOMS, ELECTRICAL SUPPLY & INSTALLATION',
    category: 'TELECOMS, ELECTRICAL SUPPLY & INSTALLATION',
    title: 'Rectifier electrical wiring and panel board installation',
    location: 'Bulacan',
    client: 'Property Owner',
    completionDate: '2021',
    systemSize: '----',
    energySaved: '----',
    description: 'Rectifier electrical wiring and panel board installation (PLDT, Bulacan)',
    image: '/img/portfolio/Picture80.png',
    gallery: [
      '/img/portfolio/Picture80.png',
      '/img/portfolio/Picture80.png'
    ]
    }


];

