import { Alert } from "react-native";
import { JobHazardRequest } from "../../../api/apiInterface";
import { companyLogo, squareJHA, triangleJHA } from "../../../assets/base64Images";
import RNHTMLtoPDF from 'react-native-html-to-pdf-lite';
import Share from "react-native-share";
import { getGlobalStore } from "../../../api/apiClient";
import { RootState } from "../../../store/store";
import moment from "moment";

export const hazardCategories = [
  "Worksite Hazards",
  "Equipment Hazards",
  "Ergonomic Hazards",
  "Confined/Restricted Places",
  "Environmental Hazards",
  "Additional Requirements",
  "Misc. Hazards",
];

export const initialHazardCat = {
  Worksite_Hazards: "Worksite Hazards",
  Equipment_Hazards: "Equipment Hazards",
  Ergonomic_Hazards: "Ergonomic Hazards",
  "Confined/Restricted Places": "Confined/Restricted Places",
  Environmental_Hazards: "Environmental Hazards",
  Additional_Requirements: "Additional Requirements",
  "Misc._Hazards": "Misc. Hazards",
};
export const equipmentHazards = [
  "Hand Tools",
  "Power Tools",
  "Field Equipment",
  "Ladders",
  "Scaffolds",
  "Aerial Work Platforms",
  "Stuck Vehicles",
  "Lockout/Tagout",
  "Other",
];

export const ergonomicHazards = [
  "Rough Terrain",
  "Traversing Steep Slopes",
  "Excessive Noise Levels",
  "Excessive Dust/Fumes",
  "Working in Darkness",
  "Lighting - Lack of",
  "Slips, Trips and Falls",
  "Awkward Body Positioning",
  "Prolonged Twisting/Bending",
  "Pinch Points",
  "Other",
];

export const worksiteHazards = [
  "Heavy Construction Equipment",
  "Access / Egress at Site",
  "Open Excavations / Trenches",
  "Proper Shoring / Cut-Backs",
  "Overhead Lines",
  "Roadway Obstacles",
  "Underground Utilities",
  "U/G Locates Current and Available",
  "Potential For Electric Shock",
  "Pile Driving",
  "Floor/Dangerous Openings",
  "Hazardous Materials",
  "Pedestrians",
  "Public Traffic - High/Low Volume",
  "Traffic Control",
  "Cranes/Hoists/Lifting Devices",
  "Working at Heights",
  "Working On/Near/Over Water",
  "Working On/Near Ice",
  "Communications",
  "Housekeeping",
  "Welding",
  "Drilling",
  "Other",
];

export const confinedSpacesHazards = [
  "Access/Egress",
  "Hazardous Environment",
  "CSE Permit",
  "CSE Equipment",
  "Ventilation/Purging",
  "Enough Attendants/Monitor #",
  "Communications",
  "Atmosphere Monitoring",
  "Rescue Plan",
  "Other",
];

export const environmentalHazards = [
  "Extreme Weather",
  "Hot/Cold Working Conditions",
  "Spills/Leaks",
  "Dewatering",
  "Erosion Control/Storm Drains",
  "Other",
  
];
export const additionalRequirements = [
  "Sufficient Training",
  "Standard PPE in Good Condition",
  "Specialty PPE - Available",
  "Fire Extinguisher",
  "First Aid Kit",
  "First Aid Attendant/s Onsite",
  "Eye Wash Station - Available",
  "Is Your Site Orientation Done?",
  "Know Emergency Response Plan",
  "Are You Fit For Duty?",
  "Is 911 Available in Your Work Area?",
  "Other",
];
export const miscHazards = [
  "Hazardous Materials/Substances",
  "Are You Working Alone at Any Time",
  "New Workers",
  "Fatigue",
  "Lifting/Handling Loads",
  "Bridge Inspection",
  "Potential Violence/Harassment",
  "Other",
];

export const JobActivities:{
  activityName: string,
  activities: string[]
}[] = [
  {
    activityName: "Worksite Hazards",
    activities: [],
  },
  {
    activityName: "Equipment Hazards",
    activities: [],
  },
  {
    activityName: "Ergonomic Hazards",
    activities: [],
  },
  {
    activityName: "Confined/Restricted Places",
    activities: [],
  },
  {
    activityName: "Environmental Hazards",
    activities: [],
  },
  {
    activityName: "Additional Requirements",
    activities: [],
  },
  {
    activityName: "Misc. Hazards",
    activities: [],
  },
];

