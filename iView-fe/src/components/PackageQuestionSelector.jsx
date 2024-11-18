import React, { useState, useEffect } from "react";
import usePackageStore from "../store/usePackageListStore"; 

const PackageQuestionSelector = ({ onPackageSelect }) => {
  const { packages, loadPackageNames } = usePackageStore(); 
  const [selectedPackage, setSelectedPackage] = useState(""); 
  
  useEffect(() => {
    loadPackageNames(); 
  }, [loadPackageNames]);
  
  const handlePackageChange = (event) => {
    const packageName = event.target.value; 
    setSelectedPackage(packageName); 
    onPackageSelect(packageName); 
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