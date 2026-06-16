import { certificateData } from "../../../lib/mockSertificates";
import CertificateAvailable from "./components/CertificateAvailabe";
import CertificateNotAvailable from "./components/CertificateNotAvailable";
import SertificateHistory from "./components/CertificateHistory";

const SertificatePage = () => {
  const data = certificateData;

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">View and download internship certificates</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Kiri: Content */}
        <div className="w-full lg:w-5/8 flex flex-col">
          {data.isReceived ? (
            <CertificateAvailable data={data} />
          ) : (
            <CertificateNotAvailable
              progress={data.projectProgress}
              remainingTasks={data.remainingTasks}
            />
          )}
        </div>
        {/* Kanan: History */}
        <div className="w-full lg:w-3/8 flex-shrink-0">
          <SertificateHistory />
        </div>
      </div>
    </div>
  );
};

export default SertificatePage;
