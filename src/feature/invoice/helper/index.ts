import moment from "moment";
import { getGlobalStore } from "../../../api/apiClient";
import { RootState } from "../../../store/store";
import RNHTMLtoPDF from "react-native-html-to-pdf-lite";
import Share from "react-native-share";
import { companyLogo } from "../../../assets/base64Images";
import { InvoiceDetails } from "../../../store/slice/Reports";
import { AppColor } from "../../../themes/AppColor";

export const createInvoicePdff = async (Invoice: InvoiceDetails)=>{
const selectedDate = new Date();

const {  terms,
      invoiceNo,
      SelectedDate,
      DueDate,projectName, owner, consultantProjectManager, projectNumber, startDate, endDate, description, schedule  } = Invoice
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
let sitehtml = ''
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

        sitehtml += `
        <tr style="text-align: center;">
                        <td style="font-size: 10px; width: 20%; text-align: left;">${item?.startDate} to ${item?.endDate}</td>
                        <td style="font-size: 10px; width: 35%; text-align: left;">${item?.description}</td>
                        <td style="font-size: 10px; width: 10%; text-align: center;">${item.totalBillableHours}</td>
                        <td style="font-size: 10px; width: 10%; text-align: center;">${item.rate}</td>
                        <td style="font-size: 10px; width: 10%; text-align: center;">H</td>
                        <td style="font-size: 10px; width: 10%; text-align: center;">${item.total.toFixed(2)}</td>
                    </tr>`

        
      });

console.log("Invoice: ", JSON.stringify(Invoice));

