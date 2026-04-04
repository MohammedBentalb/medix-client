import { ActivityIcon} from "lucide-react";
import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";

export function Footer() {

  return (
    <footer className="bg-stone-50 pt-16 pb-8 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                <ActivityIcon size={20} strokeWidth={2.5} />
              </div>
              <span className="font-jakarta font-bold text-xl text-stone-900 tracking-tight">
                MedFlow
              </span>
            </div>
            <p className="text-stone-500 text-sm mb-6 max-w-xs leading-relaxed">
              Connecting patients and providers seamlessly. The modern standard
              for healthcare management and communication.
            </p>
            <div className="flex gap-4 text-stone-400">
              <a href="#" className="hover:text-brand-600 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="hover:text-brand-600 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-brand-600 transition-colors">
                <FaGoogle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  For Patients
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  For Doctors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-600 transition-colors">
                  HIPAA Compliance
                </a>
              </li>
              <li>
              <a href="#" className="hover:text-brand-600 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500">
            © 2026 MedFlow Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
