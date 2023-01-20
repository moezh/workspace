import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center font-light font-sans pt-8 pb-4">
      <div>
        <Link href="../contact-mh">Contact</Link>
        <span className="ml-1 mr-1">|</span>
        <Link href="../privacy-policy">Privacy Policy</Link>
        <span className="ml-1 mr-1">|</span>
        <Link href="../terms-of-service">Terms of Service</Link>
      </div>
      <div>Copyright © {new Date().getFullYear()} - All right reserved</div>
    </footer>
  );
};

export default Footer;
