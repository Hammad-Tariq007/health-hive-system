
import { motion } from 'framer-motion';

const Accessibility = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative bg-fitness-dark py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop" 
            alt="Accessibility" 
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
              Accessibility Statement
            </h1>
            <p className="text-lg text-gray-300">
              Our commitment to digital accessibility for all users
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
                FitnessFreaks is committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
              
              <h2>Our Commitment</h2>
              <p>
                At FitnessFreaks, we believe that fitness should be accessible to everyone. This commitment extends to our digital platforms, where we strive to provide a user experience that is inclusive and accessible to all individuals, including those with disabilities.
              </p>
              <p>
                We are actively working to increase the accessibility and usability of our website and mobile applications, and in doing so we aim to adhere to many of the available standards and guidelines.
              </p>
              
              <h2>Conformance Status</h2>
              <p>
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
              </p>
              <p>
                The guidelines have three levels of accessibility (A, AA, and AAA). We've chosen Level AA as our target.
              </p>
              
              <h2>Our Accessibility Features</h2>
              <p>
                Some of the specific measures we have taken to ensure accessibility include:
              </p>
              <ul>
                <li><strong>Keyboard Navigation:</strong> All functionality is operable through a keyboard interface without requiring specific timings for individual keystrokes.</li>
                <li><strong>Text Alternatives:</strong> We provide text alternatives for non-text content to ensure it can be changed into other forms people need, such as large print, braille, speech, symbols, or simpler language.</li>
                <li><strong>Color Contrast:</strong> We ensure sufficient contrast between text and background to make content readable for users with visual impairments.</li>
                <li><strong>Resizable Text:</strong> Our text can be resized up to 200% without loss of content or functionality.</li>
                <li><strong>Consistent Navigation:</strong> Navigational mechanisms that are repeated throughout our website occur in the same relative order each time they are repeated.</li>
                <li><strong>Error Identification:</strong> If an input error is detected, the item that is in error is identified and the error is described to the user in text.</li>
                <li><strong>ARIA Labels:</strong> We use ARIA (Accessible Rich Internet Applications) attributes to enhance accessibility for users with screen readers.</li>
                <li><strong>Focus Indicators:</strong> We ensure that keyboard focus indicators are visible and clear.</li>
              </ul>
              
              <h2>Accessibility Features in Our Fitness Content</h2>
              <p>
                Beyond standard web accessibility practices, we've taken steps to make our fitness content more accessible:
              </p>
              <ul>
                <li><strong>Video Descriptions:</strong> Workout videos include detailed audio descriptions of movements.</li>
                <li><strong>Alternative Exercises:</strong> We provide adaptive exercise options for various fitness levels and abilities.</li>
                <li><strong>Clear Instructions:</strong> Written exercise instructions are concise and easy to understand.</li>
                <li><strong>Visual Guides:</strong> Step-by-step images accompany complex movement patterns.</li>
                <li><strong>Customizable Workouts:</strong> Users can modify workouts based on their individual needs and capabilities.</li>
              </ul>
              
              <h2>Compatibility with Assistive Technology</h2>
              <p>
                Our website is designed to be compatible with various assistive technologies, including:
              </p>
              <ul>
                <li>Screen readers (such as NVDA, JAWS, and VoiceOver)</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Alternative keyboards and pointing devices</li>
              </ul>
              
              <h2>Known Limitations</h2>
              <p>
                Despite our efforts to ensure accessibility, there may be some areas of our website that are not fully accessible. We are actively working to identify and address these issues.
              </p>
              <p>
                Some known limitations include:
              </p>
              <ul>
                <li>Some older PDF documents may not be fully accessible.</li>
                <li>Some video content may not have captions or audio descriptions available.</li>
                <li>Some third-party content or functionality may not be fully accessible.</li>
              </ul>
              
              <h2>Continuous Improvement</h2>
              <p>
                We are committed to continually improving the accessibility of our website and services. We regularly review our website and content to identify and address accessibility issues, and we welcome feedback from our users.
              </p>
              
              <h2>Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of the FitnessFreaks website and applications. If you encounter accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> accessibility@fitnessfreaks.com</li>
                <li><strong>Phone:</strong> +1 (123) 456-7890</li>
                <li><strong>Form:</strong> Use our <a href="/contact" className="text-fitness-primary hover:text-fitness-secondary">contact form</a></li>
              </ul>
              <p>
                We aim to respond to feedback within 2 business days.
              </p>
              
              <h2>This Statement</h2>
              <p>
                This statement was created on May 17, 2025, using the <a href="https://www.w3.org/WAI/planning/statements/" className="text-fitness-primary hover:text-fitness-secondary">W3C Accessibility Statement Generator Tool</a>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accessibility;
