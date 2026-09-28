const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Citizen = require('../models/Citizen');
const Staff = require('../models/Staff');
const Complaint = require('../models/Complaint');
const GovernmentScheme = require('../models/GovernmentScheme');
const Notice = require('../models/Notice');
const VillageInformation = require('../models/VillageInformation');

dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/panchayat_db');
    console.log('[Seeder] Connected to MongoDB...');
  } catch (err) {
    console.error('[Seeder Error]', err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Citizen.deleteMany();
    await Staff.deleteMany();
    await Complaint.deleteMany();
    await GovernmentScheme.deleteMany();
    await Notice.deleteMany();
    await VillageInformation.deleteMany();

    console.log('[Seeder] Cleared existing database records.');

    // 1. Create Admin User
    const adminUser = await User.create({
      name: 'Panchayat Development Officer (Admin)',
      email: 'admin@panchayat.gov.in',
      mobile: '9876543210',
      password: 'password123',
      role: 'admin',
      address: 'Panchayat Bhawan, Rampur Village',
      village: 'Rampur',
      wardNumber: 'Ward 1'
    });

    // 2. Create 2 Staff Users
    const staffUser1 = await User.create({
      name: 'Suresh Kumar (Revenue Staff)',
      email: 'staff1@panchayat.gov.in',
      mobile: '9876543211',
      password: 'password123',
      role: 'staff',
      address: 'Revenue Office, Ward 2, Rampur',
      village: 'Rampur',
      wardNumber: 'Ward 2'
    });

    const staffUser2 = await User.create({
      name: 'Meena Sharma (Grievance Assistant)',
      email: 'staff2@panchayat.gov.in',
      mobile: '9876543212',
      password: 'password123',
      role: 'staff',
      address: 'Civic Helpdesk, Ward 4, Rampur',
      village: 'Rampur',
      wardNumber: 'Ward 4'
    });

    // Staff details records
    await Staff.create([
      {
        staffId: 'STF-0001',
        user: staffUser1._id,
        name: staffUser1.name,
        designation: 'Senior Revenue Inspector',
        department: 'Revenue & Administration',
        mobile: staffUser1.mobile,
        email: staffUser1.email,
        status: 'Active'
      },
      {
        staffId: 'STF-0002',
        user: staffUser2._id,
        name: staffUser2.name,
        designation: 'Grievance Executive',
        department: 'Civic Complaints',
        mobile: staffUser2.mobile,
        email: staffUser2.email,
        status: 'Active'
      }
    ]);

    // 3. Create 8 Citizens
    const citizenDetails = [
      { name: 'Ramesh Patel', email: 'ramesh@gmail.com', mobile: '9123456701', ward: 'Ward 1', occupation: 'Agriculture / Farmer' },
      { name: 'Sunita Devi', email: 'sunita@gmail.com', mobile: '9123456702', ward: 'Ward 2', occupation: 'Self-Employed Tailor' },
      { name: 'Anil Kumar', email: 'anil@gmail.com', mobile: '9123456703', ward: 'Ward 3', occupation: 'Dairy Farmer' },
      { name: 'Pooja Verma', email: 'pooja@gmail.com', mobile: '9123456704', ward: 'Ward 4', occupation: 'Primary School Teacher' },
      { name: 'Rajesh Gowda', email: 'rajesh@gmail.com', mobile: '9123456705', ward: 'Ward 5', occupation: 'Small Business Owner' },
      { name: 'Kavitha Rao', email: 'kavitha@gmail.com', mobile: '9123456706', ward: 'Ward 6', occupation: 'Homemaker' },
      { name: 'Mahesh Singh', email: 'mahesh@gmail.com', mobile: '9123456707', ward: 'Ward 7', occupation: 'Carpentry Contractor' },
      { name: 'Lakshmi Narayan', email: 'lakshmi@gmail.com', mobile: '9123456708', ward: 'Ward 8', occupation: 'General Merchant' }
    ];

    const citizenUsers = [];
    for (let i = 0; i < citizenDetails.length; i++) {
      const c = citizenDetails[i];
      const u = await User.create({
        name: c.name,
        email: c.email,
        mobile: c.mobile,
        password: 'password123',
        role: 'citizen',
        address: `House No. ${12 + i}, Main Street, ${c.ward}, Rampur`,
        village: 'Rampur',
        wardNumber: c.ward,
        occupation: c.occupation
      });

      await Citizen.create({
        citizenId: `CIT-${String(101 + i).padStart(4, '0')}`,
        user: u._id,
        name: u.name,
        fatherName: 'Late Sh. Govind',
        gender: i % 2 === 0 ? 'Male' : 'Female',
        dateOfBirth: new Date(1985 + (i * 2), i % 12, (i * 3) + 1),
        mobile: u.mobile,
        email: u.email,
        address: u.address,
        village: 'Rampur',
        wardNumber: c.ward,
        occupation: c.occupation
      });

      citizenUsers.push(u);
    }

    // 4. Create 5 Complaints
    await Complaint.create([
      {
        complaintId: 'CMP-0101',
        citizen: citizenUsers[0]._id,
        subject: 'Low Water Pressure in Pipeline',
        category: 'Water',
        description: 'Drinking water supply line in Ward 1 has severely low pressure during morning supply hours.',
        status: 'In Progress',
        response: 'Panchayat plumber team assigned to check main distribution valve.',
        assignedStaff: staffUser2._id
      },
      {
        complaintId: 'CMP-0102',
        citizen: citizenUsers[1]._id,
        subject: 'Faulty Street Light near Temple',
        category: 'Street Lights',
        description: 'The LED street light opposite Ram Mandir in Ward 2 has been flickering and off for 3 days.',
        status: 'Resolved',
        response: 'New LED bulb installed by Gram Panchayat electrician.',
        assignedStaff: staffUser2._id
      },
      {
        complaintId: 'CMP-0103',
        citizen: citizenUsers[2]._id,
        subject: 'Drainage Overflow near Bus Stop',
        category: 'Drainage',
        description: 'Main open drain near village entrance bus stop is clogged with silt and overflowing onto the road.',
        status: 'Pending',
        response: ''
      },
      {
        complaintId: 'CMP-0104',
        citizen: citizenUsers[3]._id,
        subject: 'Road Potholes in Ward 4',
        category: 'Roads',
        description: 'Heavy rainfall has caused large potholes on the connecting road between Ward 4 and Primary School.',
        status: 'In Progress',
        response: 'Road patch repair proposal submitted in Gram Sabha budget.',
        assignedStaff: staffUser1._id
      },
      {
        complaintId: 'CMP-0105',
        citizen: citizenUsers[4]._id,
        subject: 'Irregular Garbage Collection',
        category: 'Sanitation',
        description: 'Waste collection vehicle did not visit Ward 5 for two consecutive days.',
        status: 'Pending',
        response: ''
      }
    ]);

    // 5. Create 5 Government Schemes
    await GovernmentScheme.create([
      {
        schemeName: 'Pradhan Mantri Awas Yojana (PMAY-G)',
        description: 'Provides financial housing grant for building pucca houses with basic amenities for houseless rural families.',
        eligibility: 'Homeless or living in kutcha/dilapidated houses as per SECC data.',
        benefits: 'Financial grant up to ₹1,20,000 disbursed directly into beneficiary bank account in 3 installments.',
        requiredDocuments: 'Aadhaar Card, Bank Passbook, MGNREGA Job Card, Land documents.',
        applicationProcess: 'Submit application through Gram Panchayat PDO office or citizen portal.',
        status: 'Active'
      },
      {
        schemeName: 'MGNREGA Rural Employment Guarantee',
        description: 'Guarantees 100 days of wage employment per financial year to adult members of rural households.',
        eligibility: 'All adult residents willing to perform unskilled manual work.',
        benefits: 'Daily statutory wages transferred directly to bank account.',
        requiredDocuments: 'Job Card Application Form, Aadhaar Card, Passport Photograph.',
        applicationProcess: 'Apply at Panchayat Office for Job Card issuance.',
        status: 'Active'
      },
      {
        schemeName: 'PM Kisan Samman Nidhi Yojana',
        description: 'Guaranteed annual financial support scheme for small and marginal landholding farmer families.',
        eligibility: 'Small and marginal landholder farmer families with cultivable land.',
        benefits: '₹6,000 per year paid in three equal installments of ₹2,000 directly to bank account.',
        requiredDocuments: 'Land Khata RTC Extract, Aadhaar Card, Bank Passbook.',
        applicationProcess: 'Self-registration online or through Panchayat Common Service Center.',
        status: 'Active'
      },
      {
        schemeName: 'Solar Irrigation Pump Subsidy Scheme',
        description: 'High subsidy assistance for installing solar-powered irrigation pumps on farm land.',
        eligibility: 'Farmers possessing cultivable land with valid water source.',
        benefits: 'Up to 60% government subsidy on solar pump installation.',
        requiredDocuments: 'Electricity NOC, Land Ownership Record, Bank Passbook.',
        applicationProcess: 'Submit application with Gram Panchayat Agriculture Officer recommendation.',
        status: 'Active'
      },
      {
        schemeName: 'Gramin Swachhata Toilet Construction Subsidy',
        description: 'Financial assistance for construction of individual household latrines (IHHL).',
        eligibility: 'Rural households without existing sanitary toilets.',
        benefits: '₹12,000 financial incentive upon successful construction.',
        requiredDocuments: 'Aadhaar Card, Bank Account Details, Photograph of constructed toilet.',
        applicationProcess: 'Apply online or directly through Panchayat Sanitation Officer.',
        status: 'Active'
      }
    ]);

    // 6. Create 5 Notices
    await Notice.create([
      {
        title: 'Gram Sabha General Assembly Meeting Announcement',
        description: 'All villagers are cordially invited to attend the upcoming Gram Sabha meeting to review annual Panchayat development expenditure and approve beneficiary lists for housing schemes.',
        publishDate: new Date('2026-09-10'),
        expiryDate: new Date('2026-09-25'),
        createdBy: adminUser._id
      },
      {
        title: 'Free Health & Cattle Vaccination Camp',
        description: 'Primary Health Center and Veterinary Department will conduct a joint health checkup and cattle vaccination drive at the Panchayat Community Center.',
        publishDate: new Date('2026-09-08'),
        expiryDate: new Date('2026-09-20'),
        createdBy: staffUser2._id
      },
      {
        title: 'Property Tax & Water Supply Tariff Notice',
        description: 'All property owners in Wards 1 to 12 are advised to pay their annual Panchayat property tax and water supply charges before the end of this month.',
        publishDate: new Date('2026-09-01'),
        expiryDate: new Date('2026-09-30'),
        createdBy: staffUser1._id
      },
      {
        title: 'Distribution of Subsidized Agriculture Seeds',
        description: 'High-yield Rabi crop seeds and organic fertilizers will be distributed to registered farmers at 50% subsidy from the Panchayat Agriculture Depot.',
        publishDate: new Date('2026-09-05'),
        expiryDate: new Date('2026-09-22'),
        createdBy: adminUser._id
      },
      {
        title: 'Clean Village Sanitation & Plastic Ban Drive',
        description: 'Gram Panchayat announces a special cleanliness drive on Saturday. Single-use plastic is strictly prohibited within village limits.',
        publishDate: new Date('2026-09-11'),
        expiryDate: new Date('2026-10-05'),
        createdBy: adminUser._id
      }
    ]);

    // 7. Create Village Information Record
    await VillageInformation.create({
      villageName: 'Rampur',
      panchayatName: 'Rampur Gram Panchayat',
      district: 'Sadar District',
      state: 'Karnataka',
      population: '4,850',
      wards: 12,
      contactNumber: '+91 98765 43210',
      email: 'grampanchayat.rampur@gov.in',
      officeAddress: 'Gram Panchayat Secretariat Main Road, Rampur Village - 560001'
    });

    console.log('====================================================');
    console.log(' DEMO DATA SEEDED SUCCESSFULLY FOR B.TECH PROJECT! ');
    console.log('====================================================');
    console.log(' Demo Credentials:');
    console.log(' - Admin:   email: admin@panchayat.gov.in  pass: password123');
    console.log(' - Staff:   email: staff1@panchayat.gov.in pass: password123');
    console.log(' - Citizen: email: ramesh@gmail.com        pass: password123');
    console.log('====================================================');

    process.exit();
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();
