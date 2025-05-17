
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-fitness-dark py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?q=80&w=1470&auto=format&fit=crop" 
            alt="Privacy" 
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
              Privacy Policy
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
                At FitnessFreaks, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share your personal information when you use our website, mobile applications, and services (collectively, the "Services").
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect information you provide directly to us, information we collect automatically when you use our Services, and information from third parties.
              </p>
              
              <h3>Information You Provide</h3>
              <p>
                We collect information you provide when you create an account, fill out forms, communicate with us, or otherwise use our Services. This may include:
              </p>
              <ul>
                <li>Contact information (name, email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information (profile picture, biographical information)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Health and fitness data (weight, height, fitness goals, workout history)</li>
                <li>Content you post or upload (comments, photos, videos)</li>
                <li>Communications you send to us</li>
              </ul>
              
              <h3>Information We Collect Automatically</h3>
              <p>
                When you use our Services, we may automatically collect certain information, including:
              </p>
              <ul>
                <li>Device information (device type, operating system, unique device identifiers)</li>
                <li>Log information (access times, pages viewed, IP address)</li>
                <li>Location information (with your permission)</li>
                <li>Usage information (interactions with our Services)</li>
                <li>Information collected through cookies and similar technologies</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and fulfill orders</li>
                <li>Create and maintain your account</li>
                <li>Personalize your experience</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues, fraud, and illegal activities</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>How We Share Your Information</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul>
                <li>With service providers who need access to perform work on our behalf</li>
                <li>With partners, as authorized by you or as necessary to provide services you've requested</li>
                <li>In response to legal process or government requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, sale, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
              
              <h2>Your Choices</h2>
              <p>
                You have several choices regarding the information you provide to us:
              </p>
              <ul>
                <li><strong>Account Information:</strong> You can update your account information through your account settings.</li>
                <li><strong>Marketing Communications:</strong> You can opt out of marketing emails by following the instructions in those emails.</li>
                <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually change your browser settings to remove or reject cookies.</li>
                <li><strong>Mobile Location Services:</strong> You can control location tracking through your device settings.</li>
                <li><strong>Data Access and Deletion:</strong> Depending on your location, you may have the right to access, correct, or delete your personal information.</li>
              </ul>
              
              <h2>Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide the Services you have requested, comply with our legal obligations, resolve disputes, and enforce our agreements.
              </p>
              
              <h2>Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
              
              <h2>International Data Transfers</h2>
              <p>
                Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that differ from your country.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children. If we learn we have collected personal information from a child under 13, we will delete this information.
              </p>
              
              <h2>Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make material changes, we will notify you as required by law. Your continued use of our Services after the changes are made constitutes your acceptance of the changes.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
