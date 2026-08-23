/* ============================================================
   CampusFind - data.js
   Sample data: lost items, found items, categories, locations
   ============================================================ */

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'id-cards', name: 'ID Cards', icon: '🪪' },
  { id: 'bags', name: 'Bags', icon: '🎒' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'wallets', name: 'Wallets', icon: '👛' },
  { id: 'keys', name: 'Keys', icon: '🔑' },
  { id: 'accessories', name: 'Accessories', icon: '⌚' },
  { id: 'other', name: 'Other', icon: '📦' }
];

const LOCATIONS = [
  'University Library',
  'Main Cafeteria',
  'Science Building - Lab 3',
  'Sports Complex',
  'Engineering Faculty',
  'Business Faculty',
  'Arts Faculty',
  'Student Center',
  'University Mosque',
  'Parking Area A',
  'Lecture Hall B-201',
  'Computer Lab - Block C',
  'Administration Building',
  'University Gymnasium',
  'Medical Center',
  'Dormitory Block D'
];

const ITEM_EMOJIS = {
  'electronics': '📱',
  'id-cards': '🪪',
  'bags': '🎒',
  'books': '📚',
  'wallets': '👛',
  'keys': '🔑',
  'accessories': '⌚',
  'other': '📦'
};

const ITEM_IMG_CLASSES = {
  'electronics': 'img-electronics',
  'id-cards': 'img-id',
  'bags': 'img-bag',
  'books': 'img-books',
  'wallets': 'img-wallet',
  'keys': 'img-keys',
  'accessories': 'img-accessories',
  'other': 'img-other'
};

