import { useAuth } from "@/hooks/useAuth";
import {
  Building,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

export function Component() {
  const [showSensitiveData, setShowSensitiveData] = useState({
    ssn: false,
    cardNumber: false,
    password: false,
  });

  const { userDetails: userData } = useAuth();

  const [copiedField, setCopiedField] = useState(null);

  const toggleSensitiveData = (field) => {
    setShowSensitiveData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const maskSensitiveData = (data, field) => {
    if (showSensitiveData[field]) return data;

    switch (field) {
      case "ssn":
        return "***-**-" + data.slice(-3);
      case "cardNumber":
        return "**** **** **** " + data.slice(-4);
      case "password":
        return "•".repeat(data.length);
      default:
        return data;
    }
  };

  const InfoCard = ({ title, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
        {/* <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600" />
        </div> */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoItem = ({ label, value, sensitive = false, field = null }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-900 font-mono">
          {sensitive ? maskSensitiveData(value, field) : value}
        </span>
        {sensitive && (
          <button
            onClick={() => toggleSensitiveData(field)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {showSensitiveData[field] ? (
              <EyeOff className="w-4 h-4 text-gray-400" />
            ) : (
              <Eye className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
        {value && (
          <button
            onClick={() => copyToClipboard(value, field || label)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {copiedField === (field || label) ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={userData?.image}
                alt={`${userData?.firstName} ${userData?.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData?.firstName} {userData?.lastName}
                </h2>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {userData?.role}
                </span>
              </div>
              <p className="text-gray-600 mb-1">@{userData?.username}</p>
              <p className="text-gray-500 text-sm">
                {userData?.company.title} at {userData?.company.name}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <InfoCard title="Personal Information" icon={<User />}>
            <div className="space-y-1">
              <InfoItem
                label="Full Name"
                value={`${userData?.firstName} ${userData?.lastName}`}
              />
              <InfoItem label="Maiden Name" value={userData?.maidenName} />
              <InfoItem label="Age" value={userData?.age} />
              <InfoItem label="Gender" value={userData?.gender} />
              <InfoItem label="Birth Date" value={userData?.birthDate} />
              <InfoItem label="Blood Group" value={userData?.bloodGroup} />
              <InfoItem label="Height" value={`${userData?.height} cm`} />
              <InfoItem label="Weight" value={`${userData?.weight} kg`} />
              <InfoItem label="Eye Color" value={userData?.eyeColor} />
              <InfoItem
                label="Hair"
                value={`${userData?.hair.color}, ${userData?.hair.type}`}
              />
            </div>
          </InfoCard>

          {/* Contact Information */}
          <InfoCard title="Contact Information" icon={Mail}>
            <div className="space-y-1">
              <InfoItem label="Email" value={userData?.email} />
              <InfoItem label="Phone" value={userData?.phone} />
              <InfoItem label="Username" value={userData?.username} />
              <InfoItem
                label="Password"
                value={userData?.password}
                sensitive={true}
                field="password"
              />
            </div>
          </InfoCard>

          {/* Address Information */}
          <InfoCard title="Address" icon={MapPin}>
            <div className="space-y-1">
              <InfoItem label="Street" value={userData?.address?.address} />
              <InfoItem label="City" value={userData?.address?.city} />
              <InfoItem
                label="State"
                value={`${userData?.address?.state} (${userData?.address?.stateCode})`}
              />
              <InfoItem
                label="Postal Code"
                value={userData?.address?.postalCode}
              />
              <InfoItem label="Country" value={userData?.address?.country} />
            </div>
          </InfoCard>

          {/* Company Information */}
          <InfoCard title="Company Information" icon={Building}>
            <div className="space-y-1">
              <InfoItem label="Company" value={userData?.company?.name} />
              <InfoItem label="Title" value={userData?.company?.title} />
              <InfoItem
                label="Department"
                value={userData?.company?.department}
              />
              <InfoItem
                label="Office Address"
                value={userData?.company?.address?.address}
              />
              <InfoItem
                label="Office City"
                value={`${userData?.company?.address?.city}, ${userData?.company?.address?.stateCode}`}
              />
            </div>
          </InfoCard>

          {/* Education */}
          <InfoCard title="Education" icon={GraduationCap}>
            <div className="space-y-1">
              <InfoItem label="University" value={userData?.university} />
            </div>
          </InfoCard>

          {/* Financial Information */}
          <InfoCard title="Financial Information" icon={CreditCard}>
            <div className="space-y-1">
              <InfoItem label="Card Type" value={userData?.bank?.cardType} />
              <InfoItem
                label="Card Number"
                value={userData?.bank?.cardNumber}
                sensitive={true}
                field="cardNumber"
              />
              <InfoItem
                label="Card Expiry"
                value={userData?.bank?.cardExpire}
              />
              <InfoItem label="Currency" value={userData?.bank?.currency} />
              <InfoItem label="IBAN" value={userData?.bank?.iban} />
              <InfoItem label="EIN" value={userData?.ein} />
              <InfoItem
                label="SSN"
                value={userData?.ssn}
                sensitive={true}
                field="ssn"
              />
            </div>
          </InfoCard>

          {/* Security & Crypto */}
          <div className="lg:col-span-2">
            <InfoCard title="Security & Cryptocurrency" icon={Shield}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Cryptocurrency
                  </h4>
                  <InfoItem label="Coin" value={userData?.crypto?.coin} />
                  <InfoItem label="Network" value={userData?.crypto?.network} />
                  <InfoItem label="Wallet" value={userData?.crypto?.wallet} />
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = "UserProfile";