export const activities = {
        "Worksite Hazards": worksiteHazards,
        "Equipment Hazards": equipmentHazards,
        "Ergonomic Hazards": ergonomicHazards,
        "Confined/Restricted Places": confinedSpacesHazards,
        "Environmental Hazards": environmentalHazards,
        "Additional Requirements": additionalRequirements,
        "Misc. Hazards": miscHazards
}

export const selectionType = {
  severity : "severity",
  hazard : "hazard",
}

export const severityOptions = [
    { label: "High (H)", value: "H" },
    { label: "Medium (M)", value: "M" },
    { label: "Low (L)", value: "L" },
];

export const hazardOptions = [
    {
        label: "Claustrophobia Due to Tight Spaces",
        value: "Claustrophobia Due to Tight Spaces",
    },
    {
        label: "Communication or Lack Thereof",
        value: "Communication or Lack Thereof",
    },
    { label: "Confined Space Entry", value: "Confined Space Entry" },
    {
        label: "Confined Space Rescue Plan",
        value: "Confined Space Rescue Plan",
    },
    { label: "Construction Equipment", value: "Construction Equipment" },
    { label: "Excessive Dust/Fumes", value: "Excessive Dust/Fumes" },
    { label: "Excessive Noise Levels", value: "Excessive Noise Levels" },
    { label: "Floor/Dangerous Openings", value: "Floor/Dangerous Openings" },
    { label: "Grinding and Cutting", value: "Grinding and Cutting" },
    {
        label: "Hazardous Materials/Substances",
        value: "Hazardous Materials/Substances",
    },
    { label: "Inadequate/Defective PPEs", value: "Inadequate/Defective PPEs" },
    { label: "Insect Bites and Stings", value: "Insect Bites and Stings" },
    { label: "Mobile/Tower/Bridge Crane", value: "Mobile/Tower/Bridge Crane" },
    { label: "Needles/Sharp Objects", value: "Needles/Sharp Objects" },
    { label: "Open Excavation/Trenches", value: "Open Excavation/Trenches" },
    {
        label: "Potential for Electric Shock",
        value: "Potential for Electric Shock",
    },
    {
        label: "Presence of Hazardous Gases",
        value: "Presence of Hazardous Gases",
    },
    { label: "Scaffold Stairs/Ladders", value: "Scaffold Stairs/Ladders" },
    { label: "Slips/Trips/Falls", value: "Slips/Trips/Falls" },
    { label: "Traversing Steep Slopes", value: "Traversing Steep Slopes" },
    { label: "Welding", value: "Welding" },
    { label: "Working Alone", value: "Working Alone" },
    { label: "Working at Heights", value: "Working at Heights" },
    { label: "Working in Cold Weather", value: "Working in Cold Weather" },
    {
        label: "Working in Darkness/Low Light Conditions",
        value: "Working in Darkness/Low Light Conditions",
    },
    { label: "Working in Hot Weather", value: "Working in Hot Weather" },
    {
        label: "Working on/near/over water",
        value: "Working on/near/over water",
    },
];

  export const controlPlans = {
        "Construction Equipment":
            "Wear appropriate PPE and ensure if possible, to make eye contact with equipment operator so that they are aware you are in the area",
        "Excessive Dust/Fumes":
            "In areas that dust/fumes cannot be controlled or vented, don respiratory protective equipment or avoid the area until dust/fumes can be reduced or eliminated.",
        "Excessive Noise Levels":
            "Ensure that you are wearing proper hearing protection in any areas where the decibel levels exceed 85 dBA and are unable to be controlled. Wear double hearing protection where required or instructed to do so.",
        "Floor/Dangerous Openings":
            "Ensure that proper controls are in place to protect the worker from any openings that are on the site. Ensure that proper PPE is worn and inspected if work is taking place around the opening. Do not lean, sit or stand onto a floor covering without first knowing if it can support your weight.",
        "Open Excavation/Trenches": "Do not stand/walk along edge of excavation",
        "Communication or Lack Thereof":
            "Ensure that a proper line of communication between the entrant and attendant has been established prior to confined space entry",
        "Confined Space Entry":
            "Ensure the confined space area that is being entered has been tested for atmospheric conditions prior to entry and work. Ensure all PPE has been inspected and is in full working order. Ensure that a Confined Space Entry Permit has been completed, fully understood, and signed prior to perfoming this task.",
        "Confined Space Rescue Plan":
            "Ensure that a proper confined space entry plan has been developed and discussed with all workers present who will be undertaking confined space entry/work. Do not attempt rescue if you are not trained to do so.",
        "Grinding and Cutting":
            "Ensure all proper PPE is being worn when completing this task. Ensure area is ventilated to remove any dust or fumes that arise from this task. Check all equipment to ensure it is in working order and all safety guards and precautions are taking when performing this task.",
        "Hazardous Materials/Substances":
            "Read MSDS prior to use of material. Wear appropriate PPE and follow guidelines with regards to MSDS.",
        "Inadequate/Defective PPEs":
            "Ensure that the correct PPE is being worn and that all PPE has been well inspected prior to confined space entry. Ensure that defective items of PPE are taken out of service.",
        "Insect Bites and Stings":
            "Use deet and/or try to avoid areas dense with ticks, mosquitoes, spiders, or any other insects that could potentially carry a virus or disease. If issues with insects persists. Consider fumigation. ",
        "Mobile/Tower/Bridge Crane":
            "Always know where the load is and never walk or stand under the load.",
        "Needles/Sharp Objects":
            "Identify areas that could potentially have sharp objects – have a “sharps” bin on site and remove the hazard following correct procedures and safety protocols. If pricked by an unknown needle or sharp object. Consult your doctor immediately.",
        "Potential for Electric Shock":
            "Stand clear of energized equipment when it is being worked on. Wear specialized PPE when required.",
        "Presence of Hazardous Gases":
            "Ensure that a CSA approved 4 head gas detection monitor is being used to test levels prior to entry as well as worn on the person/s who will be working in the confined space.",
        "Scaffold Stairs/Ladders":
            "Maintain 3 point contact and visually check for any danger or caution flag/tape that may be attached.",
        "Slips/Trips/Falls":
            "Watch footing and clear pathways of hazards and debris.",
        "Traversing Steep Slopes":
            "Ensure that you use any handrails or walkways intended for use to traverse steep slope. If those are not available, watch your footing and traverse with your body parallel to the slope. Ensure proper footwear is being worn.",
        "Welding":
            "Position yourself while welding or cutting is taking place so that your head is not in the fumes. Avoid looking or staring directly at welding flash and wear appropriate PPE. ",
        "Working Alone":
            "Sign in & out, and follow any specific protocols or procedures that are required on your site.",
        "Working at Heights":
            "If above 3m, make sure you have the appropriate training and are wearing the appropriate PPE for the job.",
        "Working in Cold Weather":
            "Layer up and take warm up breaks when necessary.",
        "Working in Darkness/Low Light Conditions":
            "Place temporary lighting if possible, if not, then ensure you have a well maintained and charged headlamp/flashlight. Ensure equipment is intrinsically safe if being used for confined space work.",
        "Working in Hot Weather":
            "Stay hydrated and take cool down breaks when necessary.",
        "Working on/near/over water":
            "Wear specialized PPE when required. Watch for tripping hazards when walking over or near water. Have proper rescue plan in place in the event of falling in.",
    };

