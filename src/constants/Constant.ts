import type { AppointmentStatus } from "../types";

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
        { name: "Assistants", href: "/assistants" },
        { name: "My Appointments", href: "/appointments" },
        { name: "My Visits", href: "/my-visits" },
        { name: "Profile", href: "/profile" },
    ],
    ROLE_ASSISTANT: [
        { name: "Doctor Appointments", href: "/doctor-appointments" },
        { name: "Assistants", href: "/assistants" },
        { name: "My Patients", href: "/my-patients" },
        { name: "Profile", href: "/profile" },
    ],
    ROLE_DOCTOR: [
        { name: "Assistants", href: "/assistants" },
        { name: "Appointments", href: "/appointments" },
        { name: "My Patients", href: "/my-patients" },
        { name: "Availability", href: "/doctors/availability" },
        { name: "Profile", href: "/profile" },
    ],
};

const roles = {
    doctor: 'ROLE_DOCTOR',
    patient: 'ROLE_PATIENT',
    assistant: 'ROLE_ASSISTANT',
}

const fullMonths: Record<string, string> = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
};

const darkBannerPrefixes = [
    "/doctors",
    "/assistants",
    "/profile",
    "/my-patients",
    "/patients/history",
    "/visits",
];

const appointmentStatusColors: Record<AppointmentStatus, { bg: string; text: string; dot: string; border: string }> = {
    PENDING:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-500" },
    CONFIRMED: { bg: "bg-brand-50",   text: "text-brand-700",   border: "border-brand-200",   dot: "bg-brand-500" },
    COMPLETED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    CANCELED:  { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    dot: "bg-rose-500" },
};

const appointmentStatuses: (AppointmentStatus | "ALL")[] = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELED"];
export {steps, partners, navLinks, authNavLinks, roles, fullMonths, darkBannerPrefixes, appointmentStatusColors, appointmentStatuses}