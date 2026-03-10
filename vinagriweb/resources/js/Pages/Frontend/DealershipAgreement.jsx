import React, { useState } from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/DealershipAgreement.css";

export default function DealershipAgreement() {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherCrop, setOtherCrop] = useState("");
  const [formData, setFormData] = useState({
    salesManager: "",
    districtArea: "",
    applicantName: "",
    nic: "",
    dob: "",
    businessName: "",
    businessType: "",
    registrationNo: "",
    annualRequirement: "",
    annualSales: "",
    fertilizerTypes: [],
    targetCrops: [],
    region: "",
    agrarianCenter: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      province: ""
    },
    phone: "",
    mobile: "",
    whatsapp: "",
    facebook: "",
    qrPhone: "",
    website: "",
    email: "",
    googleLocation: "",
    authorizedPersons: "",
    bankDetails: [
      { bank: "", branch: "", accountNo: "" },
      { bank: "", branch: "", accountNo: "" }
    ],
    chequeSigners: "",
    docRegistration: null,
    docNIC: null,
    signature: null,
    stamp: null,
    date: ""
  });

  const handleOtherCheck = (e) => {
    setShowOtherInput(e.target.checked);
    if (!e.target.checked) setOtherCrop("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleBankChange = (index, field, value) => {
    const updatedBankDetails = [...formData.bankDetails];
    updatedBankDetails[index][field] = value;
    setFormData(prev => ({
      ...prev,
      bankDetails: updatedBankDetails
    }));
  };

  const handleFileChange = (field, files) => {
    setFormData(prev => ({
      ...prev,
      [field]: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <FrontendLayout title="Dealership Agreement">
      <div className="fertilizer-page">

        <div className="dealership-form-container">
          <h1>Dealership Agreement Form</h1>
          <p>
            Welcome to our dealership program. Please fill out all the required
            details below. We'll review and get back to you soon.
          </p>

          <form className="dealership-form" onSubmit={handleSubmit}>
            {/* 1. Sales Manager */}
            <label>
              Sales Manager:
              <input
                type="text"
                name="salesManager"
                value={formData.salesManager}
                onChange={handleInputChange}
                placeholder="Enter Sales Manager name"
                required
              />
            </label>

            {/* 2. District and Area */}
            <label>
              District and Area:
              <input
                type="text"
                name="districtArea"
                value={formData.districtArea}
                onChange={handleInputChange}
                placeholder="Enter District and Area"
                required
              />
            </label>

            {/* 3. Name of Applicant */}
            <label>
              Name of Applicant:
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleInputChange}
                placeholder="Enter Applicant name"
                required
              />
            </label>

            {/* 4. NIC */}
            <label>
              NIC No:
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                placeholder="Enter NIC Number"
                required
              />
            </label>

            {/* 5. DOB */}
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </label>

            {/* 6. Business Name */}
            <label>
              Business Name (Factory/Tea Collector/Dealer/ASC/MPCS):
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter Business Name"
                required
              />
            </label>

            {/* 7. Type of Business */}
            <label>
              Type of Business:
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Limited">Limited</option>
                <option value="Partnership">Partnership</option>
                <option value="Sole Trader">Sole Trader</option>
                <option value="Proprietor">Proprietor</option>
              </select>
            </label>

            {/* 8. Registration No */}
            <label>
              Registration No:
              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleInputChange}
                placeholder="Enter Registration No"
                required
              />
            </label>

            {/* 9-10 Annual Requirements */}
            <label>
              Annual Requirement of Fertilizer (MT):
              <input
                type="number"
                name="annualRequirement"
                value={formData.annualRequirement}
                onChange={handleInputChange}
                placeholder="Vin Agribusiness Quantity"
                min="0"
                step="0.01"
              />
            </label>

            <label>
              Annual Sales Volume (MT):
              <input
                type="number"
                name="annualSales"
                value={formData.annualSales}
                onChange={handleInputChange}
                placeholder="Enter Sales Volume"
                min="0"
                step="0.01"
              />
            </label>

            {/* 11. Fertilizer Type */}
            <fieldset>
              <legend>Fertilizer Type</legend>
              <div className="checkbox-grid">
                <label>
                  <input type="checkbox" name="straightFertilizer" /> Straight Fertilizer
                </label>
                <label>
                  <input type="checkbox" name="blendedFertilizer" /> Blended Fertilizer
                </label>
              </div>
            </fieldset>

            {/* 13. Target Crop */}
            <fieldset>
              <legend>Target Crop</legend>
              <div className="checkbox-grid">
                {["Paddy", "Vegetable", "Coconut", "Rubber", "Tea", "Fruit"].map(
                  (crop) => (
                    <label key={crop}>
                      <input type="checkbox" name={`crop-${crop.toLowerCase()}`} /> {crop}
                    </label>
                  )
                )}
                <label>
                  <input
                    type="checkbox"
                    onChange={handleOtherCheck}
                    checked={showOtherInput}
                  />{" "}
                  Other
                </label>
              </div>

              {showOtherInput && (
                <input
                  type="text"
                  placeholder="Please specify other crop"
                  value={otherCrop}
                  onChange={(e) => setOtherCrop(e.target.value)}
                  className="other-input"
                />
              )}
            </fieldset>

            {/* 14-15 */}
            <label>
              TI/RDO/CDO/AI/EO/Region:
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Enter Region"
              />
            </label>

            <label>
              Agrarian Service Center:
              <input
                type="text"
                name="agrarianCenter"
                value={formData.agrarianCenter}
                onChange={handleInputChange}
                placeholder="Enter Service Center"
              />
            </label>

            {/* 16. Business Address */}
            <div className="form-section">
              <label>Business Address:</label>
              <input
                type="text"
                name="street1"
                value={formData.address.street1}
                onChange={handleAddressChange}
                placeholder="Street Name 1"
              />
              <input
                type="text"
                name="street2"
                value={formData.address.street2}
                onChange={handleAddressChange}
                placeholder="Street Name 2"
              />
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                placeholder="City"
              />
              <input
                type="text"
                name="province"
                value={formData.address.province}
                onChange={handleAddressChange}
                placeholder="Province"
              />
            </div>

            {/* 17-18 Contact Information */}
            <label>
              Phone (Land Line):
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Land Line"
              />
            </label>

            <label>
              Mobile:
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter Mobile No"
                required
              />
            </label>

            <label>
              WhatsApp No:
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="Enter WhatsApp Number"
              />
            </label>

            {/* 19-23 Online Presence */}
            <label>
              Facebook Username:
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="Enter Facebook Username"
              />
            </label>

            <label>
              QR Code Generator Phone No:
              <input
                type="tel"
                name="qrPhone"
                value={formData.qrPhone}
                onChange={handleInputChange}
                placeholder="Enter QR Generator Phone No"
              />
            </label>

            <label>
              Web Address:
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter Website URL"
              />
            </label>

            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
              />
            </label>

            <label>
              Google Location:
              <input
                type="text"
                name="googleLocation"
                value={formData.googleLocation}
                onChange={handleInputChange}
                placeholder="Paste Google Map Link"
              />
            </label>

            {/* 24. Authorized persons for orders */}
            <label>
              Persons Authorized to Sign Orders:
              <textarea
                rows="3"
                name="authorizedPersons"
                value={formData.authorizedPersons}
                onChange={handleInputChange}
                placeholder="Enter names separated by commas"
              ></textarea>
            </label>

            {/* 25. Bank Details */}
            <label>
              Bank Details:
              {formData.bankDetails.map((bank, index) => (
                <div key={index} className="bank-fields">
                  <input
                    type="text"
                    placeholder="Bank"
                    value={bank.bank}
                    onChange={(e) => handleBankChange(index, 'bank', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Branch"
                    value={bank.branch}
                    onChange={(e) => handleBankChange(index, 'branch', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="A/C No"
                    value={bank.accountNo}
                    onChange={(e) => handleBankChange(index, 'accountNo', e.target.value)}
                  />
                </div>
              ))}
            </label>

            {/* 26. Authorized cheque signers */}
            <label>
              Persons Authorized to Sign Cheques:
              <textarea
                rows="3"
                name="chequeSigners"
                value={formData.chequeSigners}
                onChange={handleInputChange}
                placeholder="Enter names separated by commas"
              ></textarea>
            </label>

            {/* 27-29. Uploads */}
            <label>
              Document Registration:
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange('docRegistration', e.target.files)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>

            <label>
              Document NIC:
              <input
                type="file"
                onChange={(e) => handleFileChange('docNIC', e.target.files)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>

            {/* Signature & Stamp */}
            <label>
              Signature:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('signature', e.target.files)}
              />
            </label>

            <label>
              Stamp:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('stamp', e.target.files)}
              />
            </label>

            {/* 30. Date */}
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>

            {/* Submit */}
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </FrontendLayout>
  );
}
