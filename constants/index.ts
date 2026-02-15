export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Abhinav Verma",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Priya Sharma",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Tejas Patel",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Kartik Srinivasan",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Nina Gupta",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Rohan Mehta",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Sana Khan",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Anjali Desai",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};