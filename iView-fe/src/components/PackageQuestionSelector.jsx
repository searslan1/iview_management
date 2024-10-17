import React, { useState, useEffect } from "react";
import usePackageStore from "../store/usePackageListStore"; // Paketleri backend'den almak için store
const PackageQuestionSelector = ({ onPackageSelect }) => {
  const { packages, loadPackageNames } = usePackageStore(); // Paket isimlerini store'dan alıyoruz
  const [selectedPackage, setSelectedPackage] = useState(""); // Seçilen paketi tutmak için state
  // Sayfa yüklendiğinde paket isimlerini yükle
  useEffect(() => {
    loadPackageNames(); // Paket isimlerini API'den çek
  }, [loadPackageNames]);
  // Dropdown'dan paket seçildiğinde
  const handlePackageChange = (event) => {
    const packageName = event.target.value; // Seçilen paket ismini alıyoruz
    setSelectedPackage(packageName); // State'e atıyoruz
    onPackageSelect(packageName); // Seçilen paketi üst bileşene ilet
  };
  return (
    <div>
      <h1>Select a Package</h1>
      {/* Paket isimlerini içeren dropdown */}
      <select
        id="package-select"
        className="w-full border border-gray-300 rounded-md p-2"
        value={selectedPackage}
        onChange={handlePackageChange}
      >
        <option value="">-- Select a Package --</option>
        {packages.map((pkg, index) => (
          <option key={index} value={pkg}>
            {pkg}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PackageQuestionSelector;