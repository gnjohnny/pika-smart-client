import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div>
              <Link to="/" className="flex items-center">
                <img src="/pika-smart-logo.svg" alt="pika smart logo" />
              </Link>
            </div>
            <p className="text-primary leading-relaxed">
              Empowering home cooks with AI-driven culinary creativity. Cook
              smarter, eat better.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6">Product</h4>
            <ul className="space-y-4 text-primary/80">
              <li className="hover:text-orange-500 cursor-pointer">Features</li>
              <li className="hover:text-orange-500 cursor-pointer">Pricing</li>
              <li className="hover:text-orange-500 cursor-pointer">
                API Access
              </li>
              <li className="hover:text-orange-500 cursor-pointer">
                Integrations
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6">Company</h4>
            <ul className="space-y-4 text-primary/80">
              <li className="hover:text-orange-500 cursor-pointer">About Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Careers</li>
              <li className="hover:text-orange-500 cursor-pointer">Blog</li>
              <li className="hover:text-orange-500 cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-6">Stay Updated</h4>
            <p className="text-primary/80 mb-4">
              Get the latest AI recipes and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-gray-50 px-4 py-3 rounded-l-lg outline-none w-full border border-gray-200 focus:border-orange-500 placeholder:text-primary/80"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-lg transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Pika Smart Inc. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            <span className="hover:text-gray-600 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-600 cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-gray-600 cursor-pointer">
              Cookie Settings
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
