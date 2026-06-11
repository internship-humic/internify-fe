const mockFAQData = [
  {
    id: 1,
    question: "How do I generate internship certificates?",
    answer: "Once an intern has completed all required project milestones and their final evaluation is approved by a manager, go to the 'Manage Certificates' tab. Select the intern's name, click 'Generate Certificate', and the system will automatically populate the official Internify template with their specific details."
  },
  {
    id: 2,
    question: "What are the technical requirements for interns?",
    answer: "Internify is a web-based LMS. Interns simply need a modern web browser (Chrome, Firefox, or Safari) and a stable internet connection. Some engineering modules may require local development environments, which are detailed in the specific project onboarding documentation."
  },
  {
    id: 3,
    question: "How often is the project dashboard updated?",
    answer: "The dashboard updates in real-time as interns submit tasks or participate in the forum. Weekly progress reports are automatically generated every Friday at 5:00 PM EST and can be exported as PDF files from the Dashboard view."
  }
];

export default function FAQPage() {
  return (
    <div>
      {/* Header Title */}
      <div className="mb-10 ">
        <h1 className="page-title">FAQ</h1>
        <p className="page-title-desc">
          Quick answers to common questions about the Internify LMS platform.
        </p>
      </div>

      {/* FAQ Lists */}
      <div className="space-y-8 max-w-auto">
        {mockFAQData.map((faq) => (
          <div key={faq.id} className="relative shadow-md group py-5 px-10 rounded-md bg-white">
            
            {/* Item Question */}
            <h2 className="text-[17px] font-bold text-[#8A0000] tracking-tight leading-snug mb-2 border-l-4 border-[#8A0000] pl-3">
              {faq.question}
            </h2>
            
            {/* Item Answer */}
            <p className="text-[14px] pl-8 text-[#8A0000] font-light leading-relaxed tracking-normal">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}