export const createJHAHarardPdf = async (jobHazard: JobHazardRequest) => {

  const store:RootState = getGlobalStore().getState();
  const userName = store?.User?.UserName

  try {
      const {
      description, 
      location, projectName, selectedDate,
    signature, siteOrientationChecked, 
    tasks, time, toolBoxMeetingChecked,
    selectedActivities,WorkerName,
    OtherTextHazards
    
  } = jobHazard

  const otherText = {}
  OtherTextHazards?.map((item) => {
    otherText[item?.activityName] = item?.value
  })


   let harardSelectionHtml = `
   `
  if (selectedActivities.length > 0) {
    let headerHtml = ``
    selectedActivities?.map((item, index) => {
      if(item?.activities?.length > 0) {
      headerHtml+= `<th>${item?.activityName || 'N/A'}</th>`
      }
    })
    harardSelectionHtml += ` <table>
    <thead>
      <tr>
      ${headerHtml}
      </tr>
    </thead>
    <tbody>`
harardSelectionHtml += `<tr> `
    selectedActivities?.map((item, index) => {
      if(item?.activities?.length > 0) {
         harardSelectionHtml += `<td>`
          harardSelectionHtml += `<ul>`
          item?.activities?.map((text, index) => {
            if(text !== 'Other'){
            harardSelectionHtml += ` <li>${text || 'N/A'}</li> `
            }
          })
          if(otherText[item?.activityName]){
          harardSelectionHtml += `<li> Other : ${otherText[item?.activityName]}</li>`
          }
          harardSelectionHtml += `</ul>`
          harardSelectionHtml += `</td>`
      }

         
        })

        harardSelectionHtml += `</tr></tbody>
  </table>`
  }

//   let harardSelectionHtml = `
//    `
//   if (selectedActivities.length > 0) {
//     let headerHtml = ``
//     selectedActivities?.map((item, index) => {
//       // headerHtml+= `<th>${item?.category || 'N/A'}</th>`
//     })
//     harardSelectionHtml += ` <table>
//     <thead>
//       <tr>
//       ${headerHtml}
//       </tr>
//     </thead>
//     <tbody>`
// harardSelectionHtml += `<tr> `
//         selectedActivities?.map((item, index) => {

//           harardSelectionHtml += `<td>`
//           harardSelectionHtml += `<ul>`
//           item?.activities?.map((text, index) => {
//             if(text !== 'Other'){
//             harardSelectionHtml += ` <li>${text || 'N/A'}</li> `
//             }
//           })
//           // if(otherText[item?.category]){
//           // harardSelectionHtml += `<li> Other : ${otherText[item?.category]}</li>`
//           // }
//           harardSelectionHtml += `</ul>`
//           harardSelectionHtml += `</td>`
//         })

//         harardSelectionHtml += `</tr></tbody>
//   </table>`
//   }
    let taskRowHtml = ``;
  if(tasks.length > 0 ){
    taskRowHtml += ` <table>
    <thead>
      <tr>
        <th>TASK #</th>
        <th>TASKS</th>
        <th>H/M/L</th>
        <th>HAZARDS</th>
        <th>PLANS TO ELIMINATE/CONTROL</th>
      </tr>
    </thead>
    <tbody>`
    tasks.map((item, index) => {

      taskRowHtml += `<tr>
        <td style="text-align: center;" >${index+1}</td>
        <td style="text-align: center;">${item?.task || 'N/A'}</td>
        <td style="text-align: center;">${item?.severity || 'N/A'}</td>
        <td style="text-align: center;">${item?.hazard || 'N/A'}</td>
        <td style="text-align: center;">${item?.controlPlan || 'N/A'}</td>
      </tr>`
    })

    taskRowHtml += `</tbody>
  </table>`


  }
  let signatureHtml = "";
    if (signature) {
      signatureHtml = `
      <img src="${signature}" alt="Signature" style="width: 50px;" />
      `
    }

  const htmlContent = `<!DOCTYPE html>
<html>

<head>
  <title>Job Hazard Analysis (JHA)</title>
  <style>
          @page {
            margin: 20px 3px; /* Default margin for all pages */

          }
          
          /* Style for the second page only */
          @page :nth(2) {
            margin-top: 200px; /* Extra top margin for second page */
            
          }
          
          /* Force page break before second page content */
          .page-break {
            page-break-before: always;
          }
    p {
      margin: 4px 0px;
    }
    body {
      font-family: Arial, sans-serif;
       width: 1200px;
     }

    .header-title {
      font-size: 55px;
      margin-bottom: 30px;
    }

    .container {
      padding: 10px;
    }

    .section {
      margin-bottom: 20px;
      width: 35%;

    }

    .section-title {
      font-weight: bold;
      font-size: 1.2em;
      margin-bottom: 10px;
      text-decoration: underline;
    }

    .checkbox-list {
      display: flex;
      flex-wrap: wrap;
    }

    .checkbox-item {
      margin-bottom: 5px;
    }

    .header {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      background-color: "#155db2";
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    table {
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid black;
      padding: 8px 4px;
      text-align: left;
      vertical-align: top;

    }
    th {
      background-color: rgb(228, 209, 102);
      text-align: center;
    }
    .bold {
      font-weight: bold;
      color: #000000;
    }

    .logo {
      margin-bottom: 10px;
      height: 50px;
    }

    .side-logo {
      margin-bottom: 10px;
      height: 100px;
    }

    .JHAtriangle-logo {
      /* position: absolute;
        top: 20px;
        right: 100px; */
      height: 180px;
    }

    .img-container {
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
   
  </style>
</head>

<body>
  <div class="container">
    <div class="img-container">
      <img src="${companyLogo}" alt="Company Logo"
        class="side-logo" />
      

      <img src="${triangleJHA}" alt="JHAtriangle" class="JHAtriangle-logo" />
      <img src="${squareJHA}" alt="JHAtriangle" class="JHAtriangle-logo" />

    </div>
<div class="header-title">Job Hazard Analysis (JHA)</div>
    <div>
      <p><span class="bold">Date:</span>${selectedDate || 'N/A'}</p>
      <p><span class="bold">Time:</span>${time || 'N/A'}</p>
      <p><span class="bold">Project Location:</span>${location || 'N/A'}</p>
      <p><span class="bold">Project Name:</span> ${projectName || 'N/A'}</p>
      <p><span class="bold">Description:</span> ${description || 'N/A'}</p>
    </div>

 ${harardSelectionHtml}
    <div style="display: flex; flex-wrap: wrap; width: 100%; justify-content: space-between; margin-top: 20px;">
      
    </div>


  </div>


 ${taskRowHtml}

  <div style=" width:100%; display:flex; justify-content: space-between; margin-top: 50px;">
    <p><span class="bold">Have you completed site orientation? :</span> ${siteOrientationChecked }</p>
    <p><span class="bold">Have you completed tool box meeting? :</span> ${toolBoxMeetingChecked}</p>
  </div>

  <div style="display: flex; flex-direction: row; width: 100%; border: 1px solid #ccc; margin-top: 40px;">
    <div style="width: 50%;height: 100px; padding: 10px;">

    <p><span class="bold">Reviewed By :</span> </p>
    <p><span class="bold">Date Reviewed :</span> </p>
    <div style="display: flex; flex-direction: row; width: 50%; height: 100px; padding: 10px 0px; ">
      <p class="bold">Signature : </p>
       

      <div>
      </div>


    </div>
    </div>

    <div style="width: 1px; background-color: #ccc;">

    </div>

    <div style="width: 50%;height: 100px;">
         
        <div style="width: 100%;">
          <div style="display: flex; flex-direction: row; border-bottom: 1px solid #ccc;">
            <p style="width: 50%; text-align: center;  font-weight: bold;
      color: #000000;">Worker's Name</p>
      <div style="width: 1px;  background-color: #ccc;"></div>
            <p  style="width: 50%; text-align: center;  font-weight: bold;
      color: #000000;">Signature</p>
          </div>

          <div style="display: flex; flex-direction: row;  border-bottom: 1px solid #ccc;">
            <p style="width: 50%; text-align: center;">${WorkerName}</p>
            <div style="width: 1px; background-color: #ccc;">
            
            </div>

            <p  style="width: 50%; text-align: center;"> 
             ${signatureHtml}
     </p>
          </div>
          
        </div>

    </div>

  </div>
</body>

</html>`

console.log("htmlContent :",htmlContent)
const fileName = `${userName.replaceAll(" ", "_")}_${moment(selectedDate).format("DD-MM-YYYY")}`;
console.log("fileName : ", fileName)

let options = {
      html: htmlContent,
      fileName:fileName,
       directory: 'Documents',
       width:1600
    };

    let file = await RNHTMLtoPDF.convert(options,)
  // Prepare share options
  const shareOptions = {
    title: 'Share PDF via',
    url: `file://${file.filePath}`,  // Add file:// prefix for local files
    social: Share.Social.WHATSAPP,
  };

  // Share on WhatsApp
  await Share.open(shareOptions);


  } catch (error) {
    console.log("Error : <LoaderModal visible={IsLoading} /> ", error);
    
  }

 







try {
   
    // console.log(file.filePath);
  // Generate the PDF
  // const REPORTS_FOLDER = FileSystem.documentDirectory + "JHA_Reports/";
  // const folderExists = await FileSystem.getInfoAsync(REPORTS_FOLDER);
  // if (!folderExists.exists) {
  //   await FileSystem.makeDirectoryAsync(REPORTS_FOLDER, { intermediates: true });
  // }
  // const { uri } = await Print.printToFileAsync({ html: htmlContent,width:1000 });
  // const fileUri = REPORTS_FOLDER + `${moment().format("DD_MM_YYYY_HH_mm_ss")}_JHA_ANALYSIS.pdf`;

  // // Move file to a readable location
  // await FileSystem.moveAsync({ from: uri, to: fileUri });

  // // Share the generated PDF file
  // if (await Sharing.isAvailableAsync()) {
  //   await Sharing.shareAsync(fileUri);
  // }
} catch (error) {
  // Alert.alert("Error", error.message);
}
}

