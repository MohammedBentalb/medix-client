import { ActivityIcon } from "lucide-react";
import { Link } from "react-router";
import type { SignInTempleteProps } from "../../types";

export function SignUpTemplete({ icon, title, subtitle, gradientFrom, gradientTo,  children }: SignInTempleteProps) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      <div className={`hidden md:flex md:w-5/12 lg:w-[42%] relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} p-12 flex-col justify-between text-white shrink-0`}>
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="auth-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 0H20L0 20M40 40V20L20 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors w-fit mb-16"
          >
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <ActivityIcon size={24} strokeWidth={2.5} />
            </div>
            <span className="font-jakarta font-bold text-xl tracking-tight">
              MedFlow
            </span>
          </Link>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              {icon}
            </div>
            <h1 className="text-4xl lg:text-5xl font-jakarta font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-white/60">
          <span>Secure</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Encrypted</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>HIPAA Compliant</span>
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="w-full max-w-xl mx-auto px-6 lg:px-10 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
