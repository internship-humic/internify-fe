import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import AboutUs from "./Pages/AboutUs";
import Internships from "./Pages/Internships";
import InternshipDetails from "./Pages/InternshipDetails";
import RegisterInternships from "./Pages/RegisterInternships";
import RegisterDone from "./Pages/RegisterDone";
import OurDeveloper from "./Pages/OurDeveloper";
import LoginAdmin from "./Pages/LoginAdmin";
import AddProduct from "./Pages/AddProduct";
import InternshipList from "./Pages/InternshipList";
import InternshipDetailsAdmin from "./Pages/InternshipDetailsAdmin";
import EditKontenAdmin from "./Pages/EditKontenAdmin";
import PartnershipsList from "./Pages/PartnershipsList";
import AddPartnershipAdmin from "./Pages/AddPartnershipAdmin";
import DetailsProduct from "./Pages/DetailsProduct";
import PrivateRoute from "./Pages/utils/PrivateRoute";
import EditPartnerships from "./Pages/EditPartnerships";
import ListLowongan from "./Pages/ListLowongan";
import ListProduct from "./Pages/ListProduct";
import AddProductHumic from "./Pages/AddProductHumic";
import EditProductHumic from "./Pages/EditProductHumic";
import ListFeedback from "./Pages/ListFeedback";
import AddFeedback from "./Pages/AddFeedback";
import ListFaq from "./Pages/ListFaq";
import AddFaq from "./Pages/AddFAQ";
import Dashboard from "./Pages/Dashboard";
import EditFaq from "./Pages/EditFAQ";
import EditFeedback from "./Pages/EditFeedback";
import EditLowongan from "./Pages/EditLowongan";
import HomeInternPage from "./Pages/internify/intern/HomeInternPage";
import { InternLayout, MentorLayout } from "./Pages/internify/layout";
import ProjectsPage from "./Pages/internify/intern/ProjectsPage";
import SertificatePage from "./Pages/internify/intern/SertificatePage";
import ProjectDetailPage from "./Pages/internify/intern/ProjectDetailPage";
import HomeMentorPage from "./Pages/internify/mentor/HomePage";
import MentorProjectsPage from "./Pages/internify/mentor/BaseProjectsPage";
import MentorCertificatePage from "./Pages/internify/mentor/CertificatePage";
import MentorInternPage from "./Pages/internify/mentor/InternsPage";
import MentorDetailProject from "./Pages/internify/mentor/ProjectsPage";
import InternifyLogin from "./Pages/internify/page"
import FAQPage from "./Pages/internify/FAQpage";
import NotificationList from "./Pages/internify/NotificationList";
import SettingsContent from "./Pages/internify/SettingsPage";
import TaskSubmission from "./Pages/internify/intern/TaskSubmission";
import SertificateList from "./Pages/internify/intern/SertificateList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/details/:id" element={<InternshipDetails />} />
        <Route path="/register-intern/:id" element={<RegisterInternships />} />
        <Route path="/register-done" element={<RegisterDone />} />
        <Route path="/our-developer" element={<OurDeveloper />} />
        <Route path="/details-product/:id" element={<DetailsProduct />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Endpoint khusus admin login langsung di inject ajah */}
        <Route element={<PrivateRoute />}>
          <Route path="/add-product-admin" element={<AddProduct />} />
          <Route path="/internships-list" element={<InternshipList />} />
          <Route path="/lowongan-list" element={<ListLowongan />} />
          <Route path="/product-list" element={<ListProduct />} />
          <Route path="/add-product-humic" element={<AddProductHumic />} />
          <Route path="/edit-product-humic/:id" element={<EditProductHumic />} />
          <Route path="/kontent-aktif/edit/:id" element={<EditKontenAdmin />} />
          <Route path="/internships-details-admin/:id" element={<InternshipDetailsAdmin />} />
          <Route path="/partnership-admin" element={<PartnershipsList />} />
          <Route path="/add-partnership" element={<AddPartnershipAdmin />} />
          <Route path="/edit-partnership/:id" element={<EditPartnerships />} />
          <Route path="/feedback-list" element={<ListFeedback />} />
          <Route path="/add-feedback" element={<AddFeedback />} />
          <Route path="/faq-list" element={<ListFaq />} />
          <Route path="/add-faq" element={<AddFaq />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-faq/:id" element={<EditFaq />}></Route>
          <Route path="/edit-feedback/:id" element={<EditFeedback />}></Route>
          <Route path="/edit-lowongan/:id" element={<EditLowongan />}></Route>

        </Route>

        <Route path="/login-internify" element={<InternifyLogin />} />
        <Route path="/intern" element={<InternLayout />}>
          <Route index element={<HomeInternPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="certificates" element={<SertificatePage />} />
          <Route path="certificates/all" element={<SertificateList />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="projects/:slug/:TaskSlug" element={<TaskSubmission />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="notifications" element={<NotificationList />} />
          <Route path="settings" element={<SettingsContent />} />
        </Route>

        <Route path="/mentor" element={<MentorLayout />}>
          <Route index element={<HomeMentorPage />} />
          <Route path="projects" element={<MentorProjectsPage />} />
          <Route path="certificates" element={<MentorCertificatePage />} />
          <Route path="intern" element={<MentorInternPage />} />
          <Route path="projects/:slug" element={<MentorDetailProject />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="notifications" element={<NotificationList />} />
          <Route path="settings" element={<SettingsContent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