export const createJHAHarardPdf1 = async (jobHazard: JobHazardRequest) => {
  try {
    // Validate input
    if (!jobHazard) {
      throw new Error('Job hazard data is required');
    }

    const {
      description, 
      location, 
      projectName, 
      selectedDate,
      signature, 
      siteOrientationChecked, 
      tasks, 
      time, 
      toolBoxMeetingChecked,
      selectedActivities,
      WorkerName,
    } = jobHazard;

    // Validate required fields
    if (!selectedDate || !projectName || !location) {
      throw new Error('Required fields are missing');
    }

    // Generate hazard selection HTML
    let harardSelectionHtml = '';
    if (selectedActivities?.length > 0) {
      harardSelectionHtml = `
        <table>
          <thead>
            <tr>
              ${selectedActivities.map(item => `<th>${item?.category || 'N/A'}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${selectedActivities.map(item => `
                <td>
                  <ul>
                    ${item?.activities
                      ?.filter(text => text !== 'Other')
                      ?.map(text => `<li>${text || 'N/A'}</li>`)
                      ?.join('') || '<li>No activities specified</li>'
                    }
                  </ul>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      `;
    }

    // Generate tasks HTML
    let taskRowHtml = '';
    if (tasks?.length > 0) {
      taskRowHtml = `
        <table>
          <thead>
            <tr>
              <th>TASK #</th>
              <th>TASKS</th>
              <th>H/M/L</th>
              <th>HAZARDS</th>
              <th>PLANS TO ELIMINATE/CONTROL</th>
            </tr>
          </thead>
          <tbody>
            ${tasks.map((item, index) => `
              <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td style="text-align: center;">${item?.task || 'N/A'}</td>
                <td style="text-align: center;">${item?.severity || 'N/A'}</td>
                <td style="text-align: center;">${item?.hazard || 'N/A'}</td>
                <td style="text-align: center;">${item?.controlPlan || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Generate signature HTML if exists
    const signatureHtml = signature 
      ? `<img src="${signature}" alt="Signature" style="width: 50px;" />`
      : '';

    // Generate the full HTML content
    const htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <title>Job Hazard Analysis (JHA)</title>
          <style>
            /* Your existing styles */
            body { font-family: Arial, sans-serif; margin: 0; padding: 30px; }
            .header-title { font-size: 55px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px 4px; }
            th { background-color: rgb(228, 209, 102); text-align: center; }
            /* Add other styles as needed */
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Your existing HTML structure -->
            ${harardSelectionHtml}
            ${taskRowHtml}
            <!-- Rest of your HTML content -->
          </div>
        </body>
      </html>
    `;

    // Generate PDF
    const options = {
      html: htmlContent,
      fileName: `JHA_${projectName}_${selectedDate.replace(/\//g, '-')}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    
    if (!file?.filePath) {
      throw new Error('PDF generation failed - no file path returned');
    }

    // Share the PDF
    const shareOptions = {
      title: 'Share JHA PDF',
      url: `file://${file.filePath}`,
      type: 'application/pdf',
      filename: `JHA_${projectName}.pdf`,

      social: Share.Social.WHATSAPP,
    };

    await Share.shareSingle(shareOptions);

    return {
      success: true,
      filePath: file.filePath,
      message: 'PDF generated and shared successfully'
    };

  } catch (error) {
    console.error('Error in createJHAHarardPdf:', error);
    
    // Show user-friendly error message
    Alert.alert(
      'Error Generating PDF',
      error.message || 'An error occurred while generating the PDF. Please try again.',
      [{ text: 'OK' }]
    );

    return {
      success: false,
      error: error.message || 'Unknown error occurred'
    };
  }
};
