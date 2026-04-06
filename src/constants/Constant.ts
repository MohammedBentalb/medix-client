const steps = [
    {
        number: "01",
        title: "Create your account",
        description:
            "Sign up in minutes. Patients can verify their identity, and providers can set up their practice profile securely.",
    },
    {
        number: "02",
        title: "Connect & Schedule",
        description:
            "Find your doctor or invite your patients. Sync calendars and start booking appointments immediately.",
    },
    {
        number: "03",
        title: "Manage everything",
        description:
            "Access records, send messages, and handle prescriptions all from one intuitive, secure dashboard.",
    },
];

const partners = [
    "Mercy General",
    "St. Jude's Clinic",
    "Pacific Health",
    "Summit Medical",
    "Valley Care",
];



const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "For Patients", href: "/#features" },
    { name: "For Doctors", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
];

const authNavLinks = {
    ROLE_PATIENT: [
        { name: "Doctors", href: "/doctors" },
        { name: "My Appointments", href: "/appointments" },
        { name: "Profile", href: "/profile" },
    ],
    ROLE_ASSISTANT: [
        { name: "Doctor Appointments", href: "/doctor-appointments" },
        { name: "Profile", href: "/profile" },
    ],
    ROLE_DOCTOR: [
        { name: "Nurses", href: "/nurses" },
        { name: "Appointments", href: "/appointments" },
        { name: "My Patients", href: "/my-patients" },
        { name: "Profile", href: "/profile" },
    ],
};

export {steps, partners, navLinks, authNavLinks}