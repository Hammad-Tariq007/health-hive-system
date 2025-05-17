
import { motion } from 'framer-motion';

const GDPR = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-fitness-dark py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1470&auto=format&fit=crop" 
            alt="Data protection" 
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
              GDPR Compliance
            </h1>
            <p className="text-lg text-gray-300">
              Our commitment to data protection and privacy under EU regulations
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
                FitnessFreaks is committed to ensuring the security and protection of the personal information that we process, and to providing a compliant and consistent approach to data protection. This page outlines how we comply with the General Data Protection Regulation (GDPR) and what it means for you as a user of our services.
              </p>
              
              <h2>Our Commitment to GDPR Compliance</h2>
              <p>
                We have always had a robust and effective data protection program in place which complies with existing laws and abides by the data protection principles. However, we recognize that with the implementation of the GDPR, we have made additional improvements to our data governance and accountability to ensure compliance.
              </p>
              <p>
                Our preparation for GDPR compliance has included:
              </p>
              <ul>
                <li>Conducting information audits to identify and document our data flows</li>
                <li>Developing new data protection policies, procedures, and controls</li>
                <li>Implementing technical and organizational measures to ensure data protection by design</li>
                <li>Establishing procedures for handling data subject rights requests</li>
                <li>Updating our privacy notice to be clear and transparent about how we process personal data</li>
                <li>Training our staff on data protection responsibilities and requirements</li>
              </ul>
              
              <h2>Data Protection Principles</h2>
              <p>
                Under GDPR, we adhere to the following data protection principles:
              </p>
              <ol>
                <li><strong>Lawfulness, fairness, and transparency:</strong> We process data lawfully, fairly, and in a transparent manner.</li>
                <li><strong>Purpose limitation:</strong> We collect data for specified, explicit, and legitimate purposes and do not process it in a manner incompatible with those purposes.</li>
                <li><strong>Data minimization:</strong> We ensure that personal data is adequate, relevant, and limited to what is necessary for the purposes for which it is processed.</li>
                <li><strong>Accuracy:</strong> We take reasonable steps to ensure that personal data is accurate and, where necessary, kept up to date.</li>
                <li><strong>Storage limitation:</strong> We keep personal data in a form which permits identification of data subjects for no longer than necessary for the purposes for which it is processed.</li>
                <li><strong>Integrity and confidentiality:</strong> We process personal data in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage.</li>
                <li><strong>Accountability:</strong> We are responsible for and can demonstrate compliance with the above principles.</li>
              </ol>
              
              <h2>Your Rights Under GDPR</h2>
              <p>
                The GDPR provides the following rights for individuals:
              </p>
              <ol>
                <li><strong>The right to be informed:</strong> You have the right to be informed about the collection and use of your personal data.</li>
                <li><strong>The right of access:</strong> You have the right to request a copy of the information that we hold about you.</li>
                <li><strong>The right to rectification:</strong> You have the right to have inaccurate personal data rectified, or completed if it is incomplete.</li>
                <li><strong>The right to erasure:</strong> You have the right to request the deletion or removal of your personal data where there is no compelling reason for its continued processing.</li>
                <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances.</li>
                <li><strong>The right to data portability:</strong> You have the right to obtain and reuse your personal data for your own purposes across different services.</li>
                <li><strong>The right to object:</strong> You have the right to object to processing based on legitimate interests or the performance of a task in the public interest, direct marketing, and processing for purposes of scientific/historical research and statistics.</li>
                <li><strong>Rights in relation to automated decision making and profiling:</strong> You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.</li>
              </ol>
              
              <h2>Exercising Your Rights</h2>
              <p>
                If you wish to exercise any of these rights, please contact our Data Protection Officer:
              </p>
              <ul>
                <li><strong>Email:</strong> dpo@fitnessfreaks.com</li>
                <li><strong>Phone:</strong> +1 (123) 456-7890</li>
                <li><strong>Address:</strong> FitnessFreaks, 123 Fitness Avenue, San Francisco, CA 94107, USA</li>
              </ul>
              <p>
                We will respond to your request without undue delay and in any case within one month of receipt of the request. This period may be extended by two further months where necessary, taking into account the complexity and number of the requests. We will inform you of any such extension within one month of receipt of the request, together with the reasons for the delay.
              </p>
              
              <h2>Data Processing Activities</h2>
              <p>
                FitnessFreaks collects and processes personal data for the following purposes:
              </p>
              <ul>
                <li>Account creation and management</li>
                <li>Provision of fitness and nutrition services</li>
                <li>Personalization of content and recommendations</li>
                <li>Processing payments</li>
                <li>Communication with users</li>
                <li>Analytics and improvement of our services</li>
                <li>Marketing (with your consent)</li>
              </ul>
              <p>
                For detailed information about what data we collect, how we use it, and the legal basis for processing, please refer to our <a href="/privacy" className="text-fitness-primary hover:text-fitness-secondary">Privacy Policy</a>.
              </p>
              
              <h2>International Data Transfers</h2>
              <p>
                FitnessFreaks is based in the United States and we may transfer personal data from the European Economic Area (EEA) to the US. For such transfers, we ensure that appropriate safeguards are in place to protect your personal data, such as:
              </p>
              <ul>
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Binding Corporate Rules (if applicable)</li>
                <li>Adherence to the EU-US Data Privacy Framework</li>
              </ul>
              
              <h2>Data Protection Officer</h2>
              <p>
                We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to this privacy notice and our GDPR compliance. If you have any questions about this notice or how we handle your personal information, please contact the DPO using the details provided above.
              </p>
              
              <h2>Complaints</h2>
              <p>
                We hope that our Data Protection Officer can resolve any query or concern you raise about our use of your information. If this is not possible, you have the right to make a complaint to the data protection authority in your country of residence.
              </p>
              <p>
                For individuals in the EU, a list of national data protection authorities can be found here: <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" className="text-fitness-primary hover:text-fitness-secondary">https://edpb.europa.eu/about-edpb/about-edpb/members_en</a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GDPR;
