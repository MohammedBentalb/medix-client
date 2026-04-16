export type userType = "ROLE_ASSISTANT" | "ROLE_PATIENT" | "ROLE_DOCTOR"

export type SignInFormProps = {
  role: userType
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorTheme: {
    primary: string;
    primaryHover: string;
    light: string;
    text: string;
    borderFocus: string;
    ringFocus: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

export type TDoctorProfile = {
    speciality: string;
    licenseNumber: string;
    yearsExperience: number;
    consultationFee: number;
    bio: string;
}

export type TPatientProfile = {
    dateOfBirth: string;
    gender: string;
    bloodType: string | null;
    address: string | null;
    emergencyContactName: string | null;
    emergencyContactPhone: string | null;
}

export type TAssistantProfile = {
    doctorId: string | null;
}

export type TUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    image: string | null;
    nationalId: string | null;
    type: userType;
    status: string;
    profile: TDoctorProfile | TPatientProfile | TAssistantProfile | null;
    createdAt: string;
}

export type TAuthResponse = {
    success: boolean;
    data: {
        accessToken: string;
        expiresIn: number;
        tokenType: string;
        user: TUser;
    };
    meta: {
        request_id: string;
        service: string;
        timestamp: string;
    };
}

export type TPagination = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
}

export type TPaginatedResponse<T> = {
    success: boolean;
    data: {
        users: T[];
        pagination: TPagination;
    };
    meta: {
        request_id: string;
        service: string;
        timestamp: string;
    };
}

export type TApiError = {
    errors: {
        code: string;
        message: string;
        details: { field: string; message: string }[];
    };
};


export type SignInTempleteProps = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    gradientFrom: string;
    gradientTo: string;
    children: React.ReactNode;
  }


export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";
export type AppointmentType = "INPERSON" | "MEET" | "CALL";

export type TAppointment = {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  bookedBy: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type TDiagnosis = {
  id: string;
  name: string;
  type: "PRIMARY" | "SECONDARY";
  severity: "MILD" | "MODERATE" | "SEVERE";
  notes: string;
};

export type TPrescriptionItem = {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: number;
  route: string;
  instructions: string;
};

export type TPrescription = {
  id: string;
  notes: string;
  items: TPrescriptionItem[];
};

export type TVisit = {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  visitedAt: string;
  chiefComplaint: string;
  clinicalNotes: string;
  diagnoses: TDiagnosis[];
  prescription: TPrescription | null;
  createdAt: string;
};

export type TVisitFormDiagnosis = {
  id: string;
  name: string;
  type: string;
  severity: string;
  notes: string;
};

export type TVisitFormPrescriptionItem = {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions: string;
};

export type TSlot = { start: string; end: string };
export type TAvailability = Record<string, Record<string, TSlot[]>>;

export type AppointmentSectionProps = { availability: TAvailability | undefined; isAvailabilityLoading: boolean; user: TUser | null; doctorId: string, doctorName: string };
