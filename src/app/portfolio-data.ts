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
    category: 'Solar PV - Residential',
    title: '2kW Single-phase Grid-tie Solar PV System and 18W integrated Solar Streetlight',
    location: 'Calamba, Laguna',
    client: 'Residential Owner',
    completionDate: '2020',
    systemSize: '2kW Solar + 18W Streetlight',
    energySaved: '240 kWh/month',
    description: 'A comprehensive solar power solution including a 2kW grid-tie system synchronized with the local utility grid and an independent 18W integrated solar streetlight for nighttime outdoor security.',
    image: '/img/portfolio/Picture1.png',
    gallery: [
      '/img/portfolio/Picture1.png',
      '/img/portfolio/Picture2.png'
    ]
  },
  {
    id: 'burger-machine-52kw-commercial',
    category: 'Solar PV - Commercial',
    title: '52kW Three-phase Grid-tie Solar PV System',
    location: 'San Fernando, Pampanga',
    client: 'Burger Machine Commissary Plant',
    completionDate: '2020',
    systemSize: '52kWp',
    energySaved: '6,200 kWh/month',
    description: 'Large-scale industrial solar installation for a food manufacturing facility. This project includes high-capacity grid-tied inverters and robust wiring infrastructure to support peak commissary operations.',
    image: '/img/portfolio/Picture3.png',
    gallery: [
      '/img/portfolio/Picture3.png',
      '/img/portfolio/Picture4.png'
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
    image: '/img/portfolio/Picture5.png',
    gallery: [
      '/img/portfolio/Picture5.png',
      '/img/portfolio/Picture6.png'
    ]
  },
  {
    id: 'sitio-buntog-10kw-offgrid',
    category: 'Solar PV - Institutional',
    title: '10kW Single-phase Off-Grid Solar PV System',
    location: 'Sitio Buntog, Canlubang, Calamba',
    client: 'Elementary and National High School',
    completionDate: '2024',
    systemSize: '10kWp with Storage',
    energySaved: '1,200 kWh/month',
    description: 'Critical off-grid solar infrastructure for educational facilities. This system powers classrooms and equipment independently from the main grid, ensuring uninterrupted learning environment.',
    image: '/img/portfolio/Picture7.png',
    gallery: [
      '/img/portfolio/Picture7.png',
      '/img/portfolio/Picture8.png'
    ]
  },
  {
    id: 'batch-solor-streetlights',
    category: 'Solar LED Lighting',
    title: '60W Integrated Solar LED Streetlight Supply',
    location: 'Pampanga and Cavite Economic Zones',
    client: 'Various PEZA Facilities',
    completionDate: '2021',
    systemSize: '60W per Unit',
    energySaved: 'N/A',
    description: 'Supply and installation of high-efficiency 60W integrated solar LED streetlights for economic zone perimeter lighting and road safety.',
    image: '/img/portfolio/Picture9.png',
    gallery: [
      '/img/portfolio/Picture9.png',
      '/img/portfolio/Picture10.png'
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
    image: '/img/portfolio/Picture11.png',
    gallery: [
      '/img/portfolio/Picture11.png',
      '/img/portfolio/Picture12.png'
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
    image: '/img/portfolio/Picture13.png',
    gallery: [
      '/img/portfolio/Picture13.png',
      '/img/portfolio/Picture14.png'
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
    image: '/img/portfolio/Picture15.png',
    gallery: [
      '/img/portfolio/Picture15.png',
      '/img/portfolio/Picture16.png'
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
    image: '/img/portfolio/Picture17.png',
    gallery: [
      '/img/portfolio/Picture17.png',
      '/img/portfolio/Picture18.png'
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
    image: '/img/portfolio/Picture1.png',
    gallery: [
      '/img/portfolio/Picture1.png',
      '/img/portfolio/Picture2.png'
    ]
  }
];
