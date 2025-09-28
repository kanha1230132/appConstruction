import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RestClient from "../api/restClient";
import { CompanyLogoResponse } from "../api/apiInterface";

const useGlobal = () => {
  const [Logos, setLogos] = useState<CompanyLogoResponse[]>([]);
const [SelectedLogo, setSelectedLogo] = useState<CompanyLogoResponse[]>();
const [IsSubmit, setIsSubmit] = useState(false);
const [Loading, setLoading] = useState(false);
const [ShowLogoSelectionModal, setShowLogoSelectionModal] = useState(false);
  const getLogos = async () => {
    try {
      const restClient = new RestClient();
      const response = await restClient.getLogo();
      if (response && typeof response != "string") {
        setLogos(response);
      }
    } catch (error) {
      console.log("Error getLogos : ", error);
    }
  };

  



  return {
    Logos,
    getLogos,
    SelectedLogo,
    setSelectedLogo,
    IsSubmit,
    setIsSubmit,
    ShowLogoSelectionModal,
    setShowLogoSelectionModal,
    Loading, setLoading
  };
};

export default useGlobal;
