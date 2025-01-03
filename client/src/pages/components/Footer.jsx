import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    gsap.from(footerRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <footer className="bg-blue-500 text-white py-8">
      <div
        className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        ref={footerRef}
      >
        <div className="hidden md:inline-block">
          <h3 className="text-lg font-bold mb-3">About Us</h3>
          <p className="text-sm">
            Samridhi Enterprises is your one-stop solution for premium
            automobile parts. We aim to deliver quality products at competitive
            prices with unmatched customer service.
          </p>
        </div>

        <div className="hidden md:inline-block">
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/about-us" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:inline-block">
          <h3 className="text-lg font-bold mb-3">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@samridhienterprises.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Address: 123 Street, New Delhi, India</li>
            <a
              href="https://wa.me/+919304748651"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-green-300"
            >
              <p className="text-sm">Whatsapp:</p>
              <FaWhatsapp size={20} />
            </a>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6 text-sm md:hidden">
        &copy; {new Date().getFullYear()} Samridhi Enterprises. All rights
        reserved.
      </div>

      <div className="text-center mt-4 text-sm md:hidden flex flex-wrap justify-center">
        <Link to="/contact" className="hover:text-gray-300 mx-2">
          Get In Touch
        </Link>
        <p className="text-gray-300 mx-2">|</p>
        <Link to="/about-us" className="hover:text-gray-300 mx-2">
          About
        </Link>
        <p className="text-gray-300 mx-2">|</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-gray-300 mx-2"
        >
          <FaWhatsapp className="hover:text-green-300 hover:size-6 size-5" />
        </a>
      </div>

      <div className="" ref={socialRef}></div>

      <div className="text-center mt-6 text-sm hidden md:block">
        &copy; {new Date().getFullYear()} Samridhi Enterprises. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