const LOST_ITEMS = [
  {
    id: 'L001',
    type: 'lost',
    name: 'Samsung Galaxy S23 Ultra',
    category: 'electronics',
    location: 'University Library',
    date: '2026-08-20',
    time: '14:30',
    description: 'Black Samsung Galaxy S23 Ultra with a black leather case. Has a cracked screen protector. Last seen on the study table near the 3rd-floor windows.',
    postedBy: 'Ahmed Hassan',
    contactEmail: 'ahmed.hassan@student.uni.edu',
    contactPhone: '+880-171-5551234',
    status: 'lost',
    createdAt: '2026-08-20T14:45:00Z'
  },
  {
    id: 'L002',
    type: 'lost',
    name: 'Black Leather Wallet',
    category: 'wallets',
    location: 'Main Cafeteria',
    date: '2026-08-19',
    time: '12:15',
    description: 'Black leather bi-fold wallet containing university student ID, two debit cards, and some cash. There is a small photo inside.',
    postedBy: 'Fatima Rahman',
    contactEmail: 'fatima.rahman@student.uni.edu',
    contactPhone: '+880-181-5559876',
    status: 'lost',
    createdAt: '2026-08-19T13:00:00Z'
  },
  {
    id: 'L003',
    type: 'lost',
    name: 'University Student ID Card',
    category: 'id-cards',
    location: 'Engineering Faculty',
    date: '2026-08-18',
    time: '10:00',
    description: 'University student ID card for Mohammad Ali, Student ID: CSE-2022-045. Lost somewhere between the engineering labs and the cafeteria.',
    postedBy: 'Mohammad Ali',
    contactEmail: 'mohammad.ali@student.uni.edu',
    contactPhone: '+880-191-5554321',
    status: 'lost',
    createdAt: '2026-08-18T10:30:00Z'
  },
  {
    id: 'L004',
    type: 'lost',
    name: 'Blue JanSport Backpack',
    category: 'bags',
    location: 'Sports Complex',
    date: '2026-08-17',
    time: '16:00',
    description: 'Blue JanSport backpack with multiple compartments. Contains textbooks, a laptop charger, and personal notebooks. Has a distinctive keychain attached.',
    postedBy: 'Raisa Begum',
    contactEmail: 'raisa.b@student.uni.edu',
    contactPhone: '+880-172-5558765',
    status: 'lost',
    createdAt: '2026-08-17T16:30:00Z'
  },
  {
    id: 'L005',
    type: 'lost',
    name: 'Apple AirPods Pro',
    category: 'electronics',
    location: 'Student Center',
    date: '2026-08-16',
    time: '11:20',
    description: 'White Apple AirPods Pro with white charging case. The case has a small blue sticker on the back. Last seen at the student lounge area.',
    postedBy: 'Tasneem Hossain',
    contactEmail: 'tasneem.h@student.uni.edu',
    contactPhone: '+880-182-5552468',
    status: 'lost',
    createdAt: '2026-08-16T11:35:00Z'
  },
  {
    id: 'L006',
    type: 'lost',
    name: 'Calculus Textbook (Stewart)',
    category: 'books',
    location: 'Lecture Hall B-201',
    date: '2026-08-15',
    time: '09:45',
    description: 'James Stewart Calculus 8th Edition. The owner\'s name "Karim" is written inside the front cover. Has many highlighted sections and sticky notes.',
    postedBy: 'Karim Uddin',
    contactEmail: 'karim.u@student.uni.edu',
    contactPhone: '+880-196-5553579',
    status: 'lost',
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'L007',
    type: 'lost',
    name: 'Car Keys with Blue Keychain',
    category: 'keys',
    location: 'Parking Area A',
    date: '2026-08-22',
    time: '08:30',
    description: 'Toyota car keys with a blue rubber keychain shaped like a star. Has two house keys and a USB drive attached to the keyring.',
    postedBy: 'Nasrin Akter',
    contactEmail: 'nasrin.a@student.uni.edu',
    contactPhone: '+880-173-5556789',
    status: 'lost',
    createdAt: '2026-08-22T08:45:00Z'
  },
  {
    id: 'L008',
    type: 'lost',
    name: 'HP Scientific Calculator',
    category: 'electronics',
    location: 'Science Building - Lab 3',
    date: '2026-08-21',
    time: '13:00',
    description: 'HP 35s Scientific Calculator in a black case. Has "RONY" written with a marker on the back. Left in the physics lab during the practical exam.',
    postedBy: 'Rony Islam',
    contactEmail: 'rony.islam@student.uni.edu',
    contactPhone: '+880-185-5550123',
    status: 'lost',
    createdAt: '2026-08-21T13:20:00Z'
  },
  {
    id: 'L009',
    type: 'lost',
    name: 'Silver Analog Watch',
    category: 'accessories',
    location: 'University Gymnasium',
    date: '2026-08-20',
    time: '17:30',
    description: 'Silver Casio Edifice analog watch with a metal bracelet. Has a small scratch on the case. Left in the locker room at the gymnasium.',
    postedBy: 'Imran Faruk',
    contactEmail: 'imran.f@student.uni.edu',
    contactPhone: '+880-193-5557654',
    status: 'lost',
    createdAt: '2026-08-20T17:45:00Z'
  },
  {
    id: 'L010',
    type: 'lost',
    name: 'USB Flash Drive 64GB',
    category: 'electronics',
    location: 'Computer Lab - Block C',
    date: '2026-08-19',
    time: '15:00',
    description: 'SanDisk 64GB USB flash drive in red and silver. Contains important assignment files and final year project data. Please return urgently.',
    postedBy: 'Sadia Sultana',
    contactEmail: 'sadia.s@student.uni.edu',
    contactPhone: '+880-174-5554567',
    status: 'lost',
    createdAt: '2026-08-19T15:20:00Z'
  },
  {
    id: 'L011',
    type: 'lost',
    name: 'Pink Laptop Sleeve',
    category: 'bags',
    location: 'Business Faculty',
    date: '2026-08-18',
    time: '14:00',
    description: 'Pink neoprene laptop sleeve for 15.6-inch laptop. Has a small flower decoration on the front. Contains a laptop charger inside.',
    postedBy: 'Nadia Islam',
    contactEmail: 'nadia.islam@student.uni.edu',
    contactPhone: '+880-186-5558901',
    status: 'lost',
    createdAt: '2026-08-18T14:30:00Z'
  },
  {
    id: 'L012',
    type: 'lost',
    name: 'Reading Glasses (Brown Frame)',
    category: 'accessories',
    location: 'Arts Faculty',
    date: '2026-08-17',
    time: '11:00',
    description: 'Brown-framed reading glasses in a soft brown case. Prescription lenses, -2.5 power. Left on the desk in the literature classroom on the 2nd floor.',
    postedBy: 'Professor Zahir Ahmed',
    contactEmail: 'z.ahmed@faculty.uni.edu',
    contactPhone: '+880-171-5552345',
    status: 'lost',
    createdAt: '2026-08-17T11:15:00Z'
  }
];

