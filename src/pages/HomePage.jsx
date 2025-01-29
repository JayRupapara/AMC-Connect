import { FaMapMarkerAlt, FaBell, FaChartLine } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';


const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-base-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Make Ahmedabad Better Together
              </h1>
              <p className="text-xl mb-8">
                Report civic issues, track progress, and help improve your city.
              </p>
              <button className="bg-base-100 text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
                Report an Issue
              </button>
            </div>
            <div className="md:w-1/2">
              {/* Add hero image here */}
              <div className="bg-secondary h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-primary text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
                <p className="text-neutral">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center max-w-xs">
                <div className="w-16 h-16 bg-primary text-base-100 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">{step.title}</h3>
                <p className="text-neutral">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary text-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Data Arrays
const features = [
  {
    icon: <MdReport />,
    title: "Easy Reporting",
    description: "Report issues with just a few clicks and photos"
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Geotagging",
    description: "Precise location tracking for faster resolution"
  },
  {
    icon: <FaBell />,
    title: "Real-time Updates",
    description: "Get notifications on complaint progress"
  },
  {
    icon: <FaChartLine />,
    title: "Track Progress",
    description: "Monitor status of reported issues"
  }
];

const steps = [
  {
    title: "Report Issue",
    description: "Take a photo and describe the civic issue you've found"
  },
  {
    title: "Auto-Assignment",
    description: "Complaint is assigned to relevant department"
  },
  {
    title: "Track Progress",
    description: "Get real-time updates until resolution"
  }
];

const stats = [
  { value: "10,000+", label: "Issues Resolved" },
  { value: "24hrs", label: "Avg. Response Time" },
  { value: "50,000+", label: "Active Users" },
  { value: "95%", label: "Satisfaction Rate" }
];

export default HomePage;
