export default function Footer() {
  return (
    <footer className="border-t px-10">
      <div className="container mx-auto max-w-4xl py-10 flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="md:w-1/2 ">
          <h2 className="text-lg font-medium mb-4">Connect with us</h2>
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-4">
            <li>
              <a
                href="https://x.com/"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-lg font-medium mb-4">Contact us</h2>
          <ul className="flex flex-col md:flex-row md:flex-wrap gap-4">
            <li>
              <a
                href="mailto:info@example.com"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                Phone
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                Contact form
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
