import { certificateData } from "../../../lib/mockData";
import CertificateAvailable from "./components/CertificateAvailabe";
import CertificateNotAvailable from "./components/CertificateNotAvailable";

const SertificatePage = () => {
  const data = certificateData; // ganti isReceived di object atas

  return (
    <div className="container">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-1">

        <h1 className="page-title">Certificates</h1>
        <p className="page-title-desc">View and download internship certificates</p>
      </div>

      {/* Content */}
      <div>
        {data.isReceived ? (
          <CertificateAvailable data={data} />
        ) : (
          <CertificateNotAvailable
            progress={data.projectProgress}
            remainingTasks={data.remainingTasks}
          />
        )}
      </div>
    </div>
  );
};


export default SertificatePage
