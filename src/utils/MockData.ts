export const EVENTS = [
    {
        id: '1',
        title: 'JAZZ MALAM JUMAT',
        date: '6 FEB',
        fullDate: '6 FEBRUARI 2026',
        time: 'MULAI 20.00 WIB',
        location: 'LOUNGE UTAMA',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000',
        description: 'Nikmati alunan jazz lembut bersama band pengiring kami. Diskon 50% untuk wine.',
    },
    {
        id: '2',
        title: 'LADIES NIGHT',
        date: '7 FEB',
        fullDate: '7 FEBRUARI 2026',
        time: 'MULAI 21.00 WIB',
        location: 'VIP AREA',
        image: 'https://images.unsplash.com/photo-1514525253361-b8748333c5ed?q=80&w=1000',
        description: 'Malam spesial untuk wanita dengan minuman gratis dan penampilan DJ live.',
    },
    {
        id: '3',
        title: 'TECHNO FRIDAY',
        date: '14 FEB',
        fullDate: '14 FEBRUARI 2026',
        time: 'MULAI 22.00 WIB',
        location: 'MAIN DANCE FLOOR',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
        description: 'Nuansa techno mendalam dengan DJ tamu internasional dan pertunjukan lampu laser.',
    },
];

export const ROOMS = [
    {
        id: '1',
        title: 'KTV VIP',
        type: 'room',
        description: 'Ruang pribadi dengan sistem karaoke & layanan premium.',
        icon: 'home',
        actionText: 'Pesan Ruang',
    },
    {
        id: '2',
        title: 'LOUNGE TABLE',
        type: 'table',
        description: 'Sofa & meja premium dengan pemandangan musik live.',
        icon: 'utensils',
        actionText: 'Amankan Meja',
    },
];

export const KTV_ROOMS = [
    {
        id: '1',
        name: 'RUANG 102',
        pax: 'Maks 4 Orang',
        price: 'Rp 150.000',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000',
        description: 'Vibe karaoke yang intim dengan sistem suara premium.',
    },
    {
        id: '2',
        name: 'RUANG 103',
        pax: 'Maks 6 Orang',
        price: 'Rp 200.000',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000',
        description: 'Ruang sedang, cocok untuk acara ulang tahun kecil.',
    },
    {
        id: '3',
        name: 'VVIP ROOM 01',
        pax: 'Maks 12 Orang',
        price: 'Rp 500.000',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000',
        description: 'Kemewahan mutlak dengan bar pribadi dan pelayan khusus.',
    },
    {
        id: '4',
        name: 'ROYAL SUITE',
        pax: 'Maks 20 Orang',
        price: 'Rp 1.000.000',
        image: 'https://images.unsplash.com/photo-1551290464-6725807901da?q=80&w=1000',
        description: 'Ruang terbesar kami untuk pesta besar dan acara korporat.',
    },
];

export const LOUNGE_TABLES = [
    {
        id: '1',
        name: 'Meja Depan DJ 01',
        pax: 'Maks 4 Orang',
        price: 'Min. Spend Rp 1.5jt',
        image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000',
        description: 'Posisi terbaik untuk menikmati musik dari tamu DJ kami.',
    },
    {
        id: '2',
        name: 'Sofa VIP Tengah',
        pax: 'Maks 6 Orang',
        price: 'Min. Spend Rp 3jt',
        image: 'https://images.unsplash.com/photo-1592595894029-aa0fe315c137?q=80&w=1000',
        description: 'Area nyaman dengan pandangan luas ke seluruh lounge.',
    },
    {
        id: '3',
        name: 'Meja Samping Jendela',
        pax: 'Maks 2 Orang',
        price: 'Min. Spend Rp 800rb',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000',
        description: 'Suasana lebih tenang, cocok untuk kencan romantis.',
    },
    {
        id: '4',
        name: 'VVIP Meja Pojok',
        pax: 'Maks 8 Orang',
        price: 'Min. Spend Rp 5jt',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000',
        description: 'Privasi lebih namun tetap bisa merasakan energi lantai dansa.',
    },
];

export const MY_BOOKINGS = [];

export const MENU_CATEGORIES = [
    { id: '1', name: 'Koktail Khas (Signature)' },
    { id: '2', name: 'Koktail Klasik' },
    { id: '3', name: 'Minuman Keras & Botol' },
    { id: '4', name: 'Mocktails (Non-Alkohol)' },
];

export const MENU_ITEMS = [
    {
        id: '1',
        categoryId: '1',
        name: 'Midnight Gold',
        description: 'Wiski premium yang dicampur dengan sarang lebah dan minyak truffle.',
        price: 'Rp 185.000',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000',
    },
    {
        id: '2',
        categoryId: '1',
        name: 'Royal Berry',
        description: 'Basis Gin dengan campuran berry segar dan wine berkilau.',
        price: 'Rp 165.000',
        image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1000',
    },
    {
        id: '3',
        categoryId: '1',
        name: 'Smoked Old Fashioned',
        description: 'Old Fashioned klasik yang disajikan dengan asap kayu hikori.',
        price: 'Rp 195.000',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000',
    },
    {
        id: '4',
        categoryId: '2',
        name: 'Negroni',
        description: 'Gin, Campari, dan Sweet Vermouth.',
        price: 'Rp 150.000',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000',
    },
    {
        id: '5',
        categoryId: '3',
        name: 'Macallan 12 Years',
        description: 'Single Malt Scotch Whiskey. Layanan botol.',
        price: 'Rp 2.800.000',
        image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1000',
    },
];

export const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Booking Dikonfirmasi',
        message: 'Reservasi Anda untuk KTV VIP Ruang 102 pada 14 Feb telah dikonfirmasi.',
        date: '2 menit yang lalu',
        type: 'booking',
        read: false,
    },
    {
        id: '2',
        title: 'Promo Happy Hour!',
        message: 'Dapatkan diskon 50% untuk semua cocktail malam ini jam 20.00 - 23.00.',
        date: '1 jam yang lalu',
        type: 'promo',
        read: false,
    },
    {
        id: '3',
        title: 'Poin Didapatkan',
        message: 'Anda mendapatkan 150 poin dari kunjungan terakhir Anda.',
        date: 'Kemarin',
        type: 'system',
        read: true,
    },
    {
        id: '4',
        title: 'Info Acara Baru',
        message: 'Daftar penampil Techno Friday telah dirilis! Cek sekarang.',
        date: '2 hari yang lalu',
        type: 'event',
        read: true,
    },
];

export const PROMO_COMBO = [
    {
        id: '1',
        title: 'Macallan 12Y + Mixer',
        subtitle: 'Paket Spesial',
        discount: 'HEMAT 15%',
        image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1000',
    },
    {
        id: '2',
        title: 'Twin Bottle Negroni',
        subtitle: 'Spesial Akhir Pekan',
        discount: 'Rp 2.500.000',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000',
    },
    {
        id: '3',
        title: 'Cocktail & Tapas',
        subtitle: 'Promo Pulang Kantor',
        discount: 'Harga Paket',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000',
    },
];