const FOUND_ITEMS = [
  {
    id: 'F001',
    type: 'found',
    name: 'iPhone 14 Pro - Space Black',
    category: 'electronics',
    location: 'University Library',
    date: '2026-08-21',
    time: '16:00',
    description: 'Found a black iPhone 14 Pro on the study table near the entrance. Phone is locked. Has a transparent case with a "UNI" sticker.',
    postedBy: 'Librarian Staff',
    contactEmail: 'library@uni.edu',
    contactPhone: '+880-178-5560000',
    status: 'found',
    createdAt: '2026-08-21T16:15:00Z'
  },
  {
    id: 'F002',
    type: 'found',
    name: 'Brown Leather Wallet',
    category: 'wallets',
    location: 'Main Cafeteria',
    date: '2026-08-22',
    time: '13:30',
    description: 'Found a brown leather wallet near table 12 in the cafeteria. Contains some cash and what appears to be student ID cards. Handed to cafeteria manager.',
    postedBy: 'Shamim Ahmed',
    contactEmail: 'shamim.a@student.uni.edu',
    contactPhone: '+880-188-5561234',
    status: 'found',
    createdAt: '2026-08-22T13:45:00Z'
  },
  {
    id: 'F003',
    type: 'found',
    name: 'Green Backpack',
    category: 'bags',
    location: 'Lecture Hall B-201',
    date: '2026-08-20',
    time: '18:00',
    description: 'Found a green Adidas backpack in Lecture Hall B-201 after evening class. Contains books and stationery. Left at the security office.',
    postedBy: 'Security Office',
    contactEmail: 'security@uni.edu',
    contactPhone: '+880-175-5562345',
    status: 'found',
    createdAt: '2026-08-20T18:20:00Z'
  },
  {
    id: 'F004',
    type: 'found',
    name: 'Student ID Card - CSE Faculty',
    category: 'id-cards',
    location: 'Student Center',
    date: '2026-08-19',
    time: '09:30',
    description: 'Found a CSE student ID card near the student center main entrance. The name visible is "Sadiya K." Submitted to the administration office.',
    postedBy: 'Admin Office',
    contactEmail: 'admin@uni.edu',
    contactPhone: '+880-197-5563456',
    status: 'found',
    createdAt: '2026-08-19T09:45:00Z'
  },
  {
    id: 'F005',
    type: 'found',
    name: 'Bunch of Keys (5 keys)',
    category: 'keys',
    location: 'Engineering Faculty',
    date: '2026-08-21',
    time: '12:00',
    description: 'Found a bunch of 5 keys tied with a red rubber band. Includes what appears to be dorm room and locker keys. Found near engineering block entrance stairs.',
    postedBy: 'Tanvir Hossain',
    contactEmail: 'tanvir.h@student.uni.edu',
    contactPhone: '+880-180-5564567',
    status: 'found',
    createdAt: '2026-08-21T12:15:00Z'
  },
  {
    id: 'F006',
    type: 'found',
    name: 'Sony Wireless Earbuds',
    category: 'electronics',
    location: 'Sports Complex',
    date: '2026-08-18',
    time: '07:45',
    description: 'Found Sony WF-1000XM5 earbuds in black charging case near the basketball court. Currently held at the sports complex reception.',
    postedBy: 'Sports Complex Reception',
    contactEmail: 'sports@uni.edu',
    contactPhone: '+880-177-5565678',
    status: 'found',
    createdAt: '2026-08-18T08:00:00Z'
  },
  {
    id: 'F007',
    type: 'found',
    name: 'Data Structures Textbook',
    category: 'books',
    location: 'Computer Lab - Block C',
    date: '2026-08-17',
    time: '19:00',
    description: 'Found "Introduction to Algorithms - CLRS" textbook left in Computer Lab Block C. Has handwritten notes throughout. Can be claimed from the lab supervisor.',
    postedBy: 'Lab Supervisor',
    contactEmail: 'lab.c@uni.edu',
    contactPhone: '+880-192-5566789',
    status: 'found',
    createdAt: '2026-08-17T19:15:00Z'
  },
  {
    id: 'F008',
    type: 'found',
    name: 'Black Umbrella',
    category: 'other',
    location: 'Administration Building',
    date: '2026-08-22',
    time: '10:00',
    description: 'Found a sturdy black folding umbrella in the administration building lobby. Has a curved wooden handle. Left at the reception desk.',
    postedBy: 'Reception Staff',
    contactEmail: 'admin.reception@uni.edu',
    contactPhone: '+880-189-5567890',
    status: 'found',
    createdAt: '2026-08-22T10:15:00Z'
  },
  {
    id: 'F009',
    type: 'found',
    name: 'White Hooded Jacket',
    category: 'other',
    location: 'University Mosque',
    date: '2026-08-21',
    time: '14:00',
    description: 'Found a white zip-up hooded jacket left at the mosque after Friday prayers. Medium size, has a small "UNIV" embroidery on the chest.',
    postedBy: 'Mosque Administration',
    contactEmail: 'mosque@uni.edu',
    contactPhone: '+880-176-5568901',
    status: 'found',
    createdAt: '2026-08-21T14:30:00Z'
  },
  {
    id: 'F010',
    type: 'found',
    name: 'Casio Calculator FX-991EX',
    category: 'electronics',
    location: 'Science Building - Lab 3',
    date: '2026-08-20',
    time: '16:30',
    description: 'Found a Casio Classwiz FX-991EX scientific calculator on the lab bench in Science Building Lab 3. Left with the lab attendant.',
    postedBy: 'Lab Attendant',
    contactEmail: 'sci.lab@uni.edu',
    contactPhone: '+880-183-5569012',
    status: 'found',
    createdAt: '2026-08-20T16:45:00Z'
  },
  {
    id: 'F011',
    type: 'found',
    name: 'Gold-toned Bracelet',
    category: 'accessories',
    location: 'University Gymnasium',
    date: '2026-08-19',
    time: '18:00',
    description: 'Found a gold-toned chain bracelet in the women\'s changing room at the gymnasium. Delicate design with small heart charms. Submitted to gym reception.',
    postedBy: 'Gymnasium Reception',
    contactEmail: 'gym@uni.edu',
    contactPhone: '+880-187-5570123',
    status: 'found',
    createdAt: '2026-08-19T18:15:00Z'
  },
  {
    id: 'F012',
    type: 'found',
    name: 'Spiral Notebook - Engineering Notes',
    category: 'books',
    location: 'Business Faculty',
    date: '2026-08-18',
    time: '15:00',
    description: 'Found a blue spiral notebook with detailed engineering notes, particularly thermodynamics. Owner\'s name not written inside. Left at business faculty reception.',
    postedBy: 'Business Faculty Reception',
    contactEmail: 'bus.faculty@uni.edu',
    contactPhone: '+880-194-5571234',
    status: 'found',
    createdAt: '2026-08-18T15:20:00Z'
  }
];

/* ── Helper: merge localStorage submissions with sample data ── */
function getAllItems(type) {
  const sample = type === 'lost' ? LOST_ITEMS : FOUND_ITEMS;
  try {
    const stored = JSON.parse(localStorage.getItem(`campusfind_${type}_items`) || '[]');
    return [...stored.map(i => ({ ...i, type, status: i.status || type })), ...sample];
  } catch {
    return sample;
  }
}

function getItemById(id, type) {
  if (!id) return null;
  // If type is specified, check that collection first
  if (type) {
    const list = getAllItems(type);
    const match = list.find(i => String(i.id).toLowerCase() === String(id).toLowerCase());
    if (match) return match;
  }
  // Otherwise search across all lost and found items
  const allLost = getAllItems('lost');
  const allFound = getAllItems('found');
  return allLost.find(i => String(i.id).toLowerCase() === String(id).toLowerCase()) ||
         allFound.find(i => String(i.id).toLowerCase() === String(id).toLowerCase()) ||
         null;
}

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown Date';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function timeAgo(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Recently';
    const now = new Date();
    const diff = Math.max(0, now - d);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return mins <= 1 ? 'Just now' : `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return formatDate(dateStr);
  } catch {
    return 'Recently';
  }
}
