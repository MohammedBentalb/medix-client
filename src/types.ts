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

export type TApiError = {
    errors: {
        code: string;
        message: string;
        details: { field: string; message: string }[];
    };
};
