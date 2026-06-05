import { certificateData } from "../../../lib/mockData";
import CertificateAvailable from "./components/CertificateAvailabe";
import CertificateNotAvailable from "./components/CertificateNotAvailable";

const SertificatePage = () => {
  const data = certificateData; // ganti isReceived di object atas

  return (
    <div className="px-15 py-10 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">

        <h1 className="text-4xl font-bold mb-2">Certificates</h1>
        <p className="font-light text-gray-500">View and download internship certificates</p>
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
