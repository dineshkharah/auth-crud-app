import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-center py-4 mt-auto">
      <div className="flex justify-center items-center gap-2">
        <a
          href="https://www.linkedin.com/in/dinesh-kharah"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaLinkedin className="text-lg" />
        </a>

        <span>|</span>

        <span>
          Created by{" "}
          <a
            href="https://github.com/dineshkharah"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-white transition"
          >
            Dinesh Kharah
          </a>
        </span>

        <span>|</span>

        <a
          href="https://github.com/dineshkharah/auth-crud-app.git"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold hover:text-white transition"
        >
          Source Code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
