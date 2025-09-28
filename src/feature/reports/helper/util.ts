import moment from "moment";
import { companyLogo } from "../../../assets/base64Images";
import {
  DailyDairyReports,
  DailyEntry,
  WeeklyEntry,
} from "../../../store/slice/Reports";
import { AppColor } from "../../../themes/AppColor";
import { DateFormat } from "../../../utils/dateUtil";
import { RootState } from "../../../store/store";
import { getGlobalStore } from "../../../api/apiClient";
import RNHTMLtoPDF from "react-native-html-to-pdf-lite";
import Share from "react-native-share";
import { ProcessDataForPdf, WeeklyDataStructure } from "../../../utils/interface";

export const formLists = [
  {
    title: "Progress of Work",
    list: [
      {
        key: "Has 3-week look-ahead work been field verified?",
        value: "",
        type: Boolean,
      },
      {
        key: "Are “As-Built” (redline) records up to date?",
        value: "",
        type: Boolean,
      },
    ],
  },
  {
    title: "Schedule Update",
    list: [
      {
        key: "Difficulties encountered on site which may impact schedule?",
        value: "",
        type: Boolean,
      },
      {
        key: "Work proceeding in accordance with contractor look-ahead?",
        value: "",
        type: Boolean,
      },
      {
        key: "Work generally proceeding in accordance with project baseline schedule?",
        value: "",
        type: Boolean,
      },
      {
        key: "Are all required shop drawings, RFIs, and submittals up to date?",
        value: "",
        type: Boolean,
      },
    ],
  },
  {
    title: "Environmental Incidents",
    list: [
      {
        key: "Prohibited materials, equipment, tools, etc. inside cell?",
        value: "",
        type: Boolean,
      },
      {
        key: "Any contamination, spills, or noncompliance of work (as per standards/specification/contract)?",
        value: "",
        type: Boolean,
      },
    ],
  },
  {
    title: "Property Damage to Existing Systems & Equipment",
    list: [
      {
        key: "Damage to existing systems, property, equipment, tools etc. due to work activities?",
        value: "",
        type: Boolean,
      },
      {
        key: "Prohibited use/operation of existing systems, property, equipment, tools?",
        value: "",
        type: Boolean,
      },
    ],
  },
  {
    title: "Shutdowns, Lock-Outs, Commissioning",
    list: [
      {
        key: "Are there any current ongoing lock-outs, shutdowns, or commissioning tasks?",
        value: "",
        type: Boolean,
      },
      {
        key: "Are all required locks, colour tags, equipment tags, etc. attached to equipment?",
        value: "",
        type: Boolean,
      },
      {
        key: "Are there any upcoming lock-outs, shutdowns, or commissioning tasks?",
        value: "",
        type: Boolean,
      },
      {
        key: "If Yes – Please indicate the required parties notified, dates, and required actions",
        value: "",
        type: String,
      },
    ],
  },
  {
    title: "Public Relations",
    list: [
      {
        key: "Residential complaints, concerns, or conflicts?",
        value: "",
        type: Boolean,
      },
      {
        key: "Operations or Regional complaints, concerns, or conflicts?",
        value: "",
        type: Boolean,
      },
      {
        key: "Has Contractor been abiding by contract work-restrictions (no deliveries/exterior work before 7am or after 5pm etc.)?",
        value: "",
        type: Boolean,
      },
    ],
  },
  {
    title: "Health and Safety & Covid-19",
    list: [
      {
        key: "Incidents/Infractions/Safety Meetings",
        value: "",
        type: String,
      },
      {
        key: "Covid-19 Policy and Procedures being adhered to/followed? – Daily screening",
        value: "",
        type: Boolean,
      },
    ],
  },
  {
    title: "Potential Claim for Extra Work (Outside of Tender Scope)",
    list: [
      {
        key: "Description of extra works:",
        value: "",
        type: String,
      },
      {
        key: "Equipment used:",
        value: "",
        type: String,
      },
      {
        key: "Materials used:",
        value: "",
        type: String,
      },
      {
        key: "Duration of work:",
        value: "",
        type: String,
      },
    ],
  },
];

