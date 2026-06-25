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
import HomeInternPage from "./Pages/Internify/intern/HomeInternPage";
import { InternLayout, MentorLayout } from "./Pages/Internify/layout";
import ProjectsPage from "./Pages/Internify/intern/ProjectsPage";
import SertificatePage from "./Pages/Internify/intern/SertificatePage";
import ProjectDetailPage from "./Pages/Internify/intern/ProjectDetailPage";
import HomeMentorPage from "./Pages/Internify/mentor/HomeMentorPage";
import MentorProjectsPage from "./Pages/Internify/mentor/BaseProjectsPage";
import MentorCertificatePage from "./Pages/Internify/mentor/CertificatePage";
import MentorInternPage from "./Pages/Internify/mentor/InternsPage";
import MentorDetailProject from "./Pages/Internify/mentor/ProjectsPage";
import InternifyLogin from "./Pages/Internify/LoginInternify"
import FAQPage from "./Pages/Internify/FAQpage";
import NotificationList from "./Pages/Internify/NotificationList";
import SettingsContent from "./Pages/Internify/SettingsPage";
import TaskSubmission from "./Pages/Internify/intern/TaskSubmission";
import SertificateList from "./Pages/Internify/intern/SertificateList";
import MentorProjectsDetailPage from "./Pages/Internify/mentor/MentorProjectDetailPage";
import ViewInternSubmission from "./Pages/Internify/mentor/ViewInternSubmission";
import SettingsPage from "./Pages/Internify/mentor/MentorSettingsPage";
import ProtectedRoutes from "./Pages/utils/ProtectedRoute";

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

        {/* Intern only */}
        <Route element={<ProtectedRoutes allowedRoles={["intern"]} />}>
          <Route path="/intern" element={<InternLayout />}>
            <Route index element={<HomeInternPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="certificates" element={<SertificatePage />} />
            <Route path="certificates/all" element={<SertificateList />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="projects/:slug/:taskSlug" element={<TaskSubmission />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="notifications" element={<NotificationList />} />
            <Route path="settings" element={<SettingsContent />} />
          </Route>
        </Route>

        {/* Mentor only */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/mentor" element={<MentorLayout />}>
            <Route index element={<HomeMentorPage />} />
            <Route path="projects" element={<MentorProjectsPage />} />
            <Route path="certificates" element={<MentorCertificatePage />} />
            <Route path="intern" element={<MentorInternPage />} />
            <Route path="projects/:slug" element={<MentorDetailProject />} />
            <Route path="projects/:slug/:taskSlug" element={<MentorProjectsDetailPage />} />
            <Route path="projects/:slug/:taskSlug/:nameIntern" element={<ViewInternSubmission />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="notifications" element={<NotificationList />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
