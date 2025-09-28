import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import RestClient from '../../../api/restClient';
import useToastHook from '../../../hooks/toast';
import useGlobal from '../../../hooks/global';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../../../navigation/ScreenNames';
import { updateInvoiceDetails } from '../../../store/slice/Reports';
import { createInvoicePdff } from '../helper';

const useInvoicePreview = () => {
    const { Invoice } = useSelector((state: RootState) => state.Reports);
    const [IsLoading, setIsLoading] = useState(false);
    const {showToast} = useToastHook();
    const {IsSubmit, setIsSubmit} = useGlobal();
    const dispatch = useDispatch();
    const navigation = useNavigation();
      const [selectedInspector, setSelectedInspector] = useState();
    

    const createInvoice = async () =>{
      let subTotal = 0;
      let totalAmount = 0;
      let totalBillableHours = 0;
      Invoice?.siteInspectors?.map((item:any) => {
        subTotal += item.subTotal;
        totalAmount += item.total;
        totalBillableHours += item.totalBillableHours
          ? Number(item.totalBillableHours)
          : 0;
      });

      const siteInspectors = [];
      Invoice?.siteInspectors?.map((item) => {
        siteInspectors.push({
          userId: item.userId,
          totalHours: item.totalHours,
          totalBillableHours: item.totalBillableHours
            ? Number(item.totalBillableHours)
            : 0,
          rate: item.rate,
          subTotal: item.subTotal,
          total: item.total,
        });
      });

      const requestBody = {
        fromDate: Invoice?.startDate,
        toDate: Invoice?.endDate,
        invoiceTo: Invoice?.consultantProjectManager,
        schedule_id: Invoice?.schedule?.id,
        description: Invoice?.description,
        userDetails: siteInspectors, // Array of user details provided by frontendr,  // Array of user details provided by frontend
        subTotal: Number(subTotal?.toFixed(1)),
        totalAmount: Number(totalAmount?.toFixed(1)),
        totalBillableHours: totalBillableHours,
      };

      console.log("requestBody : ",JSON.stringify(requestBody))
      try {
     setIsLoading(true);
     const restClient = new RestClient(); 
     const response = await restClient.createInvoice(requestBody);
      if (response && typeof response != "string") {
        setIsLoading(false);
        setIsSubmit(true);
showToast(response.message || "Something went wrong", "success");
      } else {
        setIsLoading(false);
        showToast(response || "Something went wrong", "danger");
      }
      } catch (error) {
        showToast( "Something went wrong", "danger");
        console.log("Error createInvoice : ", error);
      } finally{
        setIsLoading(false);
      }
    }
      const callToNavigateReportScreen = () => {
        dispatch(updateInvoiceDetails(undefined));
    
      

        navigation.reset({
                                    index: 0,
                                    routes: [
                                      {
                                        name: screenNames.MainApp, // DrawerNavigator is registered as MainApp in your root stack
                                        state: {
                                          routes: [
                                            {
                                              name: screenNames.HomeTabs,
                                              state: {
                                                routes: [{ name: screenNames.InvoiceScreen }],
                                                index: 0,
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  })
      };

      const createInvoicePdf = ()=>{
        createInvoicePdff(Invoice);
      }


  return{
Invoice,
createInvoice,
IsLoading,
IsSubmit,
callToNavigateReportScreen,
selectedInspector, setSelectedInspector,
createInvoicePdf
  }
}

export default useInvoicePreview