export const createDailyDairyPdf = async (param: DailyDairyReports) => {
  const {
    signature,
    selectedLogo,
    Owner,
    OwnerContact,
    OwnerProjectManager,
    Contractor,
    ContractNumber,
    Description,
    IsChargable,
    ProjectName,
    ProjectNumber,
    ReportNumber,
    selectedDate,
    timeIn,
    timeOut,
    siteInspector,
    
  } = param;
  const height = 150;
  const store: RootState = getGlobalStore().getState();
  const userName = store?.User?.UserName;
  let signatureHtml = "";
  if (signature) {
    signatureHtml = `
            <img src="${signature}" alt="Signature" style="width: 50px; margin-left: 60px;" />
            `;
  }

  let logoHtml = "";
 if (selectedLogo && selectedLogo.length > 0) {
  selectedLogo.forEach((item, index) => {
    logoHtml += `
      <img src="${item.file_url}" alt="Company Logo" class="side-logo">
      ${
        index < selectedLogo.length - 1 // add line only if not the last logo
          ? `<div class="vertical-line"></div>`
          : ""
      }
    `;
  });
}


  const htmlContent = `
          <!DOCTYPE html>
<html>
<head>
    <title>Inspection Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
              -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
        }
        .container {
            width: 100%;
            padding: 10px;
        }
        .section {
            border: 1px solid #333;
            padding: 10px;
            margin-bottom: 15px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            background-color:${AppColor.PRIMARY};
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom:10px;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
        }
        .info-table td, .info-table th {
            text-align: left;
        }
        .bold {
            font-weight: bold;
            color: ${AppColor.BLACK};
        } 
       .logo {
        margin-bottom: 10px;
        height: 70px;
      }
      .side-logo{
        
        margin-bottom: 10px;
        height: ${height}px;
      }
      .logo-container {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
             .img-container{
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
         .header-title {
      font-size: 35px;
      margin-bottom: 30px;
    }
       .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #ddd;
            border-top: 4px solid ${AppColor.PRIMARY};
              -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
        }

        .left-logos {
            display: flex;
            gap: 15px;
        }

        .vertical-line {
            height: '100%';
            width: 1px;
            background-color: #ccc;
              -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
        }

        .header-title {
            flex-grow: 1;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .right-logo {
            display: flex;
            justify-content: flex-end;
        }

        .bold {
            font-weight: bold;
            color: #000000
        }

        .side-logo {
            height: 40px;
            width: auto;
            object-fit: contain;
        }
              table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 4px;
            text-align: left;
            font-size: 8px;
              -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
        }

        th {
            background-color: #f2f2f2;
              -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
        }

        .header-table {
            margin-bottom: 30px;
        }
            .description-item{
             border-left: 4px solid #4a6fa5;
                background-color: #f8f9fa;
                padding: 12px 16px;
                margin-bottom: 16px;
                border-radius: 0 4px 4px 0;
                  -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
        }

         .signature-container {
            display: flex;
            justify-content: space-between;
            margin: 30px auto 0;
            gap: 20px;
            width: 100%;
        }

        .signature-box {
            flex: 1;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            /* text-align: center; */
            height: 100px;
        }

        .signature-title {
            font-weight: bold;
            margin-bottom: 15px;
            color: #2c3e50;
            font-size: 16px;
        }

        .signature-line {
            height: 1px;
            background-color: #333;
            margin: 40px 0 10px;
        }

        .signature-image {
            width: 150px;
            height: 80px;
            margin: 10px auto;
            display: block;
            object-fit: contain;
            border: 1px solid #eee;
        }

        .signature-label {
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">

 <div class="header-container">
        <div class="left-logos">
            ${logoHtml}
        </div>

        <div class="header-title">Daily Diary Report</div>

        <div class="vertical-line"></div>

        <div class="right-logo">
            <img src="${companyLogo}" alt="Company Logo"
                class="side-logo">
        </div>
     </div>


        

            <table class="info-table">
                <tr><td class="bold">Date:</td><td>${moment(
                  selectedDate
                ).format(DateFormat.MMMM_DD_YYYY)}</td></tr>
                <tr><td class="bold">Owner:</td><td>${Owner || "N/A"}</td></tr>

                <tr><td class="bold">Project No./Client PO :</td><td>${
                  ProjectNumber || "N/A"
                }</td></tr>
                <tr><td class="bold">Report No :</td><td>${
                  ReportNumber || "N/A"
                }</td></tr>
                <tr><td class="bold">Project Name :</td><td>${
                  ProjectName || "N/A"
                }</td></tr>
                <tr><td class="bold">Owner Contact :</td><td>${
                  OwnerContact || "N/A"
                }</td></tr>
                <tr><td class="bold">Contractor :</td><td>${
                  Contractor || "N/A"
                }</td></tr>
                <tr><td class="bold">Contract Number :</td><td>${
                  ContractNumber || "N/A"
                }</td></tr>
                <tr><td class="bold">Owner Project Manager :</td><td>${
                  OwnerProjectManager || "N/A"
                }</td></tr>
                  <tr><td class="bold">Site Inspector :</td><td>${
                    siteInspector || "N/A"
                  }</td></tr>
                    <tr><td class="bold">Chargeable :</td><td>${
                      IsChargable ? "Yes" : "No"
                  }</td></tr>
                  <tr><td class="bold">Inspector Time  In/Out:</td><td>${timeIn} to ${timeOut}</td></tr>
            </table>

         <div class="description-item">
                <h5 style="margin: 0px; padding: 0px; color: #2c3e50;">${moment(
                  selectedDate
                ).format(DateFormat.MMMM_DD_YYYY)}</h5>
               <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: 'Roboto', sans-serif;">${Description || 'N/A'}</pre>
            </div>
    </div>

    <div class="signature-container">
        <!-- First Signature Box -->
        <div class="signature-box">
            <div class="signature-title">Report Done By: ${userName}</div>
            ${signatureHtml}
        </div>

        <!-- Second Signature Box -->
        <div class="signature-box">
            <div class="signature-title">Region Representative:</div>
            
        </div>
    </div>
</div>
</body>
</html>
`;
  // console.log("first", htmlContent);

  try {
    const fileName = `${userName.replaceAll(" ", "_")}_${moment(
      selectedDate
    ).format("DD-MM-YYYY")}_Daily_Diary_Report`;

    let options = {
      html: htmlContent,
      fileName: fileName,
      width: 1300,
    };

    let file = await RNHTMLtoPDF.convert(options);
    // Prepare share options
    const shareOptions = {
      title: "Share PDF via",
      url: `file://${file.filePath}`, // Add file:// prefix for local files
      social: Share.Social.WHATSAPP,
    };

    // Share on WhatsApp
    const isShared = await Share.open(shareOptions);
    if (isShared.success) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const createDailyPdf = async (dailyEntry: DailyEntry) => {
  const {
    Owner,
    ProjectNumber,
    ReportNumber,
    ProjectName,
    OwnerContact,
    Contractor,
    ContractNumber,
    OwnerProjectManager,
    selectedDate,
    signature,
    Description,
    Images,
    schedule,
    selectedLogo,
    Visitors,
    Labour,
    Equipments,
    HighTemp,
    LowTemp,
    Weather,
    WorkingDay,
    onShore,
    Location,
    DeclerationFrom,
    timeIn,
    timeOut,
    component,
    siteInspector,
  } = dailyEntry;

  const store: RootState = getGlobalStore().getState();
  const userName = store?.User?.UserName;

console.log("DeclerationFrom: ", DeclerationFrom)

// if (Images && Images.length) {
//   // Split images into pages: first page = 6, others = 10
//   const firstPage = Images.slice(0, 4); // First 6 images
//   const remainingPages = chunk(Images.slice(3), 6); // Remaining in chunks of 10
//   const pages = [firstPage, ...remainingPages];

//   imageHtml = `<div class="pages">` +
//     pages.map((page, pIndex) => `
//       <div class="page">
//         ${page.map((item, index) => `
//           <div class="image-placeholder">
//             <img src="${item.uri}" alt="Image ${pIndex === 0 ? index + 1 : 4 + (pIndex - 1) * 6 + index + 1}" 
//                  style="width: '100%';object-fit:cover;" />
//             <div class="image-caption">${item?.description || ""}</div>
//           </div>
//         `).join('')}
//       </div>
//     `).join('') +
//   `</div>`;
// }

let imageHtml = '';
if (Images && Images.length > 0) {
  Images.forEach((item, index) => {
    imageHtml += `
      <div class="image-item">
        <img src="${item.uri}" alt="Project Image ${index + 1}" />
        <div class="image-caption">${item?.description || ""}</div>
      </div>
    `;
  });
}



  let equipmentHtml = "";
  if (Equipments && Equipments.length > 0) {
    equipmentHtml += `  <table>
          <tr>
            <th style="font-size: 15px; background-color:${AppColor.PRIMARY}; color:${AppColor.WHITE};" colspan="4">Equipments</th>
          </tr>
          <tr>
            <th>Equipment</th>
            <th>Quantity</th>

            <th>Hours</th>
            <th>Total Hours</th>
          </tr>`;
    for (let item of Equipments) {
      const { equipment_name, quantity, hours, totalHours } = item;
      equipmentHtml += `
             <tr>
            <td>${equipment_name}</td>
            <td>${quantity}</td>
            <td>${hours}</td>
            <td>${totalHours}</td>
          </tr>
            `;
    }
    equipmentHtml += `</table>`;
  }

  let labourHtml = "";
  if (Labour && Labour.length > 0) {
    labourHtml += ` <table>
       <tr>
            <th style="font-size: 15px; background-color:${AppColor.PRIMARY}; color:${AppColor.WHITE};" colspan="4">Labours</th>
          </tr>`;
    for (let item of Labour) {
      labourHtml += `
          <tr>
            <th colspan="4">Name : ${item.contractorName}</th>
          </tr>
          <tr>
            <th>Role</th>
            <th>Quantity</th>
            <th>Hours</th>
            <th>Total Hours</th>
          </tr>`;
      for (let role of item.roles) {
        const { roleName, quantity, hours, totalHours } = role;
        labourHtml += `
             <tr>
            <td>${roleName}</td>
            <td>${quantity}</td>
            <td>${hours}</td>
            <td>${totalHours}</td>
          </tr>
            `;
      }
    }
    labourHtml += `</table>`;
  }
  console.log("-------");

  let visitorHtml = "";
  if (Visitors && Visitors.length > 0) {
    visitorHtml += `  <table>
          <tr>
            <th style="font-size: 15px; background-color:${AppColor.PRIMARY}; color:${AppColor.WHITE};" colspan="5">Visitors</th>
          </tr>
          <tr>
            <th>Visitor Name</th>
            <th>Company</th>
            <th>Quantity</th>
            <th>Hours</th>
            <th>Total Hours</th>
          </tr>`;

    for (let item of Visitors) {
      const { company, visitorName, quantity, hours, totalHours } = item;
      visitorHtml += `
             <tr>
            <td>${visitorName}</td>
            <td>${company}</td>
            <td>${quantity}</td>
            <td>${hours}</td>
            <td>${totalHours}</td>
          </tr>
            `;
    }

    visitorHtml += `</table>`;
  }

  let signatureHtml = "";
  if (signature) {
    signatureHtml = `
      <img src="${signature}" alt="Signature" style="width: 50px; margin-left: 60px;" />
      `;
  }

  let decFormHtml = "";

  if (DeclerationFrom) {
    decFormHtml += `<table>`;
    DeclerationFrom.declrationForm.map((item) => {
      decFormHtml += ` <tr><th colspan="1" class="section-header">${item.title}</th><th style="width: 40%; text-align: center;">Action/Notes</th></tr>`;
      item.list.map((_item, index) => {
        decFormHtml += `<tr><td>${_item?.key} </td><td style="width: 40%; text-align: center;" >${_item?.value}</td></tr>`;
      });
    });
    decFormHtml += `</table>`;
  }

  console.log("logo ");

  let logoHtml = "";
  if (selectedLogo && selectedLogo.length > 0) {
  selectedLogo.forEach((item, index) => {
    logoHtml += `
      <img src="${item.file_url}" alt="Company Logo" class="side-logo">
      ${
        index < selectedLogo.length - 1 // add line only if not the last logo
          ? `<div class="vertical-line"></div>`
          : ""
      }
    `;
  });
}

console.log("Description :", Description)

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Daily Progress Report - 21ECS-MI-02HA</title>
    <style>
     @page{
        
         margin-top: 20px !important;
         }
     .image-container {
          page-break-inside: avoid;
          break-inside: avoid;
          display: block;
          width: 100%;
        }
                  img {
          max-width: 100%;
          height: auto;
          display: block;
        }

      body {
            margin: 0;
        padding: 16px;
        font-size: 12px;
        box-sizing: border-box;
                     -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
      }
      .container {
    width: 100%;
    display: flex;
  }
      .main-content {
        flex: 3;
      }
      .images-section {
        flex: 1;
        border-left: 1px solid #ddd;
        padding-left: 20px;
        margin-left: 10px ;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
    
      .header-table {
        margin-bottom: 30px;
      }
      .section-title {
        font-weight: bold;
        background-color: #f2f2f2;
        padding: 5px;
        height: 50px;
        margin-top: 20px;
      }
      .signature-section {
        margin-top: 40px;
      }
      ul {
        margin-top: 5px;
        margin-bottom: 5px;
      }
  
        .header-title {
        font-size: 25px;
        font-weight: 900;
        color:${AppColor.PRIMARY};
      }
      .table-title{
        color:${AppColor.PRIMARY};
        font-weight: 600;
        font-size: 15px;
      }
         .description-item{
             border-left: 4px solid #4a6fa5;
                background-color: #f8f9fa;
                padding: 5px 16px;
                margin-bottom: 10px;
                border-radius: 0 4px 4px 0;
        }

        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #ddd;
        }

        .left-logos {
            display: flex;
            gap: 15px;
        }

        .vertical-line {
            height: '100%';
            width: 1px;
            background-color: #ccc;
        }

        .header-title {
            flex-grow: 1;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .right-logo {
            display: flex;
            justify-content: flex-end;
        }

        .bold {
            font-weight: bold;
            color: #000000
        }

        .side-logo {
            height: 40px;
            width: auto;
            object-fit: contain;
        }

      .signature-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  /* prevent cutting across pages */
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  page-break-before: auto;
  page-break-after: auto;
}
        .signature-box {
            flex: 1;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            /* text-align: center; */
            height: 100px;
        }

        .signature-title {
            font-weight: bold;
            margin-bottom: 15px;
            color: #2c3e50;
            font-size: 16px;
        }

        .signature-line {
            height: 1px;
            background-color: #333;
            margin: 40px 0 10px;
        }

        .signature-image {
            width: 150px;
            height: 80px;
            margin: 10px auto;
            display: block;
            object-fit: contain;
            border: 1px solid #eee;
        }

            



.images-section {
  display: block;  /* remove flex/grid to avoid broken wrapping */
  margin-top: 15px;
}

.image-item {
  display: block;
  margin: 10px 0;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

.image-item img {
  max-width: 100%;
  height: auto;
  display: block;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}


    </style>
  </head>
  <body>
     <div class="header-container">
        <div class="left-logos">
            ${logoHtml}
        </div>

        <div class="header-title">Inspection Report</div>

        <div class="vertical-line"></div>

        <div class="right-logo">
            <img src="${companyLogo}" alt="Company Logo"
                class="side-logo">
        </div>
     </div>

    <table class="header-table">
      <tr>
        <td><strong>OWNER:</strong></td>
        <td colspan="3">${Owner}</td>
        <td><strong>PROJECT NO./CLIENT PO.:</strong></td>
        <td>${ProjectNumber}</td>
      
      </tr>
      <tr>
        <td><strong>PROJECT:</strong></td>
        <td colspan="3">${ProjectName}</td>
          <td><strong>REPORT NO.:</strong></td>
        <td colspan="3">${ReportNumber}</td>
      </tr>
  
      <tr>
        <td><strong>COMPONENT:</strong></td>
        <td colspan="3">${component}</td>
        <td><strong>DATE:</strong></td>
        <td colspan="3">${moment(selectedDate, "YYYY-MM-DD").format(
          "dddd, Do MMMM, YYYY"
        )}</td>
      </tr>
      <tr>
        <td><strong>LOCATION:</strong></td>
        <td colspan="3">${Location}</td>
        <td><strong>OWNER CONTACT:</strong></td>
        <td colspan="3">${OwnerContact}</td>
      </tr>
      <tr>
        <td class="bold">SITE INSPECTOR:</td>
            <td colspan="3">${siteInspector}</td>
        <td><strong>INSPECTOR TIME IN/OUT:</strong></td>
        <td colspan="3">${timeIn} to ${timeOut}</td>
      </tr>
      <tr>
        <td><strong>CONTRACT NUMBER:</strong></td>
        <td colspan="3">${ContractNumber}</td>
        <td><strong>CONTRACTOR:</strong></td>
        <td colspan="3">${Contractor}</td>
      </tr>

       <tr>
        <td><strong>OWNER PROJECT MANAGER:</strong></td>
        <td colspan="3">${OwnerProjectManager}</td>
        <td><strong>ONSHORE / OFFSHORE:</strong></td>
        <td colspan="3">${onShore}</td>
      </tr>

          <tr>
     
        <td><strong>WORKING DAY:</strong></td>
        <td colspan="3">${WorkingDay}</td>
           <td><strong></strong></td>
        <td colspan="3"></td>
      </tr>
       
    </table>

    <div class="container">
      <div class="main-content">
        <!-- All the existing content goes here -->

        <div class="description-item">
            <h5 style="font-size: 15px; background-color:${AppColor.PRIMARY}; color:${AppColor.WHITE};
  }; margin: 0px; padding: 2px;">Description</h5>
                <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: 'Roboto', sans-serif;">📝 ${Description}</pre>
            </div>

             <div class="description-item">
                <p style="margin: 4px 0 0 0; color: #000000;">
    🌤️ WEATHER: ${Weather}
  </p>

  <p style="margin: 2px 0 0 0; color: #000000;">
    🌡️ Low: ${LowTemp} | High: ${HighTemp}
  </p>
            </div>

        ${equipmentHtml}

        ${labourHtml}

        ${visitorHtml}

         ${decFormHtml}
        <!-- Rest of the existing content... -->
        <!-- Continue with all the other sections from the previous HTML -->
      </div>

     ${
          imageHtml
            ? `
            <div class="images-section">
                <h4>Project Images</h2>
                <div class="image-gallery">
                    ${imageHtml}
                  </div>
            </div>`
            : ""
        }



   

      </div>

    <div class="signature-container">
        <!-- First Signature Box -->
        <div class="signature-box">
            <div class="signature-title">Report Done By: ${userName}</div>
            ${signatureHtml}
        </div>

        <!-- Second Signature Box -->
        <div class="signature-box">
            <div class="signature-title">Region Representative:</div>
            
        </div>
    </div>
  </body>
</html>
`;
  console.log("first", htmlContent);

  try {
    const fileName = `${userName.replaceAll(" ", "_")}_${moment(
      selectedDate
    ).format("DD-MM-YYYY")}_Daily_Report`;

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
};

const processReportData = (data: WeeklyDataStructure) => {
  const result = {
    descriptions: [],
    equipments: {},
    visitors: {},
    labours: {},
  };

  // Iterate through each date
  Object.keys(data).forEach((date) => {
    const dateData = data[date];

    // Iterate through each user
    Object.keys(dateData).forEach((userId) => {
      const userData = dateData[userId];

      // Process diary entries
      // if (userData.diary && userData.diary.length > 0) {
      //   userData.diary.forEach((entry) => {
      //     result.descriptions.push({
      //       date,
      //       description: entry.description,
      //       reportNumber: entry.reportNumber,
      //       ownerProjectManager: entry.ownerProjectManager,
      //     });
      //   });
      // }
      if (userData.diary && userData.diary.length > 0) {
  userData.diary.forEach((entry) => {
    const date = moment(entry.selectedDate).utc().format("YYYY-MM-DD");
    const existingDate = result.descriptions.find(item => item.date == date);

    if (existingDate) {
      // Add to the existing array of descriptions
      existingDate.descriptions.push(entry.description);
    } else {
      // Create a new object for this date
      result.descriptions.push({
        date: date,
        descriptions: [entry.description], // array instead of single value
        reportNumber: entry.reportNumber,
        ownerProjectManager: entry.ownerProjectManager,
      });
    }
  });
}


      // Process entry data
      if (userData.entry && userData.entry.length > 0) {
        userData.entry.forEach((entry) => {
          // Add description
          // result.descriptions.push({
          //   date,
          //   description: entry.description,
          //   reportNumber: entry.reportNumber,
          //   ownerProjectManager: entry.owner_project_manager,
          // });

              const date = moment(entry.selected_date).utc().format("YYYY-MM-DD");


           const existingDate = result.descriptions.find(item => item?.date == date);

    if (existingDate) {
      // Add to the existing array of descriptions
      existingDate.descriptions.push(entry.description);
    } else {
      // Create a new object for this date
      result.descriptions.push({
        date: date,
        descriptions: [entry.description], // array instead of single value
        reportNumber: entry.reportNumber,
        ownerProjectManager: entry.owner_project_manager,
      });
    }
         

          if (entry.equipments) {
            entry.equipments.forEach((item) => {
              const name = (String(item.equipment_name).charAt(0).toUpperCase() + String(item.equipment_name).slice(1).toLowerCase()).trim();
              if (!result.equipments[name]) {
                result.equipments[name] = {
                  equipment_name: name,
                  total_hours: 0,
                  total_days: 0,
                  quantity:0,
                  hours: 0,
                };
              }
              result.equipments[name].total_hours += item.totalHours;
              result.equipments[name].total_days += 1; // Each entry counts as 1 day
              result.equipments[name].quantity += item.quantity;
              result.equipments[name].hours += item.hours;
            });
          }

          // Process visitors
          if (entry.visitors) {
            entry.visitors.forEach((visitor) => {
              const key = `${String(visitor.visitorName).toLowerCase().trim()}|${String(visitor.company).toLowerCase().trim()}`;

              if (!result.visitors[key]) {
                result.visitors[key] = {
                  name: visitor.visitorName,
                  company: visitor.company,
                  total_hours: 0,
                  visits: 0,
                  total_days: 0,
                  hours: 0,
                  quantity: 0,
                };
              }
              result.visitors[key].total_hours += visitor.totalHours;
              result.visitors[key].visits += visitor.quantity;
              result.visitors[key].total_days += 1;
              result.visitors[key].hours += visitor.hours;
              result.visitors[key].quantity += visitor.quantity;
            });
          }

          // Process labours
          if (entry.labours) {
            entry.labours.forEach((labour) => {

              labour.roles.forEach((role) => {
                const key = `${String(labour.contractorName).toLowerCase().trim()}|${String(role.roleName).toLowerCase().trim()}`;
                if (!result.labours[key]) {
                  result.labours[key] = {
                    contractor: labour.contractorName,
                    role: role.roleName,
                    total_hours: 0,
                    workers: 0,
                    total_days: 0,
                    hours: 0,
                    quantity: 0,
                  };
                }
                result.labours[key].total_hours += role.totalHours;
                result.labours[key].workers += role.quantity;
                result.labours[key].total_days += 1;
                result.labours[key].hours += role.hours;
                result.labours[key].quantity += role.quantity;
              });
            });
          }
        });
      }
    });
  });

  console.log("result.equipments : ", result.equipments);
  return {
    descriptions: result.descriptions,
    equipments: Object.values(result.equipments),
    visitors: Object.values(result.visitors),
    labours: Object.values(result.labours),
  };
};

export const createWeeklyPdf = async (weeklyEntry: WeeklyEntry) => {
  try {
    const {
      startDate,
      endDate,
      WeeklyAllList,
      projectName,
      projectNumber,
      reportDate,
      siteInspector,
      supportCA,
      schedule,
      inspectorTimeIn,
      inspectorTimeOut,
      owner,
      consultantProjectManager,
      contractNumber,
      cityProjectManager,
      contractProjectManager,
      contractorSiteSupervisorOnshore,
      contractorSiteSupervisorOffshore,
      contractAdministrator,
      selectedLogo,
      Images,
      signature,
    } = weeklyEntry;
    const store: RootState = getGlobalStore().getState();
    const userName = store?.User?.UserName;
    const processData: ProcessDataForPdf = processReportData(WeeklyAllList);
    const { descriptions, equipments, visitors, labours } = processData;
    let descriptionsHtml = "";

    const tempDescriptions = [...descriptions].sort(
      (a, b) => moment(a.date,"YYYY-MM-DD").toDate().getTime() - moment(b.date,"YYYY-MM-DD").toDate().getTime()
    );
    tempDescriptions.forEach((item, index) => {
      descriptionsHtml += ` <div class="description-item">
                    <h5>${moment(item.date,"YYYY-MM-DD").utc().format("YYYY-MM-DD")}</h5>`

      item.descriptions?.map(item1=>{
        descriptionsHtml += `
       
                   <pre style="font-size: 11px;white-space: pre-wrap; word-wrap: break-word;  font-family: 'Roboto', sans-serif;">${item1}</pre>
                   <hr/>
        `
      })

      descriptionsHtml += `
                </div>
    
          `;
    });

    let equipmentsHtml = "";
    if (equipments.length > 0) {
      equipmentsHtml += `
      <h5>Equipment</h5>
      <table class="data-table">
          <thead>
              <tr>
                  <th>Equipment</th>
                  <th>Quantity</th>
                  <th>Hours</th>
                  <th>Total Hours</th>
                  <th>Days</th>

              </tr>
          </thead>
          <tbody>
              ${equipments
                .map(
                  (equipment) => `
                  <tr>
                      <td>${equipment.equipment_name}</td>
                      <td>${equipment.quantity}</td>
                      <td>${equipment.hours}</td>
                      <td>${equipment.total_hours}</td>
                      <td>${equipment.total_days}</td>
                  </tr>
              `
                )
                .join("")}
          </tbody>
      </table>
  `;
    }

    let visitorsHtml = "";
    if (visitors.length > 0) {
      visitorsHtml += `
      <h5>Visitors</h5>
      <table class="data-table">
          <thead>
              <tr>
                  <th>Visitor</th>
                  <th>Company</th>
                  <th>Hours</th>
                  <th>Quantity</th>
                  <th>Total Hours</th>
                  <th>Days</th>

              </tr>
          </thead>
          <tbody>
              ${visitors
                .map(
                  (visitor) => `
                  <tr>
                      <td>${visitor.name}</td>
                      <td>${visitor.company}</td>
                      <td>${visitor.hours}</td>
                      <td>${visitor.quantity}</td>
                      <td>${visitor.total_hours}</td>
                      <td>${visitor.total_days}</td>
                  </tr>
              `
                )
                .join("")}
          </tbody>
      </table>
  `;
    }

    let laboursHtml = "";
    if (labours.length > 0) {
      laboursHtml += `
      <h5>Labour</h5>
      <table class="data-table">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Quantity</th>
                  <th>Hours</th>
                  <th>Total Hours</th>
                  <th>Days</th>

              </tr>
          </thead>
          <tbody>
           <tr>
              ${labours
                .map(
                  (labour) => `
                  <tr>
                      <td>${labour.contractor}</td>
                      <td>${labour.role}</td>
                      <td>${labour.quantity}</td>
                      <td>${labour.hours}</td>
                      <td>${labour.total_hours}</td>
                      <td>${labour.total_days}</td>
                  </tr>
              `
                )
                .join("")}
          </tbody>
      </table>
  `;
    }

    let imagesHtml = "";

    // if (Platform.OS === "ios") {
    //   if (Images?.length) {
    //     let pageBuffer: string[] = [];

    //     Images.forEach((item, index) => {
    //       // Add current image to page buffer
    //       pageBuffer.push(`
    //   <div class="image-item">
    //     <img src="${
    //       item.uri
    //     }" alt="Concrete pouring" style="max-width:100%; height:auto;" />
    //     <div class="image-caption">${item?.description || ""}</div>
    //   </div>
    // `);

    //       // First page → 3 images
    //       if (index === 2) {
    //         imagesHtml += `<div class="page">${pageBuffer.join("")}</div>`;
    //         pageBuffer = [];
    //       }
    //       // Subsequent pages → every 5 images
    //       else if (index > 2 && (index - 2) % 5 === 0) {
    //         imagesHtml += `<div class="page">${pageBuffer.join("")}</div>`;
    //         pageBuffer = [];
    //       }
    //       // Last image → flush remaining
    //       else if (index === Images.length - 1) {
    //         imagesHtml += `<div class="page">${pageBuffer.join("")}</div>`;
    //         pageBuffer = [];
    //       }
    //     });
    //   }
    // } else {
    //   if (Images?.length) {
    //     Images.forEach((item, index) => {
    //       imagesHtml += `
    //   <div class="image-item">
    //     <img src="${item.uri}" alt="Concrete pouring" />
    //     <div class="image-caption">${item?.description || ""}</div>
    //   </div>
    // `;

    //       // First page → 3 images, then page break
    //       if (index === 1 && index !== Images.length - 1) {
    //         imagesHtml += `<div class="page-break"></div>`;
    //       }
    //       // Subsequent pages → 5 images, then page break
    //       else if (
    //         index > 2 &&
    //         (index - 4) % 5 === 4 &&
    //         index !== Images.length - 1
    //       ) {
    //         imagesHtml += `<div class="page-break"></div>`;
    //       }
    //     });
    //   }
    // }
    if(Images && Images.length > 0){
       Images.forEach((item) => {
  imagesHtml += `
    <div class="image-item">
      <img src="${item.uri}" alt="Project Image" />
      <div class="image-caption">${item?.description || ""}</div>
    </div>
  `;
});
    }
   




//    let imagesHtml = "";



    let signatureHtml = "";
    if (signature) {
      signatureHtml = `
      <img src="${signature}" alt="Signature" style="width: 50px; margin-left: 60px;" />
      `;
    }

    let logoHtml = "";
    if (selectedLogo && selectedLogo.length > 0) {
      selectedLogo.forEach((item, index) => {
        logoHtml += `
      <img src="${item.file_url}" alt="Company Logo" class="side-logo">
      ${
        index < selectedLogo.length - 1 // add line only if not the last logo
          ? `<div class="vertical-line"></div>`
          : ""
      }
    `;
      });
    }

    const htmlContent = `<!DOCTYPE html>
<html>

<head>
    <title>Inspection Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 15px;
            padding:0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        @page{
          margin-top: 10px !important;
         }

        .container {
            display: flex;
            gap: 20px;
        }

        .main-content {
            flex: 3;
        }


        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 4px;
            text-align: left;
            font-size: 8px;
        }

        th {
            background-color: #f2f2f2;
        }

        .header-table {
            margin-bottom: 30px;
        }

        .section-title {
            font-weight: bold;
            background-color: #f2f2f2;
            padding: 5px;
            margin-top: 20px;
        }

        .signature-section {
            margin-top: 40px;
        }

        ul {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .image-placeholder {
            width: 150px;
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #999;
        }

        .image-caption {
            font-size: 12px;
            color: #666;
            text-align: center;
        margin-top: 5px;

        }

        .img-container {
            width: 100%;
            padding: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            height: 50px;
        }

        .side-logo {
            height: 70px;
        }

        .header-title {
            font-size: 18px;
            font-weight: 900;
            color:${AppColor.PRIMARY};
        }

        .table-title {
            color:${AppColor.PRIMARY};
            font-weight: 600;
            font-size: 20px;
        }

        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #ddd;
        }

        .left-logos {
            display: flex;
            gap: 15px;
        }

        .vertical-line {
            height: '100%';
            width: 1px;
            background-color: #ccc;
        }

        .header-title {
            flex-grow: 1;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .right-logo {
            display: flex;
            justify-content: flex-end;
        }

        .bold {
            font-weight: bold;
            color: #000000
        }

        .side-logo {
            height: 40px;
            width: auto;
            object-fit: contain;
        }

        .report-container {
            width: 100%;
            display: flex;
            gap: 20px;
            margin: 0 auto;
        }

        .description-section {
            width: 30%;

            background-color: white;
            padding: 4px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .data-section {
            width: auto;
            background-color: white;
            padding: 4px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .images-section {
            width: 23%;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h4 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-top: 0;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .data-table th,
        .data-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .data-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

  
       

       

        .signature-container {
            display: flex;
            justify-content: space-between;
            margin: 30px auto 0;
            gap: 20px;
            width: 100%;
        }

        .signature-box {
            flex: 1;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            /* text-align: center; */
            height: 100px;
        }

        .signature-title {
            font-weight: bold;
            margin-bottom: 15px;
            color: #2c3e50;
            font-size: 16px;
        }

        .signature-line {
            height: 1px;
            background-color: #333;
            margin: 40px 0 10px;
        }

        .signature-image {
            width: 150px;
            height: 80px;
            margin: 10px auto;
            display: block;
            object-fit: contain;
            border: 1px solid #eee;
        }

        .signature-label {
            font-size: 14px;
            color: #666;
        }

        .date-line {
            margin-top: 5px;
            font-size: 12px;
            color: #888;
        }
        p{
            font-size: 11px;
        }
             .description-item{
             border-left: 4px solid #4a6fa5;
                background-color: #f8f9fa;
                padding: 12px 16px;
                margin-bottom: 16px;
                border-radius: 0 4px 4px 0;
        }

        h5{
            background-color: ${AppColor.PRIMARY};
            padding: 5px;
            color: #fff;
            margin: 0;
        }

        .image-item {
  page-break-inside: avoid !important;   /* Prevent breaking inside */
  break-inside: avoid !important;
  display: block;
  margin: 15px 0;
}

.image-item img {
  max-width: 100%;
  height: auto;
  display: block;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

.image-gallery {
  display: block;  /* Grid/Flex can cause unwanted breaks */
}




    </style>
</head>

<body>
    <div class="header-container">
        <div class="left-logos">
            ${logoHtml}
        </div>

        <div class="header-title">Weekly Report</div>

        <div class="vertical-line"></div>

        <div class="right-logo">
            <img src="${companyLogo}" alt="Company Logo"
                class="side-logo">
        </div>
    </div>


    <table class="info-table">
        <tr>
            <td class="bold">Project Name:</td>
            <td class="value-text">${projectName}</td>
            <td class="bold">Project No./Client PO:</td>
            <td class="value-text">${projectNumber}</td>
            <td class="bold">Report Date:</td>
            <td class="value-text">${reportDate}</td>
        </tr>
        <tr>
            <td class="bold">Consultant Project Manager:</td>
            <td class="value-text">${consultantProjectManager}</td>
            <td class="bold">Owner:</td>
            <td class="value-text">${owner}</td>
            <td class="bold">City Project Manager:</td>
            <td class="value-text">${cityProjectManager}</td>
        </tr>
        <tr>
            <td class="bold">Contract Project Manager:</td>
            <td class="value-text">${contractProjectManager}</td>
            <td class="bold">Contract Number:</td>
            <td class="value-text">${contractNumber}</td>
            <td class="bold">Start Date:</td>
            <td class="value-text">${startDate}</td>
        </tr>
        <tr>
            <td class="bold">End Date:</td>
            <td class="value-text">${endDate}</td>
            <td class="bold">Contractor Site Supervisor Onshore:</td>
            <td class="value-text">${contractorSiteSupervisorOnshore}</td>
            <td class="bold">Contractor Site Supervisor Offshore:</td>
            <td class="value-text">${contractorSiteSupervisorOffshore}</td>
        </tr>
        <tr>
            <td class="bold">Site Inspector:</td>
            <td class="value-text">${siteInspector}</td>
            <td class="bold">Inspector In/Out Time:</td>
            <td class="value-text">${
              inspectorTimeIn + " / " + inspectorTimeOut
            }</td>
            <td class="bold">Contract Administrator:</td>
            <td class="value-text">${contractAdministrator}</td>
        </tr>
        <tr>
            <td class="bold">Support CA:</td>
            <td class="value-text">${supportCA}</td>
            <td colspan="4"></td>
        </tr>
    </table>

      <div style="background-color: #f8f9fa; padding: 10px; margin: 10px 0;">
      <p style="margin: 0px; padding: 0px; color: #2c3e50; text-align: center; font-size: 15px;">Works completed on week ending ${moment(
        endDate
      ).format("dddd, MMMM Do, YYYY")}</p>
    </div>

    <div class="report-container">
        <!-- Description Section -->
        <div class="description-section">
            <h4>Project Description</h2>
            ${descriptionsHtml}
        </div>

        <!-- Data Section -->
        ${
          laboursHtml || equipmentsHtml || visitorsHtml
            ? `
            <div class="data-section">
            <h4>Project Data</h2>

         ${laboursHtml}
            ${equipmentsHtml}

           ${visitorsHtml}
        </div>`
            : ""
        }
        <!-- Images Section -->
        
        ${
          imagesHtml
            ? `
            <div class="images-section">
                <h4>Project Images</h2>
                <div class="image-gallery">
                    ${imagesHtml}
                  </div>
            </div>`
            : ""
        }

      
    </div>

    </div>

    </div>

    <div class="signature-container">
        <!-- First Signature Box -->
        <div class="signature-box">
            <div class="signature-title">Report Done By: ${siteInspector}</div>
            ${signatureHtml}
        </div>

        <!-- Second Signature Box -->
        <div class="signature-box">
            <div class="signature-title">Region Representative:</div>
            
        </div>
    </div>


</body>

</html>`;

// console.log("first html", htmlContent);


    try {
      const fileName = `${userName.replaceAll(" ", "_")}_${moment(
        reportDate
      ).format("DD-MM-YYYY")}_Weekly_Report`;

      let options = {
        html: htmlContent,
        fileName: fileName,
        // directory: "Documents",
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
  } catch (error) {
    console.log("Error createWeeklyPdf : ", error);
  }
};
