
import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-fitness-dark py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop" 
            alt="Cookies" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark via-fitness-dark/90 to-fitness-dark/70"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-300">
              Last updated: May 17, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p>
                This Cookie Policy explains how FitnessFreaks ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and applications (collectively, "Services"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2>What are cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, FitnessFreaks) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h2>Why do we use cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Services to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Services. Third parties serve cookies through our Services for advertising, analytics, and other purposes.
              </p>
              
              <h2>Types of cookies we use</h2>
              <p>
                The specific types of first and third-party cookies served through our Services include:
              </p>
              
              <h3>Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our Services and to use some of their features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Services, you cannot refuse them without impacting how our Services function.
              </p>
              
              <h3>Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our Services but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h3>Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our Services are being used or how effective our marketing campaigns are, or to help us customize our Services for you.
              </p>
              
              <h3>Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
              
              <h3>Social Media Cookies</h3>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our Services through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>
              
              <h2>How can you control cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by following the directions provided in our cookie banner.
              </p>
              
              <p>
                You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Services though your access to some functionality and areas may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
              </p>
              
              <h3>Browser Controls</h3>
              <p>
                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-fitness-primary hover:text-fitness-secondary">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-fitness-primary hover:text-fitness-secondary">www.allaboutcookies.org</a>.
              </p>
              
              <h4>How to manage cookies in different web browsers</h4>
              <ul>
                <li><strong>Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647" className="text-fitness-primary hover:text-fitness-secondary">https://support.google.com/chrome/answer/95647</a></li>
                <li><strong>Safari:</strong> <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" className="text-fitness-primary hover:text-fitness-secondary">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471</a></li>
                <li><strong>Firefox:</strong> <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-fitness-primary hover:text-fitness-secondary">https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop</a></li>
                <li><strong>Microsoft Edge:</strong> <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-fitness-primary hover:text-fitness-secondary">https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge</a></li>
              </ul>
              
              <h2>Do you serve targeted advertising?</h2>
              <p>
                Third parties may serve cookies on your computer or mobile device to serve advertising through our Services. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by third parties using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.
              </p>
              
              <h2>How often will you update this Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h2>Where can I get further information?</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> privacy@fitnessfreaks.com<br />
                <strong>Address:</strong> 123 Fitness Avenue, San Francisco, CA 94107<br />
                <strong>Phone:</strong> +1 (123) 456-7890
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
