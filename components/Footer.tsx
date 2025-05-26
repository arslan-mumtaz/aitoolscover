// components/Footer.js
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <span className="font-bold text-xl">Tools Cover</span>
            </div>
            <p className="text-[#4a4a4a] font-semibold mb-4 ">
              Never miss out on the latest developments in AI. AI Tools Cover
              delivers daily updates on new tools, ensuring you stay informed
              about the freshest and most impactful technologies.
            </p>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                "Design",
                "Marketing",
                "Productivity",
                "Management",
                "Advertisement",
                "Automation",
                "Podcasting",
                "Education",
                "Chatbot",
                "Video",
                "Chat",
                "SEO",
              ].map((item) => (
                <li key={item}>
                  <Link href={`/resources/${item.toLowerCase()}`}>
                    <span className="text-[#4a4a4a] font-semibold hover:text-purple-600 cursor-pointer">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools Column */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">AI Tools</h3>
            <ul className="space-y-3">
              {[
                "Rytr",
                "Merlin",
                "Cuppa",
                "Descript",
                "StealthGPT",
                "Simplified AI",
                "Outranking",
                "Describely",
                "Veeroll",
                "Alli AI",
                "Frase",
                "Scite",
              ].map((tool) => (
                <li key={tool}>
                  <Link href={`/tools/${tool.toLowerCase().replace(" ", "-")}`}>
                    <span className="text-[#4a4a4a] font-semibold hover:text-purple-600 cursor-pointer">
                      {tool}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {["Submit Tool", "Update Tool", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/support/${item.toLowerCase().replace(" ", "-")}`}
                  >
                    <span className="text-[#4a4a4a] font-semibold hover:text-purple-600 cursor-pointer">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Contact</h3>
            <a
              href="mailto:support@aitoolscover.com"
              className="text-[#4a4a4a] font-semibold"
            >
              support@aitoolscover.com
            </a>

            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/aitoolscover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                href="https://linkedin.com/company/aitoolscover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
