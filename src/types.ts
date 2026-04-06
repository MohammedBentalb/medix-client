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

export type TUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    image: string;
    nationalId: string;
    type: userType;
    status: string;
    profile: null | object;
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
