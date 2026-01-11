# 🏥 Synapse Healthcare - Patient Management System

A modern healthcare patient management application built with Next.js 16, enabling patients to easily register, book, and manage their medical appointments. The system includes an administrative dashboard for healthcare staff to manage appointments efficiently.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Appwrite](https://img.shields.io/badge/Appwrite-Backend-F02E65?logo=appwrite)

---

## ✨ Features

### 🧑‍⚕️ Patient Features
- **User Registration** - Quick sign-up with name, email, and phone number
- **Patient Profile** - Complete medical profile with personal information, emergency contacts, and medical history
- **Document Upload** - Secure identification document upload with drag-and-drop support
- **Appointment Booking** - Schedule appointments with preferred doctors
- **Appointment Success** - Confirmation page with appointment details

### 👨‍💼 Admin Features
- **Admin Dashboard** - Overview of all appointments with statistics
- **Appointment Management** - Schedule, confirm, or cancel patient appointments
- **Real-time Stats** - Track scheduled, pending, and cancelled appointments
- **Data Table** - Sortable and filterable appointment list
- **Passkey Protection** - Secure admin access with OTP verification

### 📲 Notifications
- **SMS Notifications** - Automated SMS alerts for appointment confirmations and cancellations via Appwrite Messaging

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Forms** | React Hook Form + Zod validation |
| **Backend/BaaS** | Appwrite (Database, Storage, Users, Messaging) |
| **UI Components** | Radix UI primitives |
| **Data Table** | TanStack Table |
| **Phone Input** | react-phone-number-input + libphonenumber-js |
| **Date Picker** | react-datepicker |
| **File Upload** | react-dropzone |

---

## 📁 Project Structure

```
healthcare_synapse/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page with patient form
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── admin/                    # Admin dashboard
│   │   └── page.tsx
│   └── patients/
│       └── [userId]/
│           ├── register/         # Patient registration
│           └── new-appointment/  # Appointment booking
│               ├── page.tsx
│               └── success/      # Booking confirmation
├── components/
│   ├── forms/                    # Form components
│   │   ├── PatientForm.tsx       # Initial sign-up form
│   │   ├── RegisterForm.tsx      # Complete registration form
│   │   └── AppointmentForm.tsx   # Appointment booking form
│   ├── table/                    # Data table components
│   │   ├── columns.tsx           # Table column definitions
│   │   └── DataTable.tsx         # Reusable data table
│   ├── ui/                       # shadcn/ui components
│   ├── AppointmentModal.tsx      # Schedule/Cancel modal
│   ├── CustomFormField.tsx       # Reusable form field
│   ├── FileUploader.tsx          # Document upload component
│   ├── PasskeyModal.tsx          # Admin OTP verification
│   ├── StatCard.tsx              # Dashboard statistics card
│   └── StatusBadge.tsx           # Appointment status indicator
├── lib/
│   ├── appwrite.config.ts        # Appwrite SDK configuration
│   ├── utils.ts                  # Utility functions
│   ├── validation.ts             # Zod schemas
│   └── actions/                  # Server actions
│       ├── patient.actions.ts    # Patient CRUD operations
│       └── appointment.actions.ts# Appointment operations
├── constants/
│   └── index.ts                  # App constants (doctors, etc.)
├── types/
│   ├── index.d.ts                # TypeScript declarations
│   └── appwrite.types.ts         # Appwrite type definitions
└── public/assets/                # Static assets (icons, images)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Appwrite account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sardarabhay/healthcare_synapse.git
   cd healthcare_synapse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
   PROJECT_ID=your_project_id
   API_KEY=your_api_key
   DATABASE_ID=your_database_id
   PATIENT_COLLECTION_ID=your_patient_collection_id
   DOCTOR_COLLECTION_ID=your_doctor_collection_id
   APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
   NEXT_PUBLIC_BUCKET_ID=your_bucket_id
   
   # Admin Passkey
   NEXT_PUBLIC_ADMIN_PASSKEY=your_admin_passkey
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📊 Appwrite Setup

### Collections Required

1. **Patients Collection**
   - userId, name, email, phone, birthDate, gender, address, occupation
   - Emergency contact details
   - Insurance information
   - Medical history fields
   - Identification document fields

2. **Appointments Collection**
   - userId, patient (relationship), primaryPhysician
   - schedule, status (pending/scheduled/cancelled)
   - reason, note, cancellationReason

### Storage Bucket
- Create a bucket for storing patient identification documents

### Messaging (Optional)
- Configure Appwrite Messaging for SMS notifications

---

## 👨‍⚕️ Available Doctors

The system comes pre-configured with the following doctors:
- Dr. Abhinav Verma
- Dr. Priya Sharma
- Dr. Tejas Patel
- Dr. Kartik Srinivasan
- Dr. Nina Gupta
- Dr. Rohan Mehta
- Dr. Sana Khan
- Dr. Anjali Desai
- Dr. Hardik Sharma

---

## 🎨 UI/UX Features

- **Dark Theme** - Modern dark mode interface
- **Responsive Design** - Works on desktop and mobile
- **Form Validation** - Real-time validation with helpful error messages
- **Loading States** - Visual feedback during async operations
- **Accessible** - Built with Radix UI for accessibility

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sardarabhay/healthcare_synapse/issues).

---

## 👤 Author

**Abhay Sardar**

- GitHub: [@sardarabhay](https://github.com/sardarabhay)

---

<p align="center">
  Made with ❤️ by Synapse Healthcare
</p>
