
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-fitness-dark py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1512&auto=format&fit=crop" 
            alt="Legal document" 
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
              Terms of Service
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
                Welcome to FitnessFreaks. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using the FitnessFreaks platform, you agree to comply with and be bound by these Terms.
              </p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Services (website, mobile applications, and any other services provided by FitnessFreaks), you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
              
              <h2>2. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such as by sending an email notification, providing notice through the Services, or updating the "Last Updated" date at the beginning of these Terms. Your continued use of the Services following the changes will constitute your acceptance of the revised Terms.
              </p>
              
              <h2>3. Account Registration</h2>
              <p>
                To access certain features of our Services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2>4. Subscription and Payments</h2>
              <p>
                Some aspects of the Services may be available only with a paid subscription. By signing up for a subscription, you agree to the following:
              </p>
              <ul>
                <li>You authorize us to charge the payment method you provide for the applicable subscription fees.</li>
                <li>Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date.</li>
                <li>Price changes will be effective at the start of the next subscription period.</li>
                <li>You may cancel your subscription at any time through your account settings or by contacting us.</li>
                <li>Refunds are provided in accordance with our Refund Policy.</li>
              </ul>
              
              <h2>5. User Conduct</h2>
              <p>
                You agree not to use the Services to:
              </p>
              <ul>
                <li>Violate any applicable law or regulation.</li>
                <li>Infringe the rights of any third party, including intellectual property rights.</li>
                <li>Harass, abuse, or harm another person.</li>
                <li>Upload or transmit viruses or other malicious code.</li>
                <li>Attempt to circumvent security measures or access unauthorized areas.</li>
                <li>Interfere with the proper working of the Services.</li>
                <li>Collect or store personal data about other users without their consent.</li>
              </ul>
              
              <h2>6. User Content</h2>
              <p>
                Our Services may allow you to post, upload, or submit content ("User Content"). By providing User Content, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, modify, publicly display, publicly perform, reproduce, and distribute your User Content in connection with our Services.
              </p>
              <p>
                You represent and warrant that:
              </p>
              <ul>
                <li>You own or have the necessary rights to the User Content you post.</li>
                <li>Your User Content does not infringe upon the rights of any third party.</li>
                <li>Your User Content does not violate these Terms or any applicable law.</li>
              </ul>
              
              <h2>7. Intellectual Property Rights</h2>
              <p>
                The Services and their content, features, and functionality are owned by FitnessFreaks and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, create derivative works, publicly display, republish, upload, post, or distribute any material from our Services without our prior written consent.
              </p>
              
              <h2>8. Health and Fitness Disclaimer</h2>
              <p>
                The information provided through our Services is for general informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or before beginning any exercise program.
              </p>
              <p>
                By using our Services, you acknowledge and agree that:
              </p>
              <ul>
                <li>Exercise involves inherent risks, including injury and death.</li>
                <li>You are voluntarily participating in fitness activities with knowledge of the dangers involved.</li>
                <li>We are not responsible for any injuries or health problems you may experience as a result of using our Services.</li>
              </ul>
              
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, in no event shall FitnessFreaks be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
              </p>
              
              <h2>10. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless FitnessFreaks, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
              </p>
              
              <h2>11. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
              </p>
              
              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the State of California, without respect to its conflict of laws principles. Any claim or dispute between you and FitnessFreaks that arises out of or relates to these Terms or the Services shall be resolved exclusively in the courts located in San Francisco, California.
              </p>
              
              <h2>13. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and FitnessFreaks regarding the use of the Services, superseding any prior agreements between you and FitnessFreaks relating to the Services.
              </p>
              
              <h2>14. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> legal@fitnessfreaks.com<br />
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

export default Terms;
