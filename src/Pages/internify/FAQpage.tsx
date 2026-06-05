import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl px-6 py-6 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-400 font-medium mb-1">
        <span className="cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
        <ChevronRight className="w-3.5 h-3.5 mx-1" />
        <span className="text-[#B30000] font-semibold">FAQ</span>
      </div>

      {/* Header Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">FAQ</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quick answers to common questions about the Internify LMS platform.
        </p>
      </div>

      {/* FAQ Lists */}
      <div className="space-y-8 max-w-4xl">
        {mockFAQData.map((faq) => (
          <div key={faq.id} className="relative pl-6 group">
            
            {/* Indikator Garis/Kotak Kecil Merah di Sisi Kiri sesuai gambar */}
            <div className="absolute left-0 top-1.5 w-1 h-3.5 bg-[#B30000] rounded-sm transition-transform duration-200 group-hover:scale-y-125"></div>
            
            {/* Item Question */}
            <h2 className="text-[17px] font-bold text-[#8A0000] tracking-tight leading-snug mb-2">
              {faq.question}
            </h2>
            
            {/* Item Answer */}
            <p className="text-sm text-gray-500 font-medium leading-relaxed tracking-normal">
              {faq.answer}
            </p>
            
            {/* Divider Line tipis di bawah setiap item, kecuali item terakhir */}
            {faq.id !== mockFAQData.length && (
              <div className="border-b border-gray-100 pt-8"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}