const percentageAmount = (totalAmount * 13)/100

    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Invoice</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
                -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        
        .invoice-container {
            width: 100%;
            max-width: 800px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .invoice-header {
            display: flex;
            justify-content: space-between;
            padding:10px 20px;
            /* background: linear-gradient(135deg, ${AppColor.PRIMARY}, ${AppColor.PRIMARY}); */
            /* color: white; */
        }
        
        .company-info {
            text-align: left;
            line-height: 1.6;
        }
        
        .invoice-title {
            padding: 20px;
            font-size: 20px;
            font-weight: bold;
            color: ${AppColor.PRIMARY};
        }
        
        .invoice-body {
            padding: 30px;
        }
        
        .bill-to {
            margin-bottom: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 6px;
            border-left: 4px solid ${AppColor.PRIMARY};
        }
        
        .bill-to h3 {
            color: ${AppColor.PRIMARY};
            margin-bottom: 10px;
        }
        
        .bill-to-content {
            padding: 10px;
        }
        
        .po-number {
            font-weight: bold;
            margin-bottom: 20px;
            padding: 10px;
            background: #e8f4fc;
            border-radius: 4px;
            display: inline-block;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        
        th {
            background-color: ${AppColor.PRIMARY};
            color: white;
            font-weight: 500;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        tr:hover {
            background-color: #f1f7ff;
        }
        
        .description-column {
            width: 35%;
            margin: 0 auto;
        }
        
        .tax-summary {
            margin-top: 30px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        
        .tax-summary h3 {
            color: #2c3e50;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .tax-table {
            width: 100%;
            margin-left: auto;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .totals {
            margin-top: 25px;
            text-align: right;
            padding: 20px;
            /* background: #e8f4fc; */
            border-radius: 6px;
        }
        
        .totals div {
            margin-bottom: 10px;
            font-size: 10px;
        }
        
        .balance-due {
            font-size: 16px !important;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .invoice-footer {
            text-align: center;
            padding: 20px;
            color: #6c757d;
            font-size: 10px;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
        }
        
        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
        }
        
        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: ${AppColor.PRIMARY};
            color: white;
        }
        
        .btn-primary:hover {
            background: ${AppColor.PRIMARY};
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
        }
        .bill-to-header{
            display: flex;
            justify-content: space-between;
        }
            .right-logo {
            display: flex;
            justify-content: flex-end;
            margin-top: 30px;


        }

      

             .side-logo {
            height: 70px;
            width: auto;
            object-fit: contain;
        }

          .ship-to-content p {
            font-size: 10px;
            margin: 2px 0px;
        }
        
        
        @media (max-width: 768px) {
            .invoice-header {
                flex-direction: row;
            }
            
            .company-info {
                text-align: left;
                margin-top: 20px;
            }
            
            .tax-table {
                width: 100%;
            }
            
            th, td {
                padding: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="invoice-container">

        <div class="invoice-header">
          
            <div class="company-info">
                <p><strong>Kusiar Project Services Inc</strong></p>
                <p>163 Long Drive</p>
                <p>Stratford ON N5A 7Y8</p>
                <p>519 9493791</p>
                <p>paul.kusiar@kps.ca</p>
                <p>www.kps.ca</p>
                <p>HST Registration No.: 828042812RT0001</p>
            </div>
              <div class="right-logo">
                          <img src="${companyLogo}" alt="Company Logo"
                              class="side-logo">
                      </div>
            <div>
              
            </div>
        </div>

        <div class="invoice-title">INVOICE</div>

        
        
        <div class="invoice-body">
            <div class="bill-to">
                <div class="bill-to-header">
                    <div class="bill-to-content">
    <h4>Invoice To</h4>

                        <p>${consultantProjectManager}</p>
                        <p>${owner}</p>
                    </div>
                    <div class="ship-to-content">
                  <p><strong style="color:${AppColor.PRIMARY};">INVOICE #</strong>: ${invoiceNo}</p>
                        <p><strong style="color: ${AppColor.PRIMARY};">DATE</strong>: ${SelectedDate}</p>
                        <p><strong style="color:${AppColor.PRIMARY};">DUE DATE</strong>: ${DueDate}</p>
                        <p><strong style="color:${AppColor.PRIMARY};">TERMS</strong>: ${terms} </p>
                    </div>
                </div>
            </div>
            
            <div class="po-number">P.O. NUMBER:${projectNumber}</div>
            
            <table>
                <thead>
                    <tr>
                        <th style="width:20%;">DATE</th>
                        <th class="description-column">DESCRIPTION</th>
                        <th style="width:10%; text-align: center;">QTY</th>
                        <th style="width:10%; text-align: center;">RATE</th>
                        <th style="width:10%; text-align: center;">TAX</th>
                        <th style="width:10%; text-align: center;">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                   ${sitehtml}
                </tbody>
            </table>
            
          
            
            <div class="totals">
                <div>SUBTOTAL: ${totalAmount.toFixed(2)}</div>
                <div>HST @ 13%: $${percentageAmount.toFixed(2)}</div>
                <div>TOTAL: $${(totalAmount + percentageAmount).toFixed(2)}</div>
                <div class="balance-due">BALANCE DUE: $${(totalAmount + percentageAmount).toFixed(2)}</div>
            </div>


              <div class="tax-summary">
                <h3>TAX SUMMARY</h3>
                <table class="tax-table">
                    <thead>
                        <tr>
                            <th>RATE</th>
                            <th>TAX</th>
                            <th>NET</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HST @ 13%</td>
                            <td>${percentageAmount.toFixed(2)}</td>
                            <td>${totalAmount.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
       
       
    </div>

    <script>
        // Function to simulate PDF download
        function downloadPDF() {
            alert("In a real application, this would generate and download a PDF version of the invoice.");
            // In a real application, you would use a library like jsPDF or window.print() for PDF generation
        }
    </script>
</body>
</html>`

 const store: RootState = getGlobalStore().getState();
  const userName = store?.User?.UserName;

 try {
    const fileName = `${userName.replaceAll(" ", "_")}_${moment(
      selectedDate
    ).format("DD-MM-YYYY")}_Invoice_Report`;

    let options = {
      html: htmlContent,
      fileName: fileName,
      // directory: "Documents",
      width: 1190,
    };

    let file = await RNHTMLtoPDF.convert(options);
    // Prepare share options
    const shareOptions = {
      title: "Share PDF via",
      url: `file://${file.filePath}`, // Add file:// prefix for local files
      social: Share.Social.WHATSAPP,
    };

    // Share on WhatsApp
    await Share.open(shareOptions);
  } catch (error) {
    console.log("Error : ", error);
  }
}